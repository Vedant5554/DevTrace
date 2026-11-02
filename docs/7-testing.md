# Testing & QA  -  Strategy & Quality Assurance

## 1. Quality assurance strategy

DevTrace's testing strategy concentrates on pure JavaScript algorithm generators, the player state machine, and deterministic step replay. Because there is no backend and no TypeScript compilation overhead, tests run fast, execute natively with Vitest, and integrate directly into local developer runs.

| Layer | Tools | Scope | Coverage Goal |
|---|---|---|---|
| **Algorithms** | Vitest + fast-check | 27 pure JavaScript generators (Sorting, Trees, Graphs, Search, Recursion) | 100% of generators property-tested against oracles |
| **Player Engine** | Vitest | `playerReducer`, `useTicker` (fake timers), URL state sync | 100% of reducer branches |
| **Visual Canvases** | Vitest + RTL | `BarsCanvas.jsx`, `TreeCanvas.jsx`, `GraphCanvas.jsx` | Visual state mapping and step synchronization |
| **Components** | React Testing Library | Playback toolbar, navigation menu, code snippet copy | User interactions and accessibility |
| **Review Gate** | Manual Checklist | All 27 pages reviewed by Reviewer/QA | 100% adherence to 6-point checklist |

## 2. Player reducer tests (JavaScript State Machine)

```js
import { describe, expect, it } from 'vitest';
import { playerReducer } from './player.js';

const base = { stepCount: 5, index: 0, status: 'idle', delayMs: 250 };

describe('playerReducer', () => {
  it('ignores a tick received after pause', () => {
    const paused = playerReducer({ ...base, index: 2, status: 'playing' }, { type: 'pause' });
    expect(playerReducer(paused, { type: 'tick' })).toBe(paused);
  });

  it('restores exact state on step then back', () => {
    const stepped = playerReducer(base, { type: 'step' });
    expect(playerReducer(stepped, { type: 'back' }).index).toBe(0);
  });

  it('transitions to finished on the last step and resets to 0 on play', () => {
    const last = playerReducer({ ...base, index: 3, status: 'playing' }, { type: 'tick' });
    expect(last).toMatchObject({ index: 4, status: 'finished' });
    expect(playerReducer(last, { type: 'play' })).toMatchObject({ index: 0, status: 'playing' });
  });

  it('clamps delayMs within valid boundaries', () => {
    expect(playerReducer(base, { type: 'speed', delayMs: 1 }).delayMs).toBe(10);
    expect(playerReducer(base, { type: 'speed', delayMs: 99999 }).delayMs).toBe(1500);
  });
});
```

## 3. Algorithm property & oracle tests (JavaScript)

All 27 algorithms are tested for invariant preservation:

```js
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { bubbleSort } from './bubbleSort.js';
import { mergeSort } from './mergeSort.js';
import { quickSort } from './quickSort.js';

const arrays = fc.array(fc.integer({ min: 1, max: 999 }), { minLength: 2, maxLength: 60 });

describe.each([
  ['bubble', bubbleSort],
  ['quick', quickSort],
  ['merge', mergeSort],
])('%s sort', (_name, sort) => {
  it('ends sorted and fully flagged', () => {
    fc.assert(
      fc.property(arrays, (input) => {
        const steps = sort(input);
        const last = steps[steps.length - 1].state;
        expect(Array.from(last.values)).toEqual([...input].sort((a, b) => a - b));
        expect(last.sorted.every((flag) => flag === 1)).toBe(true);
      }),
    );
  });

  it('preserves initial input on step 0', () => {
    fc.assert(
      fc.property(arrays, (input) => {
        const steps = sort(input);
        expect(Array.from(steps[0].state.values)).toEqual(input);
      }),
    );
  });
});
```

## 4. Key project risks & mitigation plan

With the transition to a 5-day sprint delivering 27 algorithm pages and articles in JavaScript, the project risk profile centers on review bandwidth and content accuracy:

| Risk | Impact | Likelihood | Mitigation Strategy |
|---|---|---|---|
| **1. Review load on single QA person** | High | High | ~5 to 6 pages land on the reviewer per day. Automated property tests serve as the merge prerequisite. On Day 4, each builder cross-tests another builder's section before submitting to the QA gate. |
| **2. Writing 27 articles with correct multi-language code** | High | High | Use a single standardized 8-part article template. Builders author articles alongside generators using Claude Code. Reviewer verifies code compilation against language syntax standards. |
| **3. Step reversibility desynchronization** | High | Med | The player replays pre-recorded step lists. Because steps are immutable snapshots, stepping backward is structurally guaranteed to restore state. |
| **4. Visual rendering performance at high speed** | Med | Low | Canvases bypass unnecessary React re-renders during playback; Framer Motion transitions are disabled when `delayMs < 60 ms` or when stepping. |

## 5. Review checklist (Definition of Done per page)

Every one of the 27 pages must be verified against this checklist before merging:

- [ ] **1. Final state:** The step list ends in the right state (sorted array, visit order, shortest distances) and is never empty.
- [ ] **2. Step reversibility:** Stepping forward then back lands on the exact same state, and reset returns to step 0.
- [ ] **3. Playback & URL:** Play, pause, speed, and size work; URL keeps `view`, `speed`, and `size` parameters after a page reload.
- [ ] **4. Navigation:** The sidebar/menu lists all algorithms in the section, and switching between them works smoothly.
- [ ] **5. Article completeness:** The article has all eight parts in the specified order, and its complexity table matches the section hub table.
- [ ] **6. Multi-language code:** Code in all five languages (Python, JavaScript, Java, C++, C) is strictly comment-free, idiomatic, and produces identical results.

## 6. Day 4 & Day 5 regression protocol

1. **Midday Day 4 Feature Freeze:** No new features or algorithms accepted; focus shifts entirely to verification.
2. **Cross-testing:** Builders test adjacent sections (Arrays tests Graphs, Graphs tests Trees, Trees tests Arrays).
3. **Full 27-Page Run-through:** Reviewer runs the 6-point checklist on every page.
4. **Static Build Verification:** `npm run build && npm run preview` verified on clean environment.
