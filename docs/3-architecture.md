# ARCHITECTURE  -  System Design

## 1. System context

DevTrace is a client-side Single Page Application (SPA) built with React 18, modern JavaScript (ES2022+), Vite, and Tailwind CSS. It has **no backend server**, requires no database or API runtime, and uses **pure JavaScript with zero TypeScript**. Every visitor accesses the same static, pre-rendered catalog of 27 algorithm pages across 5 sections.

```
+-------------------------------------------------------------+
|                      Browser (Client)                       |
|                                                             |
|   +-----------------------------------------------------+   |
|   |             React 18 SPA (Vite + JavaScript)        |   |
|   |  - Hub Pages (/visualize, /visualize/:section)      |   |
|   |  - Algorithm Pages (/visualize/:section/:algorithm) |   |
|   |  - URL State Sync (?view=&speed=&size=)             |   |
|   +-----------------------------------------------------+   |
|                              |                              |
|                              v                              |
|   +-----------------------------------------------------+   |
|   |                    Player Engine                    |   |
|   |  - playerReducer (pure deterministic state machine) |   |
|   |  - useTicker (ref-backed timer for speed/delay)     |   |
|   +-----------------------------------------------------+   |
|                              |                              |
|                              v                              |
|   +-----------------------------------------------------+   |
|   |             Pure JavaScript Algorithms              |   |
|   |  - Pure functions: (input) => stepEvents[]          |   |
|   |  - Zero React / Zero DOM dependencies               |   |
|   |  - 27 algorithms across 5 distinct sections         |   |
|   +-----------------------------------------------------+   |
+-------------------------------------------------------------+
```

## 2. Architectural layers

Dependencies flow strictly downward (higher layers import lower layers, never the reverse):

1. **`pages/`** (`.jsx`)  -  Section hubs (`/visualize/:section`) and algorithm detail pages (`/visualize/:section/:algorithm`).
2. **`components/`** (`.jsx`)  -  Shared UI components: Navigation topbar, Breadcrumbs, 3-column card grid, Comparison tables, Article renderer, Code tabs.
3. **`canvases/`** (`.jsx`)  -  Visualization renderers per representation (`BarsCanvas`, `TreeCanvas`, `GraphCanvas`).
4. **`core/`** (`.js`)  -  Player reducer, ticker hook, step event structures, URL state synchronization, audio synthesis, and algorithm registry.
5. **`algorithms/`** (`.js`)  -  Pure JavaScript generators organized by section (`sorting/`, `data-structures/`, `graphs/`, `searching/`, `concepts/`). **Strictly zero React, zero DOM, and zero CSS imports.**
6. **`content/`** (`.js`)  -  Freshly authored article text, complexity tables, worked traces, when-to-use matrices, and 5-language code implementations.

## 3. Directory layout

```
devtrace/
├── docs/                                # Technical specifications and documentation
├── CLAUDE.md                            # Agent and team working rules (JavaScript + React)
└── frontend/
    ├── src/
    │   ├── app/                         # App entry, router configuration, routes
    │   ├── core/                        # Player engine, registry, audio, hooks
    │   │   ├── player.js                # Pure reducer for player actions
    │   │   ├── useTicker.js             # Precision timer hook
    │   │   ├── events.js                # Step event helpers and constants
    │   │   └── registry.js              # Algorithm catalog registry
    │   ├── algorithms/                  # Pure algorithm step-event generators (.js)
    │   │   ├── sorting/                 # 8 sorting algorithms
    │   │   ├── data-structures/         # 9 data structures
    │   │   ├── graphs/                  # 7 graph algorithms
    │   │   ├── searching/               # 2 search algorithms
    │   │   └── concepts/                # Recursion step generator
    │   ├── canvases/                    # Visualizer stage renderers (.jsx)
    │   ├── components/                  # Navigation, Cards, ComparisonTable, Article (.jsx)
    │   ├── content/                     # 27 articles (tables, 5-language code snippets)
    │   └── styles/                      # Tailwind styles and tokens.css
    └── tests/
        ├── algorithms/                  # Property and oracle tests for all 27 algorithms
        └── core/                        # Reducer and ticker unit tests
```

## 4. Step-event contracts

Every algorithm is implemented as a pure JavaScript generator function that accepts an input configuration and returns an array of immutable step event objects. Because the player replays pre-recorded steps, backward stepping is exact, instantaneous, and deterministic.

### Step event structure
A step event is a plain JavaScript object:
- `type`: String event identifier (`'compare'`, `'swap'`, `'set'`, `'mark'`, `'visit'`, `'push'`, `'pop'`, `'relax'`, `'link'`, `'unlink'`).
- `line`: Integer (0-indexed line in pseudocode).
- `note`: Human-readable sentence explaining the operation.
- `state`: Immutable snapshot of data structure state (e.g. cloned typed arrays or node graphs).
- `indices`: Array of numbers (e.g. `[i, j]` for compare/swap).
- `target`: Target node or index.
- `value`: Target value being written.
- `metrics`: Object containing cumulative counters (`{ comparisons, swaps, steps }`).

### Algorithm definition structure
An algorithm definition is registered in the registry as:
```js
export const quicksortDefinition = {
  id: 'quick-sort',
  name: 'Quick Sort',
  section: 'sorting',
  blurb: 'See divide-and-conquer partition and sort arrays in place.',
  complexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    stable: false,
  },
  pseudocode: [
    'quickSort(a, lo, hi):',
    '  if lo < hi:',
    '    p = partition(a, lo, hi)',
    '    quickSort(a, lo, p - 1)',
    '    quickSort(a, p + 1, hi)',
  ],
  defaultInput: [35, 12, 48, 20, 9, 27],
  generate: (input) => quickSort(input),
};
```

## 5. Player engine (JavaScript)

The player state machine is governed by a pure JavaScript reducer:

```js
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export const initialPlayer = {
  stepCount: 0,
  index: 0,
  status: 'idle',
  delayMs: 250,
};

export function playerReducer(state, action) {
  const last = state.stepCount - 1;
  switch (action.type) {
    case 'load':
      return { ...state, stepCount: action.stepCount, index: 0, status: 'idle' };
    case 'play':
      if (state.stepCount === 0) return state;
      return { ...state, index: state.status === 'finished' ? 0 : state.index, status: 'playing' };
    case 'pause':
      return state.status === 'playing' ? { ...state, status: 'paused' } : state;
    case 'tick': {
      if (state.status !== 'playing') return state;
      const nextIndex = Math.min(state.index + 1, last);
      return { ...state, index: nextIndex, status: nextIndex >= last ? 'finished' : 'playing' };
    }
    case 'step': {
      if (state.stepCount === 0) return state;
      const nextIndex = Math.min(state.index + 1, last);
      return { ...state, index: nextIndex, status: nextIndex >= last ? 'finished' : 'paused' };
    }
    case 'back': {
      const prevIndex = Math.max(state.index - 1, 0);
      return { ...state, index: prevIndex, status: prevIndex === 0 ? 'idle' : 'paused' };
    }
    case 'seek': {
      const seekIndex = clamp(action.index, 0, Math.max(last, 0));
      return { ...state, index: seekIndex, status: seekIndex === 0 ? 'idle' : seekIndex >= last ? 'finished' : 'paused' };
    }
    case 'reset':
      return { ...state, index: 0, status: 'idle' };
    case 'speed':
      return { ...state, delayMs: clamp(action.delayMs, 10, 1500) };
    default:
      return state;
  }
}
```

The ticker hook executes in precision `setTimeout` chains and cancels cleanly upon pause or step:

```js
import { useEffect, useRef } from 'react';

export function useTicker(playing, delayMs, index, onTick) {
  const ref = useRef(onTick);
  useEffect(() => {
    ref.current = onTick;
  });
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => ref.current(), delayMs);
    return () => window.clearTimeout(id);
  }, [playing, delayMs, index]);
}
```

## 6. URL query parameters contract

Player configuration is synchronized with browser URL query parameters:
- `view`: Rendering visualizer mode (default: `bars` for arrays, `tree` for hierarchical structures, `graph` for networks).
- `speed`: Integer speed preset (`1` = 600 ms, `2` = 250 ms, `3` = 80 ms).
- `size`: Element or node count (e.g. `14`).

When a user shares or bookmarks an algorithm URL (`/visualize/sorting/quick-sort?view=bars&speed=3&size=20`), the player reads these values on mount and initializes the engine accordingly.

## 7. Rendering contract

Canvases are pure React components taking `({ currentStep, delayMs })`. They contain no internal intervals, dispatch no actions, and hold no mutable side effects. Any visual transition is derived entirely from the current step event.

## 8. Architecture decision records (ADRs)

| ADR | Decision | Alternatives Considered | Justification |
|---|---|---|---|
| ADR 1 | Pre-recorded step event traces | Live generator stepped on tick | Pre-recording makes backward stepping and exact URL seeking trivial without requiring complex undo reversibility logic. |
| ADR 2 | Pure `useReducer` + ref ticker | Redux Toolkit, XState | The player state machine consists of 4 primitive fields; an external state library adds unnecessary bundle overhead and review surface. |
| ADR 3 | Zero-backend static hosting | Node/Express or Spring Boot backend | Static SPA eliminates server hosting cost, cold starts, and network points of failure; all content and logic run client-side. |
| ADR 4 | Web Audio API oscillator synthesis | Howler.js, audio sample files | Native browser synthesis requires no audio asset downloads, has zero network latency, and enables continuous pitch modulation. |
| ADR 5 | Strict dark theme only | Theme toggler, light/dark duality | Eliminates CSS token duplication, avoids contrast regressions, and aligns directly with developer-focused reference look. |
| ADR 6 | Pure JavaScript (no TypeScript) | TypeScript | Simplifies development workflow, removes compilation step hurdles, enables clean modern ES2022+ syntax, and speeds up authoring across 27 algorithms. |
