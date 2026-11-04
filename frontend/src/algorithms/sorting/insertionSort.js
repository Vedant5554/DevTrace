import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function insertionSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize insertion sort', { sorted: [0] });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    addStep(EVENT_TYPES.MARK, 1, `Insert ${key} at index ${i} into sorted portion [0..${i - 1}]`, {
      highlights: { pivot: i },
      sorted: Array.from({ length: i }, (_, k) => k),
    });

    while (j >= 0) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 2, `Compare ${key} with ${arr[j]} at index ${j}`, {
        highlights: { compare: [j, j + 1] },
        indices: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k),
      });

      if (arr[j] > key) {
        swaps++;
        arr[j + 1] = arr[j];
        addStep(EVENT_TYPES.SET, 3, `Shift ${arr[j]} right from index ${j} to ${j + 1}`, {
          highlights: { swap: [j, j + 1] },
          indices: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => k),
        });
        j--;
      } else {
        break;
      }
    }

    if (j + 1 !== i) {
      arr[j + 1] = key;
      addStep(EVENT_TYPES.SET, 4, `Insert ${key} at index ${j + 1}`, {
        highlights: { swap: [j + 1] },
        indices: [j + 1],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
      });
    }

    addStep(EVENT_TYPES.MARK, 5, `Subarray [0..${i}] is now sorted`, {
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
    });
  }

  addStep(EVENT_TYPES.MARK, 6, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { insertionSort };