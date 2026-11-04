import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function mergeSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize merge sort', { range: [0, n - 1] });

  function mergeSortRecursive(left, right, depth = 0) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    addStep(EVENT_TYPES.MARK, 1, `Divide: split range [${left}..${right}] at mid ${mid}`, {
      range: [left, right],
      pivot: mid,
    });

    mergeSortRecursive(left, mid, depth + 1);
    mergeSortRecursive(mid + 1, right, depth + 1);

    addStep(EVENT_TYPES.MARK, 2, `Merge: combine sorted subarrays [${left}..${mid}] and [${mid + 1}..${right}]`, {
      range: [left, right],
    });

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 3, `Compare ${leftArr[i]} (left) with ${rightArr[j]} (right)`, {
        highlights: { compare: [left + i, mid + 1 + j] },
        indices: [left + i, mid + 1 + j],
        range: [left, right],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        swaps++;
        addStep(EVENT_TYPES.SET, 4, `Place ${leftArr[i]} from left at index ${k}`, {
          highlights: { swap: [k] },
          indices: [k],
          range: [left, right],
        });
        i++;
      } else {
        arr[k] = rightArr[j];
        swaps++;
        addStep(EVENT_TYPES.SET, 5, `Place ${rightArr[j]} from right at index ${k}`, {
          highlights: { swap: [k] },
          indices: [k],
          range: [left, right],
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      addStep(EVENT_TYPES.SET, 6, `Copy remaining ${leftArr[i]} from left to index ${k}`, {
        highlights: { swap: [k] },
        indices: [k],
        range: [left, right],
      });
      i++; k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      addStep(EVENT_TYPES.SET, 7, `Copy remaining ${rightArr[j]} from right to index ${k}`, {
        highlights: { swap: [k] },
        indices: [k],
        range: [left, right],
      });
      j++; k++;
    }

    addStep(EVENT_TYPES.MARK, 8, `Range [${left}..${right}] is now sorted`, {
      range: [left, right],
      sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
    });
  }

  mergeSortRecursive(0, n - 1);

  addStep(EVENT_TYPES.MARK, 9, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { mergeSort };