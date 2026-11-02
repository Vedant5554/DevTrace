# Feature Development  -  Workflow & Recipes

## 1. Development workflow

| Aspect | Rule |
|---|---|
| **Branching** | `main` is always stable and deployable. Builders work on feature branches named `feat/<section>-<algorithm>` (e.g. `feat/sorting-radix-sort`). |
| **Commit style** | Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`. Exactly one logical unit per commit. |
| **Pull requests** | Exactly **one algorithm per PR**. Must include generator, unit/property test, canvas integration, and 8-part article with 5-language code. |
| **Review gate** | PR merges only after passing lint, tests, and all items on the 6-point Review Checklist. |
| **Freeze** | Feature freeze occurs at **Day 4 midday**. After freeze, only bug fixes (`fix:`) and documentation adjustments (`docs:`) are permitted. |

## 2. Step generator design rules

When implementing an algorithm generator in JavaScript:

1. **One event per discrete operation:** Emitting distinct `compare`, `swap`, `set`, `mark`, `visit`, `relax`, or `link` events ensures fine-grained step inspection.
2. **Immutable step snapshots:** Always clone state arrays (`values.slice()`); never mutate objects or arrays stored in prior steps.
3. **Boundary steps:** Step 0 must represent the pristine, unmutated initial input. The final step must represent the completed, settled state.
4. **Descriptive notes:** Every step must include a clear, human-readable sentence in `note` (e.g. `"Compare 42 and 18 at index 3 and 4"`).
5. **Pseudocode synchronization:** Set `line` to the exact 0-indexed line in the algorithm's `pseudocode[]` array.
6. **Guard limits:** Cap traces at 20,000 steps using `TraceLimitError`.

## 3. Recipe: adding a new algorithm (worked example: Insertion Sort)

### 3.1 Implement the generator
`src/algorithms/sorting/insertionSort.js`

```js
import { createRecorder } from './recorder.js';

export function insertionSort(input) {
  const { values, sorted, steps, counters, push } = createRecorder(input);
  push('mark', {}, 'Initial array loaded', 0);
  for (let i = 1; i < values.length; i++) {
    let j = i;
    while (j > 0) {
      counters.comparisons++;
      push('compare', { compare: [j - 1, j] }, `Compare ${values[j - 1]} and ${values[j]}`, 3);
      if (values[j - 1] <= values[j]) break;
      [values[j - 1], values[j]] = [values[j], values[j - 1]];
      counters.swaps++;
      push('swap', { swap: [j - 1, j] }, `Swap ${values[j - 1]} and ${values[j]}`, 4);
      j--;
    }
  }
  sorted.fill(1);
  push('mark', {}, 'Array fully sorted', 7);
  return steps;
}
```

### 3.2 Register the algorithm
`src/algorithms/sorting/index.js`

```js
import { register } from '../../core/registry.js';
import { insertionSort } from './insertionSort.js';

register({
  id: 'insertion-sort',
  name: 'Insertion Sort',
  section: 'sorting',
  blurb: 'Watch items shift one by one into an expanding sorted sub-array.',
  complexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: true,
  },
  pseudocode: [
    'insertionSort(a):',
    '  for i from 1 to n-1:',
    '    j = i',
    '    while j > 0 and a[j-1] > a[j]:',
    '      swap(a[j-1], a[j])',
    '      j = j - 1',
    '  return a',
  ],
  defaultInput: [35, 12, 48, 20, 9, 27],
  generate: insertionSort,
});
```

### 3.3 Author the test
`src/algorithms/sorting/insertionSort.test.js`

```js
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { insertionSort } from './insertionSort.js';

describe('insertionSort', () => {
  it('correctly sorts arbitrary arrays and flags completion', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 1, max: 999 }), { minLength: 2, maxLength: 60 }), (input) => {
        const steps = insertionSort(input);
        const last = steps[steps.length - 1].state;
        expect(Array.from(last.values)).toEqual([...input].sort((a, b) => a - b));
        expect(last.sorted.every((flag) => flag === 1)).toBe(true);
      }),
    );
  });

  it('preserves initial input on step 0', () => {
    const input = [9, 3, 7];
    const steps = insertionSort(input);
    expect(Array.from(steps[0].state.values)).toEqual([9, 3, 7]);
  });
});
```

### 3.4 Create the 8-part article content
Create `src/content/sorting/insertion-sort.js` supplying the 8 required sections:
1. Introduction (2 short paragraphs)
2. Complexity Table
3. Step-by-Step Table
4. Worked Example Table (with state per step)
5. When to Use vs When to Avoid Table
6. Code Implementations in Python, JavaScript, Java, C++, and C (strictly comment-free)
7. FAQ
8. Sibling Links

## 4. Pull request review checklist

Before merging any algorithm PR, the Reviewer verifies:

- [ ] **1. Final state:** Output matches reference oracle; step list is non-empty.
- [ ] **2. Step reversibility:** Forward then back returns identical visual state; reset returns to step 0.
- [ ] **3. Controls & URL:** Play/pause/speed/size work; URL query params preserve state on reload.
- [ ] **4. Navigation:** Sibling links and section dropdown function cleanly.
- [ ] **5. Article completeness:** All 8 parts present in specified order; complexity matches hub table.
- [ ] **6. Multi-language code:** Comment-free implementations in Python, JS, Java, C++, and C.
