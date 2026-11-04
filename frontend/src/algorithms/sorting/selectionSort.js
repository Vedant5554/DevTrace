import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function selectionSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize selection sort', { sorted: [] });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    addStep(EVENT_TYPES.MARK, 1, `Assume index ${i} (${arr[i]}) is the minimum`, {
      highlights: { pivot: i },
      sorted: Array.from({ length: i }, (_, k) => k),
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 2, `Compare ${arr[j]} at index ${j} with current minimum ${arr[minIdx]} at index ${minIdx}`, {
        highlights: { compare: [j, minIdx], pivot: minIdx },
        indices: [j, minIdx],
        sorted: Array.from({ length: i }, (_, k) => k),
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        addStep(EVENT_TYPES.MARK, 3, `New minimum found: ${arr[minIdx]} at index ${minIdx}`, {
          highlights: { pivot: minIdx },
          sorted: Array.from({ length: i }, (_, k) => k),
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      addStep(EVENT_TYPES.SWAP, 4, `Swap ${arr[i]} at index ${i} with minimum ${arr[minIdx]} at index ${minIdx}`, {
        highlights: { swap: [i, minIdx] },
        indices: [i, minIdx],
        sorted: Array.from({ length: i }, (_, k) => k),
      });
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }

    addStep(EVENT_TYPES.MARK, 5, `Element at index ${i} (${arr[i]}) is now in final position`, {
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
    });
  }

  addStep(EVENT_TYPES.MARK, 6, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { selectionSort };