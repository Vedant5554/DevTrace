# Project Implementation

*Reference implementation of core visualization engines, player controls, and renderers in build order. Code follows Doc 6 guidelines (strictly comment-free, clean modern JavaScript / React JSX).*

## 1. Build order (5-day timeline)

| Step | Component / Unit | Owner | Verification |
|---|---|---|---|
| 1 | `core/player.js`, `core/useTicker.js` | Platform | Player reducer unit tests |
| 2 | `core/registry.js`, page router, URL param sync | Platform | Routing and URL state tests |
| 3 | Core Canvases (`BarsCanvas.jsx`, `TreeCanvas.jsx`, `GraphCanvas.jsx`) | Arrays, Trees, Graphs | Visual rendering tests |
| 4 | Sorting generators (8 algorithms, `.js`) | Arrays | Property tests (fast-check) |
| 5 | Searching generators (2 algorithms, `.js`) | Arrays | Oracle tests (linear vs binary) |
| 6 | Data structure generators (9 algorithms, `.js`) | Trees & Platform | Structure invariant tests |
| 7 | Graph generators (7 algorithms, `.js`) | Graphs | Bellman-Ford / BFS shortest-path oracles |
| 8 | Recursion concept visualizer (`.js`) | Trees | Stack trace sequence tests |
| 9 | Article content & 5-language code snippets (27 pages) | All Builders | Review checklist gate |
| 10 | Section hubs and comparison tables | Platform | Full regression pass |

## 2. Trace recorder (array & sorting algorithms in JavaScript)

```js
export const MAX_FRAMES = 20000;

export class TraceLimitError extends Error {
  constructor(limit) {
    super(`Trace exceeds ${limit} frames`);
    this.limit = limit;
  }
}

export function createRecorder(input) {
  const values = Uint16Array.from(input);
  const sorted = new Uint8Array(values.length);
  const steps = [];
  const counters = { comparisons: 0, swaps: 0 };

  const push = (type, extra, note, line) => {
    if (steps.length >= MAX_FRAMES) throw new TraceLimitError(MAX_FRAMES);
    steps.push({
      type,
      line,
      note,
      state: {
        values: values.slice(),
        compare: null,
        swap: null,
        pivot: null,
        range: null,
        aux: null,
        write: null,
        sorted: sorted.slice(),
        ...extra,
      },
      metrics: { ...counters },
    });
  };

  return { values, sorted, steps, counters, push };
}
```

## 3. Reference sorting generators (JavaScript)

```js
import { createRecorder } from './recorder.js';

export function bubbleSort(input) {
  const { values, sorted, steps, counters, push } = createRecorder(input);
  push('mark', {}, 'Initial array loaded', 0);
  for (let end = values.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      counters.comparisons++;
      push('compare', { compare: [i, i + 1] }, `Compare ${values[i]} and ${values[i + 1]}`, 3);
      if (values[i] > values[i + 1]) {
        [values[i], values[i + 1]] = [values[i + 1], values[i]];
        counters.swaps++;
        push('swap', { swap: [i, i + 1] }, `Swap positions ${i} and ${i + 1}`, 4);
        swapped = true;
      }
    }
    sorted[end] = 1;
    if (!swapped) break;
  }
  sorted.fill(1);
  push('mark', {}, 'Array fully sorted', 7);
  return steps;
}

export function quickSort(input) {
  const { values, sorted, steps, counters, push } = createRecorder(input);
  push('mark', {}, 'Initial array loaded', 0);

  const partition = (lo, hi) => {
    const pivotValue = values[hi];
    push('mark', { pivot: hi, range: [lo, hi] }, `Select pivot ${pivotValue}`, 2);
    let store = lo;
    for (let i = lo; i < hi; i++) {
      counters.comparisons++;
      push('compare', { pivot: hi, range: [lo, hi], compare: [i, hi] }, `Compare ${values[i]} with pivot ${pivotValue}`, 4);
      if (values[i] < pivotValue) {
        if (i !== store) {
          [values[i], values[store]] = [values[store], values[i]];
          counters.swaps++;
          push('swap', { pivot: hi, range: [lo, hi], swap: [i, store] }, `Swap positions ${i} and ${store}`, 5);
        }
        store++;
      }
    }
    if (store !== hi) {
      [values[store], values[hi]] = [values[hi], values[store]];
      counters.swaps++;
      push('swap', { pivot: store, range: [lo, hi], swap: [store, hi] }, 'Place pivot in final partitioned position', 7);
    }
    sorted[store] = 1;
    push('mark', { range: [lo, hi] }, `Pivot ${pivotValue} settled at index ${store}`, 8);
    return store;
  };

  const sort = (lo, hi) => {
    if (lo > hi) return;
    if (lo === hi) {
      sorted[lo] = 1;
      return;
    }
    const p = partition(lo, hi);
    sort(lo, p - 1);
    sort(p + 1, hi);
  };

  sort(0, values.length - 1);
  sorted.fill(1);
  push('mark', {}, 'Array fully sorted', 10);
  return steps;
}
```

## 4. Binary search tree (JavaScript with path copying)

```js
export const insertNode = (node, value) => {
  if (node === null) return { value, left: null, right: null };
  return value < node.value
    ? { ...node, left: insertNode(node.left, value) }
    : { ...node, right: insertNode(node.right, value) };
};

export function searchFrames(root, value) {
  const base = { root, current: null, path: [], found: null };
  const steps = [{ type: 'mark', state: base, note: `Search for ${value}`, line: 0 }];
  const path = [];
  let node = root;
  while (node !== null) {
    path.push(node.value);
    if (node.value === value) {
      steps.push({
        type: 'visit',
        state: { ...base, current: node.value, path: [...path], found: true },
        note: `Found ${value}`,
        line: 3,
      });
      return steps;
    }
    steps.push({
      type: 'compare',
      state: { ...base, current: node.value, path: [...path] },
      note: `${value} ${value < node.value ? '<' : '>'} ${node.value}`,
      line: 5,
    });
    node = value < node.value ? node.left : node.right;
  }
  steps.push({
    type: 'mark',
    state: { ...base, path: [...path], found: false },
    note: `${value} is not in the tree`,
    line: 8,
  });
  return steps;
}
```

## 5. Playback hook & canvas rendering (React JSX)

```js
import { useCallback, useEffect, useReducer } from 'react';
import { playerReducer, initialPlayer } from './player.js';
import { useTicker } from './useTicker.js';

export function usePlayback(steps) {
  const [player, dispatch] = useReducer(playerReducer, initialPlayer);

  useEffect(() => {
    dispatch({ type: 'load', stepCount: steps.length });
  }, [steps]);

  const onTick = useCallback(() => dispatch({ type: 'tick' }), []);
  useTicker(player.status === 'playing', player.delayMs, player.index, onTick);

  const currentStep = steps.length === 0 ? undefined : steps[Math.min(player.index, steps.length - 1)];
  return { player, currentStep, dispatch };
}
```

```jsx
import { motion } from 'framer-motion';

const colorOf = (state, i) => {
  if (state.swap?.includes(i) || state.write === i) return 'var(--swap)';
  if (state.compare?.includes(i)) return 'var(--compare)';
  if (state.pivot === i) return 'var(--pivot)';
  if (state.sorted[i] === 1) return 'var(--done)';
  if (state.range && i >= state.range[0] && i <= state.range[1]) return 'var(--range)';
  return 'var(--idle)';
};

export function BarsCanvas({ state, delayMs }) {
  const max = Math.max(...state.values, 1);
  const duration = delayMs < 60 ? 0 : Math.min(delayMs * 0.0008, 0.25);
  return (
    <div className='flex h-full items-end gap-px' role='img' aria-label='Array visualization bars'>
      {Array.from(state.values, (value, i) => (
        <motion.div
          key={i}
          className='flex-1 rounded-t-sm transition-colors duration-100'
          style={{ backgroundColor: colorOf(state, i) }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ duration, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
```

## 6. Multi-language article code implementations

Every algorithm article must provide comment-free, robust implementations in 5 languages:
1. **Python**
2. **JavaScript** (modern ES2022+)
3. **Java**
4. **C++** (C++17/20)
5. **C** (C99/C11)

All implementations must be strictly **comment-free**, properly formatted, and verified to compute identical results for given inputs.
