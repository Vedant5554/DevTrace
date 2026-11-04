import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function buildDirectedGraph(edges, nodeCount) {
  const nodes = {};
  for (let i = 0; i < nodeCount; i++) {
    nodes[i] = { id: i, neighbors: [], inDegree: 0 };
  }
  edges.forEach(([from, to]) => {
    nodes[from].neighbors.push(to);
    nodes[to].inDegree++;
  });
  return nodes;
}

function topologicalSort(input) {
  const { edges = [], nodeCount = 6 } = input;
  const nodes = buildDirectedGraph(edges, nodeCount);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const queue = [];
  const result = [];

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), highlights: {}, result: [...result], ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize topological sort - compute in-degrees', {});

  Object.values(nodes).forEach((node) => {
    if (node.inDegree === 0) {
      queue.push(node.id);
    }
  });

  addStep(EVENT_TYPES.MARK, 1, `Enqueue nodes with in-degree 0: [${queue.join(', ')}]`, {
    highlights: { visit: queue },
  });

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    addStep(EVENT_TYPES.VISIT, 2, `Process node ${current}, add to topological order`, {
      highlights: { visit: [current], done: [...result] },
      target: current,
      result: [...result],
    });

    nodes[current].neighbors.forEach((neighbor) => {
      comparisons++;
      nodes[neighbor].inDegree--;
      addStep(EVENT_TYPES.COMPARE, 3, `Decrease in-degree of ${neighbor} to ${nodes[neighbor].inDegree}`, {
        highlights: { compare: [neighbor] },
        target: neighbor,
        result: [...result],
      });

      if (nodes[neighbor].inDegree === 0) {
        queue.push(neighbor);
        addStep(EVENT_TYPES.MARK, 4, `Node ${neighbor} in-degree is now 0, enqueue it`, {
          highlights: { visit: [neighbor] },
          target: neighbor,
          result: [...result],
        });
      }
    });
  }

  if (result.length !== nodeCount) {
    addStep(EVENT_TYPES.MARK, 5, 'Graph has a cycle - topological sort not possible', {
      highlights: { swap: [] },
    });
  } else {
    addStep(EVENT_TYPES.MARK, 6, `Topological order: [${result.join(', ')}]`, {
      highlights: { done: [...result] },
      result: [...result],
    });
  }

  return steps;
}

export { topologicalSort };