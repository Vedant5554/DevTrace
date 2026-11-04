import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../../core/events.js';

function buildBinaryTree(values) {
  const nodes = {};
  values.forEach((value, i) => {
    nodes[i] = { id: i, value, left: null, right: null };
  });
  for (let i = 0; i < values.length; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    if (leftIdx < values.length) nodes[i].left = leftIdx;
    if (rightIdx < values.length) nodes[i].right = rightIdx;
  }
  return { nodes, root: 0 };
}

function traverseInOrder(nodeId, nodes, result) {
  if (nodeId === null || nodeId === undefined) return;
  traverseInOrder(nodes[nodeId].left, nodes, result);
  result.push(nodeId);
  traverseInOrder(nodes[nodeId].right, nodes, result);
}

function traversePreOrder(nodeId, nodes, result) {
  if (nodeId === null || nodeId === undefined) return;
  result.push(nodeId);
  traversePreOrder(nodes[nodeId].left, nodes, result);
  traversePreOrder(nodes[nodeId].right, nodes, result);
}

function traversePostOrder(nodeId, nodes, result) {
  if (nodeId === null || nodeId === undefined) return;
  traversePostOrder(nodes[nodeId].left, nodes, result);
  traversePostOrder(nodes[nodeId].right, nodes, result);
  result.push(nodeId);
}

function binaryTree(input) {
  const { nodes, root } = buildBinaryTree(input);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), root, highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Build binary tree from array representation', {});

  const inOrder = [];
  const preOrder = [];
  const postOrder = [];

  addStep(EVENT_TYPES.MARK, 1, 'Perform in-order traversal (Left, Root, Right)', {});
  traverseInOrder(root, nodes, inOrder);
  inOrder.forEach((id, i) => {
    addStep(EVENT_TYPES.VISIT, 2, `Visit node ${nodes[id].value} (in-order position ${i + 1})`, {
      highlights: { visit: [id], done: inOrder.slice(0, i + 1) },
      target: id,
    });
  });

  addStep(EVENT_TYPES.MARK, 3, 'Perform pre-order traversal (Root, Left, Right)', {});
  traversePreOrder(root, nodes, preOrder);
  preOrder.forEach((id, i) => {
    addStep(EVENT_TYPES.VISIT, 4, `Visit node ${nodes[id].value} (pre-order position ${i + 1})`, {
      highlights: { visit: [id], done: preOrder.slice(0, i + 1) },
      target: id,
    });
  });

  addStep(EVENT_TYPES.MARK, 5, 'Perform post-order traversal (Left, Right, Root)', {});
  traversePostOrder(root, nodes, postOrder);
  postOrder.forEach((id, i) => {
    addStep(EVENT_TYPES.VISIT, 6, `Visit node ${nodes[id].value} (post-order position ${i + 1})`, {
      highlights: { visit: [id], done: postOrder.slice(0, i + 1) },
      target: id,
    });
  });

  addStep(EVENT_TYPES.MARK, 7, 'All traversals complete', {
    highlights: { done: Object.keys(nodes).map(Number) },
  });

  return steps;
}

export { binaryTree, buildBinaryTree };