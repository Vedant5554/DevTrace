import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function radixSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize radix sort (LSD)', { pass: 0 });

  const max = Math.max(...arr);
  let exp = 1;
  let pass = 0;

  while (Math.floor(max / exp) > 0) {
    pass++;
    addStep(EVENT_TYPES.MARK, 1, `Pass ${pass}: sort by digit at 10^${pass - 1} place`, { pass, exp });

    const output = new Array(n);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      addStep(EVENT_TYPES.MARK, 2, `Count digit ${digit} for element ${arr[i]}`, {
        highlights: { compare: [i] },
        indices: [i],
        pass,
        count: [...count],
      });
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      swaps++;
      addStep(EVENT_TYPES.SET, 3, `Place ${arr[i]} at output index ${count[digit]} (digit ${digit})`, {
        highlights: { swap: [count[digit]] },
        indices: [count[digit]],
        pass,
        count: [...count],
      });
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      addStep(EVENT_TYPES.SET, 4, `Copy ${arr[i]} back to array index ${i}`, {
        highlights: { swap: [i] },
        indices: [i],
        pass,
      });
    }

    addStep(EVENT_TYPES.MARK, 5, `Pass ${pass} complete: array sorted by 10^${pass - 1} digit`, {
      pass,
      sorted: Array.from({ length: n }, (_, k) => k),
    });

    exp *= 10;
  }

  addStep(EVENT_TYPES.MARK, 6, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { radixSort };