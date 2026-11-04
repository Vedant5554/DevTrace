import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function buildWeightedGraph(edges, nodeCount) {
  const nodes = {};
  for (let i = 0; i < nodeCount; i++) {
    nodes[i] = { id: i, neighbors: [], distance: Infinity, prev: null };
  }
  edges.forEach(([from, to, weight]) => {
    nodes[from].neighbors.push({ to, weight });
  });
  return nodes;
}

function bellmanFord(input) {
  const { edges = [], start = 0, nodeCount = 6 } = input;
  const nodes = buildWeightedGraph(edges, nodeCount);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  nodes[start].distance = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), highlights: {}, edges, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 1, `Initialize Bellman-Ford: dist[src]=0, all others inf`, {});

  for (let i = 0; i < nodeCount - 1; i++) {
    addStep(EVENT_TYPES.MARK, 3, `Iteration ${i + 1} of ${nodeCount - 1}: scan all edges`, { iteration: i + 1 });

    edges.forEach(([from, to, weight]) => {
      comparisons++;
      if (nodes[from].distance !== Infinity && nodes[from].distance + weight < nodes[to].distance) {
        const oldDist = nodes[to].distance;
        nodes[to].distance = nodes[from].distance + weight;
        nodes[to].prev = from;
        swaps++;

        addStep(EVENT_TYPES.RELAX, 5, `Relax edge ${from + 1}->${to + 1}: ${oldDist === Infinity ? 'inf' : oldDist} -> ${nodes[to].distance}`, {
          highlights: { relax: [to] },
          target: to,
          relaxedEdges: [`${from}-${to}`],
          iteration: i + 1,
        });
      }
    });
  }

  let hasNegativeCycle = false;
  edges.forEach(([from, to, weight]) => {
    if (nodes[from].distance !== Infinity && nodes[from].distance + weight < nodes[to].distance) {
      hasNegativeCycle = true;
    }
  });

  if (hasNegativeCycle) {
    addStep(EVENT_TYPES.MARK, 8, 'Negative weight cycle detected!', {
      highlights: { swap: [] },
    });
  } else {
    addStep(EVENT_TYPES.MARK, 9, 'Bellman-Ford complete: shortest paths found', {
      highlights: { done: Object.keys(nodes).map(Number) },
    });
  }

  return steps;
}

export { bellmanFord };