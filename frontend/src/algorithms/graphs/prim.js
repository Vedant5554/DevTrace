import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function buildWeightedGraph(edges, nodeCount) {
  const nodes = {};
  for (let i = 0; i < nodeCount; i++) {
    nodes[i] = { id: i, neighbors: [] };
  }
  edges.forEach(([from, to, weight]) => {
    nodes[from].neighbors.push({ to, weight });
    nodes[to].neighbors.push({ to: from, weight });
  });
  return nodes;
}

function prim(input) {
  const { edges = [], start = 0, nodeCount = 6 } = input;
  const nodes = buildWeightedGraph(edges, nodeCount);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const inMST = new Set([start]);
  const mstEdges = [];
  const key = new Array(nodeCount).fill(Infinity);
  const parent = new Array(nodeCount).fill(-1);
  key[start] = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), inMST: [...inMST], key: [...key], parent: [...parent], mstEdges: [...mstEdges], highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 2, `Initialize Prim's MST from node ${start + 1}`, {});

  for (let count = 0; count < nodeCount - 1; count++) {
    let minKey = Infinity;
    let u = -1;

    for (let v = 0; v < nodeCount; v++) {
      if (!inMST.has(v) && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }

    if (u === -1) break;

    inMST.add(u);
    if (parent[u] !== -1) {
      mstEdges.push([parent[u], u, key[u]]);
      swaps++;
      addStep(EVENT_TYPES.LINK, 7, `Add edge ${parent[u] + 1}-${u + 1} (weight ${key[u]}) to MST`, {
        highlights: { link: [parent[u], u] },
        target: u,
        pathEdges: mstEdges.map((e) => `${e[0]}-${e[1]}`),
      });
    } else {
      addStep(EVENT_TYPES.VISIT, 5, `Start with root node ${u + 1}`, {
        highlights: { visit: [u] },
        target: u,
        pathEdges: mstEdges.map((e) => `${e[0]}-${e[1]}`),
      });
    }

    nodes[u].neighbors.forEach(({ to: v, weight }) => {
      if (!inMST.has(v)) {
        comparisons++;
        addStep(EVENT_TYPES.COMPARE, 6, `Check edge ${u + 1}-${v + 1} (weight ${weight}), current key[${v + 1}]=${key[v] === Infinity ? 'inf' : key[v]}`, {
          highlights: { compare: [v] },
          target: v,
          pathEdges: mstEdges.map((e) => `${e[0]}-${e[1]}`),
        });

        if (weight < key[v]) {
          key[v] = weight;
          parent[v] = u;
          addStep(EVENT_TYPES.RELAX, 8, `Update key[${v + 1}] to ${weight}, parent=${u + 1}`, {
            highlights: { relax: [v] },
            target: v,
            pathEdges: mstEdges.map((e) => `${e[0]}-${e[1]}`),
          });
        }
      }
    });
  }

  addStep(EVENT_TYPES.MARK, 9, `Prim's MST complete with ${mstEdges.length} edges`, {
    highlights: { done: [...inMST] },
    pathEdges: mstEdges.map((e) => `${e[0]}-${e[1]}`),
  });

  return steps;
}

export { prim };