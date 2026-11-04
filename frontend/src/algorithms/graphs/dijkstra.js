import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function buildWeightedGraph(edges, nodeCount) {
  const nodes = {};
  for (let i = 0; i < nodeCount; i++) {
    nodes[i] = { id: i, neighbors: [], distance: Infinity, prev: null };
  }
  edges.forEach(([from, to, weight]) => {
    if (nodes[from] && nodes[to]) {
      nodes[from].neighbors.push({ to, weight });
      nodes[to].neighbors.push({ to: from, weight });
    }
  });
  return nodes;
}

function dijkstra(input) {
  const { edges = [], start = 0, nodeCount = 6 } = input;
  const nodes = buildWeightedGraph(edges, nodeCount);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const visited = new Set();
  const queue = [{ dist: 0, node: start }];
  nodes[start].distance = 0;
  const pathEdges = [];

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

  addStep(EVENT_TYPES.MARK, 3, `Initialize Dijkstra from node ${start + 1} with distance 0`, {});

  while (queue.length > 0) {
    queue.sort((a, b) => a.dist - b.dist);
    const { dist, node: current } = queue.shift();

    if (visited.has(current)) continue;
    if (dist > nodes[current].distance) continue;

    visited.add(current);
    if (nodes[current].prev !== null) {
      pathEdges.push(`${nodes[current].prev}-${current}`);
    }

    addStep(EVENT_TYPES.VISIT, 5, `d, u = heappop(pq): Visit node ${current + 1} (dist=${dist})`, {
      highlights: { visit: [current] },
      target: current,
      visited: [...visited],
      pathEdges: [...pathEdges],
    });

    for (const { to: neighbor, weight } of nodes[current].neighbors) {
      comparisons++;
      const newDist = dist + weight;

      addStep(EVENT_TYPES.COMPARE, 7, `Check edge (${current + 1} -> ${neighbor + 1}, w=${weight}): new dist ${newDist}`, {
        highlights: { compare: [neighbor], visit: [current] },
        target: neighbor,
        visited: [...visited],
        pathEdges: [...pathEdges],
        activeEdge: `${current}-${neighbor}`,
      });

      if (newDist < nodes[neighbor].distance) {
        const oldDist = nodes[neighbor].distance;
        nodes[neighbor].distance = newDist;
        nodes[neighbor].prev = current;
        swaps++;

        addStep(EVENT_TYPES.RELAX, 8, `Relax node ${neighbor + 1}: ${oldDist === Infinity ? '∞' : oldDist} -> ${newDist}`, {
          highlights: { relax: [neighbor] },
          target: neighbor,
          visited: [...visited],
          pathEdges: [...pathEdges],
          activeEdge: `${current}-${neighbor}`,
        });

        queue.push({ dist: newDist, node: neighbor });
      }
    }
  }

  addStep(EVENT_TYPES.MARK, 4, 'Dijkstra complete - shortest paths confirmed', {
    highlights: { done: [...visited] },
    visited: [...visited],
    pathEdges: [...pathEdges],
  });

  return steps;
}

export { dijkstra };
