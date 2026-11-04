import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../../core/events.js';

function heapify(arr, n, i, steps, addStep) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    addStep(EVENT_TYPES.COMPARE, 1, `Compare left child ${arr[left]} at ${left} with parent ${arr[largest]} at ${largest}`, {
      highlights: { compare: [left, largest] },
      indices: [left, largest],
      heapSize: n,
    });
    if (arr[left] > arr[largest]) largest = left;
  }

  if (right < n) {
    addStep(EVENT_TYPES.COMPARE, 2, `Compare right child ${arr[right]} at ${right} with current largest ${arr[largest]} at ${largest}`, {
      highlights: { compare: [right, largest] },
      indices: [right, largest],
      heapSize: n,
    });
    if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== i) {
    addStep(EVENT_TYPES.SWAP, 3, `Swap ${arr[i]} at ${i} with ${arr[largest]} at ${largest}`, {
      highlights: { swap: [i, largest] },
      indices: [i, largest],
      heapSize: n,
    });
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, n, largest, steps, addStep);
  }
}

function heap(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, heapSize: n, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Build max heap from array', { heapSize: n });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    addStep(EVENT_TYPES.MARK, 4, `Heapify subtree rooted at index ${i} (value ${arr[i]})`, { heapSize: n, pivot: i });
    heapify(arr, n, i, steps, addStep);
  }

  addStep(EVENT_TYPES.MARK, 5, 'Max heap built. Root contains maximum element.', {
    highlights: { pivot: 0 },
    heapSize: n,
  });

  for (let i = n - 1; i > 0; i--) {
    addStep(EVENT_TYPES.SWAP, 6, `Extract max: swap root ${arr[0]} with last element ${arr[i]}`, {
      highlights: { swap: [0, i] },
      indices: [0, i],
      heapSize: i,
    });
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    addStep(EVENT_TYPES.MARK, 7, `Max element ${arr[i]} extracted to index ${i}`, {
      sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      heapSize: i,
    });

    heapify(arr, i, 0, steps, addStep);
  }

  addStep(EVENT_TYPES.MARK, 8, 'Heap sort complete (array sorted)', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { heap };