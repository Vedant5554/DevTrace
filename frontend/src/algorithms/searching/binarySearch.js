import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function binarySearch(input) {
  let arr;
  let target;

  if (input && typeof input === 'object' && !Array.isArray(input)) {
    arr = [...(input.array || [])].sort((a, b) => a - b);
    target = input.target !== undefined ? input.target : (arr[Math.floor(arr.length / 2)] ?? 50);
  } else {
    arr = [...input].sort((a, b) => a - b);
    target = arr[Math.floor(arr.length / 2)] ?? 50;
  }

  const n = arr.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  let left = 0;
  let right = n - 1;

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
        lo: left,
        hi: right,
        mid: null,
        status: 'searching',
        ...extra,
      },
      { metrics: createMetrics(comparisons, swaps, steps.length) }
    ));
  }

  // Line 2: lo, hi = 0, len(a) - 1
  addStep(
    EVENT_TYPES.MARK,
    2,
    `Initialize binary search: lo = 0, hi = ${n - 1}, target = ${target}`,
    { lo: 0, hi: n - 1 }
  );

  let found = false;

  while (left <= right) {
    // Line 3: while lo <= hi:
    const mid = Math.floor((left + right) / 2);

    // Line 4: mid = (lo + hi) // 2
    addStep(
      EVENT_TYPES.MARK,
      4,
      `Search range [${left}..${right}]: mid = (${left} + ${right}) // 2 = ${mid} (value ${arr[mid]})`,
      {
        lo: left,
        hi: right,
        mid,
        highlights: { pivot: mid },
        status: 'searching',
      }
    );

    // Line 5: if a[mid] == target:
    comparisons++;
    addStep(
      EVENT_TYPES.COMPARE,
      5,
      `Compare a[${mid}] (${arr[mid]}) with target ${target}`,
      {
        lo: left,
        hi: right,
        mid,
        highlights: { compare: [mid] },
        indices: [mid],
        status: 'comparing',
      }
    );

    if (arr[mid] === target) {
      // Line 6: return mid
      addStep(
        EVENT_TYPES.VISIT,
        6,
        `Found target ${target} at index ${mid}!`,
        {
          lo: left,
          hi: right,
          mid,
          highlights: { done: [mid] },
          indices: [mid],
          status: 'found',
        }
      );
      found = true;
      break;
    } else if (arr[mid] < target) {
      // Line 8: lo = mid + 1
      const nextLo = mid + 1;
      addStep(
        EVENT_TYPES.MARK,
        8,
        `Target ${target} > a[${mid}] (${arr[mid]}): search right half, set lo = ${nextLo}`,
        {
          lo: nextLo,
          hi: right,
          mid,
          highlights: { range: [nextLo, right] },
          status: 'searching',
        }
      );
      left = nextLo;
    } else {
      // Line 10: hi = mid - 1
      const nextHi = mid - 1;
      addStep(
        EVENT_TYPES.MARK,
        10,
        `Target ${target} < a[${mid}] (${arr[mid]}): search left half, set hi = ${nextHi}`,
        {
          lo: left,
          hi: nextHi,
          mid,
          highlights: { range: [left, nextHi] },
          status: 'searching',
        }
      );
      right = nextHi;
    }
  }

  if (!found) {
    // Line 11: return -1
    addStep(
      EVENT_TYPES.MARK,
      11,
      `Target ${target} not found in array (lo > hi). Return -1`,
      {
        lo: left,
        hi: right,
        mid: null,
        highlights: { swap: [] },
        status: 'not-found',
      }
    );
  }

  return steps;
}

export { binarySearch };
