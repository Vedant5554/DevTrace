import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function linearSearch(input) {
  let arr;
  let target;

  if (input && typeof input === 'object' && !Array.isArray(input)) {
    arr = [...(input.array || [])];
    target = input.target !== undefined ? input.target : (arr[Math.floor(arr.length / 2)] ?? 50);
  } else {
    arr = [...input];
    target = arr[Math.floor(arr.length / 2)] ?? 50;
  }

  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(
      type,
      line,
      note,
      {
        array: cloneState(arr),
        highlights: {},
        target,
        currentIdx: null,
        status: 'searching',
        ...extra,
      },
      { metrics: createMetrics(comparisons, swaps, steps.length) }
    ));
  }

  // Line 2: for i in range(len(a)):
  addStep(
    EVENT_TYPES.MARK,
    2,
    `Initialize linear search for target ${target} across ${n} elements`,
    { currentIdx: null, status: 'searching' }
  );

  let found = false;

  for (let i = 0; i < n; i++) {
    comparisons++;
    // Line 3: if a[i] == target:
    addStep(
      EVENT_TYPES.COMPARE,
      3,
      `Inspect index ${i}: compare a[${i}] (${arr[i]}) with target ${target}`,
      {
        currentIdx: i,
        highlights: { compare: [i] },
        indices: [i],
        status: 'comparing',
      }
    );

    if (arr[i] === target) {
      // Line 4: return i
      addStep(
        EVENT_TYPES.VISIT,
        4,
        `Found target ${target} at index ${i}!`,
        {
          currentIdx: i,
          highlights: { done: [i] },
          indices: [i],
          status: 'found',
        }
      );
      found = true;
      break;
    }
  }

  if (!found) {
    // Line 5: return -1
    addStep(
      EVENT_TYPES.MARK,
      5,
      `Target ${target} not found in array after inspecting all ${n} items. Return -1`,
      {
        currentIdx: null,
        highlights: { swap: [] },
        status: 'not-found',
      }
    );
  }

  return steps;
}

export { linearSearch };
