import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function heapSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { array: cloneState(arr), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize heap sort', { heapSize: n });

  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 1, `Compare left child ${arr[left]} at ${left} with parent ${arr[largest]} at ${largest}`, {
        highlights: { compare: [left, largest] },
        indices: [left, largest],
        heapSize: size,
        pivot: root,
      });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < size) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 2, `Compare right child ${arr[right]} at ${right} with current largest ${arr[largest]} at ${largest}`, {
        highlights: { compare: [right, largest] },
        indices: [right, largest],
        heapSize: size,
        pivot: root,
      });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== root) {
      swaps++;
      addStep(EVENT_TYPES.SWAP, 3, `Swap ${arr[root]} at ${root} with ${arr[largest]} at ${largest}`, {
        highlights: { swap: [root, largest] },
        indices: [root, largest],
        heapSize: size,
        pivot: root,
      });
      const temp = arr[root];
      arr[root] = arr[largest];
      arr[largest] = temp;
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    addStep(EVENT_TYPES.MARK, 4, `Heapify subtree rooted at ${i}`, { heapSize: n, pivot: i });
    heapify(n, i);
  }

  addStep(EVENT_TYPES.MARK, 5, 'Max heap built, starting extraction', { heapSize: n });

  for (let i = n - 1; i > 0; i--) {
    swaps++;
    addStep(EVENT_TYPES.SWAP, 6, `Swap root ${arr[0]} (max) with last element ${arr[i]} at index ${i}`, {
      highlights: { swap: [0, i] },
      indices: [0, i],
      heapSize: i,
    });
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    addStep(EVENT_TYPES.MARK, 7, `Element ${arr[i]} at index ${i} is in final position`, {
      sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      heapSize: i,
    });

    heapify(i, 0);
  }

  addStep(EVENT_TYPES.MARK, 8, 'Array is sorted', {
    sorted: Array.from({ length: n }, (_, k) => k),
    highlights: { done: Array.from({ length: n }, (_, k) => k) },
  });

  return steps;
}

export { heapSort };