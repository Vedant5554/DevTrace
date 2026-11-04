import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function bubbleSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize bubble sort', { sorted: [] });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 1, `Compare ${arr[j]} and ${arr[j + 1]} at indices ${j} and ${j + 1}`, {
        highlights: { compare: [j, j + 1] },
        indices: [j, j + 1],
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        addStep(EVENT_TYPES.SWAP, 2, `Swap ${arr[j + 1]} and ${arr[j]} at indices ${j} and ${j + 1}`, {
          highlights: { swap: [j, j + 1] },
          indices: [j, j + 1],
        });
      }
    }
    const sortedIndex = n - 1 - i;
    addStep(EVENT_TYPES.MARK, 3, `Element at index ${sortedIndex} (${arr[sortedIndex]}) is now in final position`, {
      sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
    });
    if (!swapped) break;
  }

  addStep(EVENT_TYPES.MARK, 4, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { bubbleSort };