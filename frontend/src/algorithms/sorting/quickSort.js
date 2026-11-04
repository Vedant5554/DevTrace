import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function quickSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize quick sort', { range: [0, n - 1] });

  function partition(low, high) {
    const pivotValue = arr[high];
    let i = low - 1;

    addStep(EVENT_TYPES.MARK, 1, `Partition [${low}..${high}]: pivot is ${pivotValue} at index ${high}`, {
      range: [low, high],
      pivot: high,
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 2, `Compare ${arr[j]} at index ${j} with pivot ${pivotValue}`, {
        highlights: { compare: [j, high] },
        indices: [j, high],
        range: [low, high],
        pivot: high,
      });

      if (arr[j] < pivotValue) {
        i++;
        if (i !== j) {
          swaps++;
          addStep(EVENT_TYPES.SWAP, 3, `Swap ${arr[i]} at index ${i} with ${arr[j]} at index ${j}`, {
            highlights: { swap: [i, j] },
            indices: [i, j],
            range: [low, high],
            pivot: high,
          });
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }

    if (i + 1 !== high) {
      swaps++;
      addStep(EVENT_TYPES.SWAP, 4, `Place pivot ${pivotValue} at index ${i + 1} by swapping with ${arr[i + 1]}`, {
        highlights: { swap: [i + 1, high] },
        indices: [i + 1, high],
        range: [low, high],
      });
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
    }

    addStep(EVENT_TYPES.MARK, 5, `Pivot ${pivotValue} is now at its final position ${i + 1}`, {
      range: [low, high],
      pivot: i + 1,
      sorted: [i + 1],
    });

    return i + 1;
  }

  function quickSortRecursive(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    }
  }

  quickSortRecursive(0, n - 1);

  addStep(EVENT_TYPES.MARK, 6, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { quickSort };