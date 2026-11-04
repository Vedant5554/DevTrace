import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function hashTable(input) {
  const capacity = 16;
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

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { buckets: cloneState(buckets), capacity, highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, `Initialize hash table with ${capacity} buckets`, {});

  input.forEach((item) => {
    const key = `key${item}`;
    const value = `value${item}`;
    const index = hash(key);

    addStep(EVENT_TYPES.MARK, 1, `Insert ("${key}", "${value}") - hash to bucket ${index}`, {
      highlights: { visit: [`bucket_${index}`] },
      target: `bucket_${index}`,
    });

    let collision = false;
    buckets[index].forEach((existing, j) => {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 2, `Check for collision with existing key "${existing.key}"`, {
        highlights: { compare: [`bucket_${index}_${j}`] },
        target: `bucket_${index}_${j}`,
      });
      if (existing.key === key) {
        collision = true;
      }
    });

    if (!collision) {
      buckets[index].push({ key, value });
      const entryIndex = buckets[index].length - 1;
      addStep(EVENT_TYPES.LINK, 3, `Add entry to bucket ${index} at position ${entryIndex}`, {
        highlights: { link: [`bucket_${index}_${entryIndex}`] },
        target: `bucket_${index}_${entryIndex}`,
      });
    }
  });

  const searchKey = `key${input[Math.floor(input.length / 2)]}`;
  addStep(EVENT_TYPES.MARK, 4, `Search for key "${searchKey}"`, { target: searchKey });
  const searchIndex = hash(searchKey);
  buckets[searchIndex].forEach((entry, j) => {
    comparisons++;
    addStep(EVENT_TYPES.COMPARE, 5, `Compare with "${entry.key}" in bucket ${searchIndex}`, {
      highlights: { compare: [`bucket_${searchIndex}_${j}`] },
      target: `bucket_${searchIndex}_${j}`,
    });
    if (entry.key === searchKey) {
      addStep(EVENT_TYPES.VISIT, 6, `Found "${searchKey}" with value "${entry.value}"`, {
        highlights: { done: [`bucket_${searchIndex}_${j}`] },
        target: `bucket_${searchIndex}_${j}`,
      });
    }
  });

  addStep(EVENT_TYPES.MARK, 7, 'Hash table operations complete', {
    highlights: { done: [] },
  });

  return steps;
}

export { hashTable };