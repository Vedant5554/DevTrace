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

function bfs(input) {
  const { edges = [], start = 0, nodeCount = 6 } = input;
  const nodes = buildGraph(edges, nodeCount);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const visited = new Set();
  const queue = [start];
  const pathEdges = [];
  const parentMap = {};

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

  addStep(EVENT_TYPES.MARK, 3, `Initialize BFS: queue = deque([${start + 1}])`, {});

  while (queue.length > 0) {
    const current = queue.shift();

    if (visited.has(current)) continue;

    visited.add(current);
    if (parentMap[current] !== undefined) {
      pathEdges.push(`${parentMap[current]}-${current}`);
    }

    addStep(EVENT_TYPES.VISIT, 5, `u = queue.popleft(): Visit node ${current + 1}`, {
      highlights: { visit: [current] },
      target: current,
      visited: [...visited],
      pathEdges: [...pathEdges],
      activeEdge: parentMap[current] !== undefined ? `${parentMap[current]}-${current}` : null,
    });

    for (const neighbor of nodes[current].neighbors) {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 7, `for v in graph[${current + 1}]: check neighbor ${neighbor + 1}`, {
        highlights: { compare: [neighbor], visit: [current] },
        target: neighbor,
        visited: [...visited],
        pathEdges: [...pathEdges],
        activeEdge: `${current}-${neighbor}`,
      });

      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        parentMap[neighbor] = current;
        queue.push(neighbor);

        // line 8, 9: visited.add(v), queue.append(v)
        addStep(EVENT_TYPES.PUSH, 9, `queue.append(${neighbor + 1}): enqueue unvisited neighbor`, {
          highlights: { compare: [neighbor], visit: [current] },
          target: neighbor,
          visited: [...visited],
          pathEdges: [...pathEdges],
        });
      }
    }
  }

  addStep(EVENT_TYPES.MARK, 4, 'BFS complete - traversal queue is empty', {
    highlights: { done: [...visited] },
    visited: [...visited],
    pathEdges: [...pathEdges],
  });

  return steps;
}

export { bfs };
