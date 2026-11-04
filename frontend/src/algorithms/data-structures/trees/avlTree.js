import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../../core/events.js';

function getHeight(nodes, nodeId) {
  if (nodeId === null || nodeId === undefined) return 0;
  return nodes[nodeId].height || 0;
}

function updateHeight(nodes, nodeId) {
  if (nodeId === null || nodeId === undefined) return;
  nodes[nodeId].height = 1 + Math.max(
    getHeight(nodes, nodes[nodeId].left),
    getHeight(nodes, nodes[nodeId].right)
  );
}

function getBalance(nodes, nodeId) {
  if (nodeId === null || nodeId === undefined) return 0;
  return getHeight(nodes, nodes[nodeId].left) - getHeight(nodes, nodes[nodeId].right);
}

function rotateRight(nodes, y) {
  const x = nodes[y].left;
  const T2 = nodes[x].right;

  nodes[x].right = y;
  nodes[y].left = T2;

  updateHeight(nodes, y);
  updateHeight(nodes, x);

  return x;
}

function rotateLeft(nodes, x) {
  const y = nodes[x].right;
  const T2 = nodes[y].left;

  nodes[y].left = x;
  nodes[x].right = T2;

  updateHeight(nodes, x);
  updateHeight(nodes, y);

  return y;
}

function avlInsert(nodes, root, value, steps, addStep) {
  if (root === null) {
    const newId = Object.keys(nodes).length;
    nodes[newId] = { id: newId, value, left: null, right: null, height: 1 };
    return newId;
  }

  if (value < nodes[root].value) {
    nodes[root].left = avlInsert(nodes, nodes[root].left, value, steps, addStep);
  } else if (value > nodes[root].value) {
    nodes[root].right = avlInsert(nodes, nodes[root].right, value, steps, addStep);
  } else {
    return root;
  }

  updateHeight(nodes, root);
  const balance = getBalance(nodes, root);

  if (balance > 1 && value < nodes[nodes[root].left].value) {
    addStep(EVENT_TYPES.MARK, 3, `Right rotation at node ${nodes[root].value} (balance: ${balance})`, {
      highlights: { pivot: root, swap: [root, nodes[root].left] },
      target: root,
    });
    return rotateRight(nodes, root);
  }

  if (balance < -1 && value > nodes[nodes[root].right].value) {
    addStep(EVENT_TYPES.MARK, 4, `Left rotation at node ${nodes[root].value} (balance: ${balance})`, {
      highlights: { pivot: root, swap: [root, nodes[root].right] },
      target: root,
    });
    return rotateLeft(nodes, root);
  }

  if (balance > 1 && value > nodes[nodes[root].left].value) {
    addStep(EVENT_TYPES.MARK, 5, `Left-Right rotation at node ${nodes[root].value} (balance: ${balance})`, {
      highlights: { pivot: root, swap: [root, nodes[root].left] },
      target: root,
    });
    nodes[root].left = rotateLeft(nodes, nodes[root].left);
    return rotateRight(nodes, root);
  }

  if (balance < -1 && value < nodes[nodes[root].right].value) {
    addStep(EVENT_TYPES.MARK, 6, `Right-Left rotation at node ${nodes[root].value} (balance: ${balance})`, {
      highlights: { pivot: root, swap: [root, nodes[root].right] },
      target: root,
    });
    nodes[root].right = rotateRight(nodes, nodes[root].right);
    return rotateLeft(nodes, root);
  }

  return root;
}

function avlTree(input) {
  const nodes = {};
  let root = null;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), root, highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize empty AVL tree', {});

  input.forEach((value) => {
    addStep(EVENT_TYPES.MARK, 1, `Insert ${value} into AVL tree`, { target: value });
    root = avlInsert(nodes, root, value, steps, addStep);
    addStep(EVENT_TYPES.LINK, 2, `Node ${value} inserted, tree rebalanced if needed`, {
      highlights: { visit: [root] },
      target: root,
    });
  });

  addStep(EVENT_TYPES.MARK, 7, 'AVL tree construction complete', {
    highlights: { done: Object.keys(nodes).map(Number) },
  });

  return steps;
}

export { avlTree };