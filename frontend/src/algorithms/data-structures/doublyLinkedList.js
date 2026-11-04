import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function doublyLinkedList(input) {
  const nodes = {};
  let head = null;
  let tail = null;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), head, tail, highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize empty doubly linked list', {});

  input.forEach((value, i) => {
    const nodeId = `node_${i}`;
    nodes[nodeId] = { id: nodeId, value, prev: null, next: null };

    if (head === null) {
      head = nodeId;
      tail = nodeId;
      addStep(EVENT_TYPES.MARK, 1, `Create head node with value ${value}`, {
        highlights: { visit: [nodeId] },
        target: nodeId,
      });
    } else {
      nodes[tail].next = nodeId;
      nodes[nodeId].prev = tail;
      addStep(EVENT_TYPES.LINK, 2, `Link node ${tail} (${nodes[tail].value}) <-> new node ${nodeId} (${value})`, {
        highlights: { link: [tail, nodeId] },
        target: nodeId,
      });
      tail = nodeId;
    }
  });

  addStep(EVENT_TYPES.MARK, 3, 'Traverse forward from head', {});
  let current = head;
  let index = 0;
  while (current) {
    addStep(EVENT_TYPES.VISIT, 4, `Forward visit node ${index}: value ${nodes[current].value}`, {
      highlights: { visit: [current] },
      target: current,
    });
    current = nodes[current].next;
    index++;
  }

  addStep(EVENT_TYPES.MARK, 5, 'Traverse backward from tail', {});
  current = tail;
  index = 0;
  while (current) {
    addStep(EVENT_TYPES.VISIT, 6, `Backward visit node ${index}: value ${nodes[current].value}`, {
      highlights: { visit: [current] },
      target: current,
    });
    current = nodes[current].prev;
    index++;
  }

  const searchValue = input[Math.floor(input.length / 2)];
  addStep(EVENT_TYPES.MARK, 7, `Search for value ${searchValue}`, { target: searchValue });
  current = head;
  index = 0;
  while (current) {
    comparisons++;
    addStep(EVENT_TYPES.COMPARE, 8, `Compare ${nodes[current].value} with ${searchValue}`, {
      highlights: { compare: [current] },
      target: current,
    });
    if (nodes[current].value === searchValue) {
      addStep(EVENT_TYPES.VISIT, 9, `Found ${searchValue} at position ${index}`, {
        highlights: { done: [current] },
        target: current,
      });
      break;
    }
    current = nodes[current].next;
    index++;
  }

  addStep(EVENT_TYPES.MARK, 10, 'Doubly linked list operations complete', {
    highlights: { done: Object.keys(nodes) },
  });

  return steps;
}

export { doublyLinkedList };