import { createStep, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function find(parent, x) {
  if (parent[x] !== x) {
    parent[x] = find(parent, parent[x]);
  }
  return parent[x];
}

function union(parent, rank, x, y) {
  const rootX = find(parent, x);
  const rootY = find(parent, y);
  if (rootX === rootY) return false;
  if (rank[rootX] < rank[rootY]) {
    parent[rootX] = rootY;
  } else if (rank[rootX] > rank[rootY]) {
    parent[rootY] = rootX;
  } else {
    parent[rootY] = rootX;
    rank[rootX]++;
  }
  return true;
}

function kruskal(input) {
  const { edges = [], nodeCount = 6 } = input;
  const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
  const parent = Array.from({ length: nodeCount }, (_, i) => i);
  const rank = new Array(nodeCount).fill(0);
  const mst = [];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { edges: sortedEdges, parent: [...parent], rank: [...rank], mst: [...mst], highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 1, `Initialize Kruskal's MST with ${nodeCount} nodes: sort edges by weight`, {});

  sortedEdges.forEach(([from, to, weight], edgeIdx) => {
    comparisons++;
    addStep(EVENT_TYPES.COMPARE, 3, `Consider edge ${from + 1}-${to + 1} (weight ${weight})`, {
      highlights: { compare: [edgeIdx] },
      target: edgeIdx,
    });

    const rootFrom = find(parent, from);
    const rootTo = find(parent, to);

    if (rootFrom !== rootTo) {
      union(parent, rank, from, to);
      mst.push([from, to, weight]);
      swaps++;

      addStep(EVENT_TYPES.LINK, 5, `uf.union(${from + 1}, ${to + 1}): add edge to MST (weight ${weight})`, {
        highlights: { link: [from, to] },
        target: edgeIdx,
        pathEdges: mst.map((e) => `${e[0]}-${e[1]}`),
      });
    } else {
      addStep(EVENT_TYPES.MARK, 4, `Edge ${from + 1}-${to + 1} would form a cycle: skip`, {
        highlights: { swap: [edgeIdx] },
        target: edgeIdx,
        pathEdges: mst.map((e) => `${e[0]}-${e[1]}`),
      });
    }

    if (mst.length === nodeCount - 1) {
      addStep(EVENT_TYPES.MARK, 7, `MST complete with ${mst.length} edges`, {
        highlights: { done: [] },
        pathEdges: mst.map((e) => `${e[0]}-${e[1]}`),
      });
      return;
    }
  });

  return steps;
}

export { kruskal };