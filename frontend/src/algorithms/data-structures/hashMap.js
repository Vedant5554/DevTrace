import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function hashMap(input) {
  let capacity = 8;
  let size = 0;
  const loadFactorThreshold = 0.75;
  const buckets = Array.from({ length: capacity }, () => []);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % capacity;
    }
    return hash;
  }

  function resize(newCapacity) {
    const oldBuckets = buckets;
    capacity = newCapacity;
    buckets.length = 0;
    for (let i = 0; i < capacity; i++) {
      buckets.push([]);
    }
    oldBuckets.forEach((bucket) => {
      bucket.forEach((entry) => {
        const index = hash(entry.key);
        buckets[index].push(entry);
      });
    });
  }

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { buckets: cloneState(buckets), capacity, size, loadFactor: size / capacity, highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, `Initialize hash map with capacity ${capacity}, load factor threshold ${loadFactorThreshold}`, {});

  input.forEach((item) => {
    const key = `key${item}`;
    const value = `value${item}`;

    if (size / capacity >= loadFactorThreshold) {
      const newCapacity = capacity * 2;
      addStep(EVENT_TYPES.MARK, 1, `Load factor ${(size / capacity).toFixed(2)} >= ${loadFactorThreshold}, resize to ${newCapacity}`, {
        highlights: { range: [0, capacity - 1] },
      });
      resize(newCapacity);
      addStep(EVENT_TYPES.MARK, 2, `Resize complete: rehashed ${size} entries into ${capacity} buckets`, {
        highlights: { range: [0, capacity - 1] },
      });
    }

    const index = hash(key);
    addStep(EVENT_TYPES.MARK, 3, `Insert ("${key}", "${value}") - hash to bucket ${index}`, {
      highlights: { visit: [`bucket_${index}`] },
      target: `bucket_${index}`,
    });

    let found = false;
    buckets[index].forEach((entry, j) => {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 4, `Check existing entry "${entry.key}"`, {
        highlights: { compare: [`bucket_${index}_${j}`] },
        target: `bucket_${index}_${j}`,
      });
      if (entry.key === key) {
        entry.value = value;
        found = true;
      }
    });

    if (!found) {
      buckets[index].push({ key, value });
      size++;
      const entryIndex = buckets[index].length - 1;
      addStep(EVENT_TYPES.LINK, 5, `Add new entry to bucket ${index} at position ${entryIndex}`, {
        highlights: { link: [`bucket_${index}_${entryIndex}`] },
        target: `bucket_${index}_${entryIndex}`,
      });
    }
  });

  const searchKey = `key${input[Math.floor(input.length / 2)]}`;
  addStep(EVENT_TYPES.MARK, 6, `Search for key "${searchKey}"`, { target: searchKey });
  const searchIndex = hash(searchKey);
  buckets[searchIndex].forEach((entry, j) => {
    comparisons++;
    addStep(EVENT_TYPES.COMPARE, 7, `Compare with "${entry.key}" in bucket ${searchIndex}`, {
      highlights: { compare: [`bucket_${searchIndex}_${j}`] },
      target: `bucket_${searchIndex}_${j}`,
    });
    if (entry.key === searchKey) {
      addStep(EVENT_TYPES.VISIT, 8, `Found "${searchKey}" with value "${entry.value}"`, {
        highlights: { done: [`bucket_${searchIndex}_${j}`] },
        target: `bucket_${searchIndex}_${j}`,
      });
    }
  });

  addStep(EVENT_TYPES.MARK, 9, 'Hash map operations complete', {
    highlights: { done: [] },
  });

  return steps;
}

export { hashMap };