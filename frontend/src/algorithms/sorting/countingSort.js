import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function countingSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize counting sort', { maxVal: Math.max(...arr) });

  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
    addStep(EVENT_TYPES.MARK, 1, `Count occurrence of ${arr[i]}`, {
      highlights: { compare: [i] },
      indices: [i],
      count: [...count],
    });
  }

  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
    addStep(EVENT_TYPES.MARK, 2, `Accumulate count: count[${i}] = ${count[i]}`, {
      count: [...count],
    });
  }

  const output = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
    swaps++;
    addStep(EVENT_TYPES.SET, 3, `Place ${arr[i]} at output index ${count[arr[i]]}`, {
      highlights: { swap: [count[arr[i]]] },
      indices: [count[arr[i]]],
      count: [...count],
    });
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
    addStep(EVENT_TYPES.SET, 4, `Copy ${arr[i]} back to array index ${i}`, {
      highlights: { swap: [i] },
      indices: [i],
    });
  }

  addStep(EVENT_TYPES.MARK, 5, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { countingSort };