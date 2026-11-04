import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function buildGraph(edges, nodeCount) {
  const nodes = {};
  for (let i = 0; i < nodeCount; i++) {
    nodes[i] = { id: i, neighbors: [] };
  }
  edges.forEach(([from, to]) => {
    if (nodes[from] && nodes[to]) {
      nodes[from].neighbors.push(to);
      nodes[to].neighbors.push(from);
    }
  });
  return nodes;
}

function dfs(input) {
  const { edges = [], start = 0, nodeCount = 5 } = input;
  const nodes = buildGraph(edges, nodeCount);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const visited = new Set();
  const stack = [start];
  const pathEdges = [];
  let previous = null;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(
      createStep(
        type,
        line,
        note,
        {
          nodes: cloneState(nodes),
          highlights: {},
          visited: [...visited],
          pathEdges: [...pathEdges],
          ...extra,
        },
        { metrics: createMetrics(comparisons, swaps, steps.length) }
      )
    );
  }

  addStep(EVENT_TYPES.MARK, 3, `Initialize DFS: stack = [${start + 1}]`, {});

  while (stack.length > 0) {
    const current = stack.pop();

    if (visited.has(current)) continue;

    visited.add(current);
    if (previous !== null && nodes[previous]?.neighbors.includes(current)) {
      pathEdges.push(`${previous}-${current}`);
    }
    previous = current;

    addStep(EVENT_TYPES.VISIT, 6, `u = stack.pop(): Visit & mark node ${current + 1}`, {
      highlights: { visit: [current] },
      target: current,
      visited: [...visited],
      pathEdges: [...pathEdges],
      activeEdge: pathEdges.length > 0 ? pathEdges[pathEdges.length - 1] : null,
    });

    const neighbors = [...nodes[current].neighbors].reverse();
    for (const neighbor of neighbors) {
      comparisons++;
      if (!visited.has(neighbor)) {
        addStep(EVENT_TYPES.COMPARE, 8, `for v in graph[${current + 1}]: check unvisited neighbor ${neighbor + 1}`, {
          highlights: { compare: [neighbor], visit: [current] },
          target: neighbor,
          visited: [...visited],
          pathEdges: [...pathEdges],
          activeEdge: `${current}-${neighbor}`,
        });

        stack.push(neighbor);

        addStep(EVENT_TYPES.PUSH, 9, `stack.append(${neighbor + 1}): push to traversal stack`, {
          highlights: { compare: [neighbor], visit: [current] },
          target: neighbor,
          visited: [...visited],
          pathEdges: [...pathEdges],
        });
      }
    }
  }

  addStep(EVENT_TYPES.MARK, 4, 'DFS complete - traversal stack is empty', {
    highlights: { done: [...visited] },
    visited: [...visited],
    pathEdges: [...pathEdges],
  });

  return steps;
}

export { dfs };
