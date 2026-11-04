import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../../core/events.js';

function bstInsert(nodes, root, value) {
  let current = root;
  let parent = null;
  const path = [];

  while (current !== null) {
    parent = current;
    path.push(current);
    if (value < nodes[current].value) {
      current = nodes[current].left;
    } else {
      current = nodes[current].right;
    }
  }

  const newId = Object.keys(nodes).length;
  nodes[newId] = { id: newId, value, left: null, right: null };

  if (parent === null) {
    return { root: newId, path: [newId] };
  }

  if (value < nodes[parent].value) {
    nodes[parent].left = newId;
  } else {
    nodes[parent].right = newId;
  }

  return { root, path: [...path, newId] };
}

function bstSearch(nodes, root, value) {
  const path = [];
  let current = root;

  while (current !== null) {
    path.push(current);
    if (value === nodes[current].value) {
      return { found: true, path, nodeId: current };
    } else if (value < nodes[current].value) {
      current = nodes[current].left;
    } else {
      current = nodes[current].right;
    }
  }

  return { found: false, path, nodeId: null };
}

function bst(input) {
  const nodes = {};
  let root = null;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), root, highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize empty BST', {});

  input.forEach((value) => {
    addStep(EVENT_TYPES.MARK, 1, `Insert ${value} into BST`, { target: value });
    const result = bstInsert(nodes, root, value);
    root = result.root;

    result.path.forEach((id, idx) => {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 2, `Compare ${value} with ${nodes[id].value} at node ${id}`, {
        highlights: { compare: [id], path: result.path.slice(0, idx + 1) },
        target: id,
      });
    });

    addStep(EVENT_TYPES.LINK, 3, `Insert ${value} as new node ${result.path[result.path.length - 1]}`, {
      highlights: { visit: [result.path[result.path.length - 1]] },
      target: result.path[result.path.length - 1],
    });
  });

  const searchValue = input[Math.floor(input.length / 2)];
  addStep(EVENT_TYPES.MARK, 4, `Search for ${searchValue}`, { target: searchValue });
  const searchResult = bstSearch(nodes, root, searchValue);
  searchResult.path.forEach((id, idx) => {
    comparisons++;
    addStep(EVENT_TYPES.COMPARE, 5, `Compare ${searchValue} with ${nodes[id].value} at node ${id}`, {
      highlights: { compare: [id], path: searchResult.path.slice(0, idx + 1) },
      target: id,
    });
  });

  if (searchResult.found) {
    addStep(EVENT_TYPES.VISIT, 6, `Found ${searchValue} at node ${searchResult.nodeId}`, {
      highlights: { done: [searchResult.nodeId] },
      target: searchResult.nodeId,
    });
  }

  addStep(EVENT_TYPES.MARK, 7, 'BST operations complete', {
    highlights: { done: Object.keys(nodes).map(Number) },
  });

  return steps;
}

export { bst, bstInsert, bstSearch };