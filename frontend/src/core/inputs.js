export const SIZE_LIMITS = {
  sorting: { min: 3, max: 40, default: 10 },
  searching: { min: 3, max: 40, default: 10 },
  'data-structures': { min: 3, max: 15, default: 6 },
  graphs: { min: 3, max: 8, default: 5 },
  concepts: { min: 1, max: 7, default: 5 },
};

export const DEFAULT_INPUTS = {
  'bubble-sort': [35, 12, 48, 20, 9, 27, 15, 33, 42, 8],
  'selection-sort': [64, 25, 12, 22, 11, 90, 5, 78, 33, 18],
  'insertion-sort': [12, 11, 13, 5, 6, 23, 7, 19, 2, 10],
  'merge-sort': [38, 27, 43, 3, 9, 82, 10, 15, 25, 30],
  'quick-sort': [10, 7, 8, 9, 1, 5, 20, 15, 30, 12],
  'heap-sort': [4, 10, 3, 5, 1, 15, 8, 12, 7, 9],
  'radix-sort': [170, 45, 75, 90, 802, 24, 2, 66, 123, 5],
  'counting-sort': [4, 2, 2, 8, 3, 3, 1, 5, 7, 4],
  'stack': [78, 50, 34, 23, 49, -1, -1, 60, 46, -1, 2],
  'queue': [78, 50, 34, 23, 49, -1, -1, 60, 46, -1, 2],
  'linked-list': [10, 20, 30, 40, 50, 60],
  'doubly-linked-list': [10, 20, 30, 40, 50, 60],
  'hash-table': [1, 2, 3, 4, 5, 6],
  'hash-map': [1, 2, 3, 4, 5, 6],
  'binary-tree': [1, 2, 3, 4, 5, 6, 7],
  'bst': [50, 30, 70, 20, 40, 60, 80],
  'avl-tree': [10, 20, 30, 40, 50, 25],
  'heap': [4, 10, 3, 5, 1, 15, 8, 12],
  'trie': ['cat', 'car', 'card', 'dog', 'dot'],
  'dfs': { edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4]], start: 0, nodeCount: 5 },
  'bfs': { edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4]], start: 0, nodeCount: 5 },
  'topological-sort': { edges: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], nodeCount: 5 },
  'dijkstra': { edges: [[0, 1, 4], [0, 2, 2], [1, 3, 5], [2, 1, 1], [2, 3, 8], [3, 4, 3]], start: 0, nodeCount: 5 },
  'bellman-ford': { edges: [[0, 1, 4], [0, 2, 3], [1, 2, -2], [1, 3, 2], [2, 4, 5], [3, 4, 1]], start: 0, nodeCount: 5 },
  'kruskal': { edges: [[0, 1, 4], [0, 2, 3], [1, 2, 1], [1, 3, 2], [2, 3, 4], [3, 4, 2]], nodeCount: 5 },
  'prim': { edges: [[0, 1, 4], [0, 2, 3], [1, 2, 1], [1, 3, 2], [2, 3, 4], [3, 4, 2]], start: 0, nodeCount: 5 },
  'linear-search': [35, 12, 48, 20, 9, 27, 15, 33, 42, 8],
  'binary-search': [8, 12, 15, 20, 27, 33, 35, 42, 48, 55],
  'recursion': [5],
};

const WORD_BANK = [
  'apple', 'apply', 'bat', 'ball', 'cat', 'car', 'card', 'care',
  'dog', 'dot', 'dove', 'fish', 'frog', 'goat', 'gold', 'hat',
  'hot', 'ice', 'ink', 'jam', 'jar', 'kite', 'lion', 'map',
  'moon', 'nest', 'net', 'oak', 'owl', 'pen', 'pie', 'ring',
  'star', 'tree', 'trie'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArray(size, min = 5, max = 99) {
  return Array.from({ length: size }, () => getRandomInt(min, max));
}

function generateUniqueArray(size, min = 10, max = 99) {
  const set = new Set();
  const maxAttempts = size * 10;
  let attempts = 0;
  while (set.size < size && attempts < maxAttempts) {
    set.add(getRandomInt(min, max));
    attempts++;
  }
  let curr = min;
  while (set.size < size) {
    set.add(curr++);
  }
  return Array.from(set);
}

function generateRandomGraph(nodeCount, weighted = false, isDag = false, hasSafeNegative = false) {
  const edges = [];
  const edgeSet = new Set();

  const addEdge = (u, v, weight = undefined) => {
    const key = isDag ? `${u}->${v}` : `${Math.min(u, v)}-${Math.max(u, v)}`;
    if (u === v || edgeSet.has(key)) return false;
    edgeSet.add(key);
    if (weighted) {
      edges.push([u, v, weight !== undefined ? weight : getRandomInt(1, 9)]);
    } else {
      edges.push([u, v]);
    }
    return true;
  };

  if (isDag) {
    for (let i = 0; i < nodeCount - 1; i++) {
      addEdge(i, i + 1);
    }
    const extraEdges = Math.floor(nodeCount * 0.7);
    let attempts = 0;
    while (edges.length < nodeCount - 1 + extraEdges && attempts < 50) {
      const u = getRandomInt(0, nodeCount - 2);
      const v = getRandomInt(u + 1, nodeCount - 1);
      addEdge(u, v);
      attempts++;
    }
    return { edges, nodeCount };
  }

  for (let i = 1; i < nodeCount; i++) {
    const parent = getRandomInt(0, i - 1);
    addEdge(parent, i);
  }

  const extraEdges = Math.floor(nodeCount * 0.8);
  let attempts = 0;
  while (edges.length < nodeCount - 1 + extraEdges && attempts < 50) {
    const u = getRandomInt(0, nodeCount - 1);
    const v = getRandomInt(0, nodeCount - 1);
    addEdge(u, v);
    attempts++;
  }

  if (hasSafeNegative && edges.length > 0 && weighted) {
    const edgeIdx = getRandomInt(0, edges.length - 1);
    edges[edgeIdx][2] = -getRandomInt(1, 3);
  }

  return { edges, start: 0, nodeCount };
}

export function generateRandomInput(algorithmId, size) {
  switch (algorithmId) {
    case 'counting-sort':
      return generateRandomArray(size, 1, 15);

    case 'radix-sort':
      return Array.from({ length: size }, () => {
        const type = Math.random();
        if (type < 0.3) return getRandomInt(1, 9);
        if (type < 0.7) return getRandomInt(10, 99);
        return getRandomInt(100, 999);
      });

    case 'bubble-sort':
    case 'selection-sort':
    case 'insertion-sort':
    case 'merge-sort':
    case 'quick-sort':
    case 'heap-sort':
    case 'linear-search':
      return generateRandomArray(size, 5, 99);

    case 'binary-search': {
      const sorted = generateUniqueArray(size, 5, 99);
      sorted.sort((a, b) => a - b);
      return sorted;
    }

    case 'linked-list':
    case 'doubly-linked-list':
    case 'heap':
      return generateUniqueArray(size, 10, 99);

    case 'hash-table':
    case 'hash-map':
      return generateUniqueArray(size, 1, size * 4);

    case 'binary-tree':
    case 'bst':
    case 'avl-tree':
      return generateUniqueArray(size, 10, 99);

    case 'trie': {
      const shuffled = [...WORD_BANK].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(size, WORD_BANK.length));
    }

    case 'dfs':
    case 'bfs':
      return generateRandomGraph(size, false, false, false);

    case 'topological-sort':
      return generateRandomGraph(size, false, true, false);

    case 'dijkstra':
    case 'prim':
      return generateRandomGraph(size, true, false, false);

    case 'kruskal':
      return { ...generateRandomGraph(size, true, false, false), start: undefined };

    case 'bellman-ford':
      return generateRandomGraph(size, true, false, true);

    case 'recursion':
      return [Math.max(1, Math.min(7, size))];

    default:
      return generateRandomArray(size, 5, 99);
  }
}

export function formatInputToString(algorithmId, input) {
  if (!input) return '';
  if (Array.isArray(input)) {
    return input.join(', ');
  }
  if (typeof input === 'object' && input.edges) {
    if (input.edges[0]?.length === 3) {
      return input.edges.map(([u, v, w]) => `${u}-${v}:${w}`).join(', ');
    }
    return input.edges.map(([u, v]) => `${u}-${v}`).join(', ');
  }
  return String(input);
}

export function parseInputFromString(algorithmId, text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  if (!trimmed) return null;

  if (algorithmId === 'recursion') {
    const val = parseInt(trimmed, 10);
    if (isNaN(val)) return null;
    return [Math.max(1, Math.min(7, val))];
  }

  if (algorithmId === 'trie') {
    const words = trimmed.split(/[,\s]+/).map(w => w.trim().toLowerCase()).filter(Boolean);
    return words.length > 0 ? words.slice(0, 15) : null;
  }

  if (['dfs', 'bfs', 'topological-sort', 'dijkstra', 'bellman-ford', 'kruskal', 'prim'].includes(algorithmId)) {
    const edgeParts = trimmed.split(/[,\s]+/).filter(Boolean);
    const edges = [];
    let maxNode = 0;
    const isWeighted = ['dijkstra', 'bellman-ford', 'kruskal', 'prim'].includes(algorithmId);

    edgeParts.forEach(part => {
      const weightSplit = part.split(':');
      const nodes = weightSplit[0].split('-');
      if (nodes.length === 2) {
        const u = parseInt(nodes[0], 10);
        const v = parseInt(nodes[1], 10);
        if (!isNaN(u) && !isNaN(v)) {
          maxNode = Math.max(maxNode, u, v);
          if (isWeighted) {
            const w = weightSplit[1] !== undefined ? parseInt(weightSplit[1], 10) : 1;
            edges.push([u, v, isNaN(w) ? 1 : w]);
          } else {
            edges.push([u, v]);
          }
        }
      }
    });

    if (edges.length === 0) return null;
    const nodeCount = maxNode + 1;
    return {
      edges,
      start: 0,
      nodeCount: Math.max(3, Math.min(8, nodeCount))
    };
  }

  const nums = trimmed.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
  if (nums.length === 0) return null;

  if (algorithmId === 'binary-search') {
    return nums.sort((a, b) => a - b);
  }

  return nums;
}

export function resizeInput(algorithmId, currentInput, newSize) {
  if (algorithmId === 'recursion') {
    return [Math.max(1, Math.min(7, newSize))];
  }

  if (['dfs', 'bfs', 'topological-sort', 'dijkstra', 'bellman-ford', 'kruskal', 'prim'].includes(algorithmId)) {
    return generateRandomGraph(
      newSize,
      ['dijkstra', 'prim', 'kruskal', 'bellman-ford'].includes(algorithmId),
      algorithmId === 'topological-sort',
      algorithmId === 'bellman-ford'
    );
  }

  if (algorithmId === 'trie') {
    const current = Array.isArray(currentInput) ? currentInput : [];
    if (newSize <= current.length) {
      return current.slice(0, newSize);
    }
    const needed = newSize - current.length;
    const unusedWords = WORD_BANK.filter(w => !current.includes(w));
    const extra = unusedWords.slice(0, needed);
    return [...current, ...extra];
  }

  const current = Array.isArray(currentInput) ? currentInput : [];
  if (newSize <= current.length) {
    const sliced = current.slice(0, newSize);
    if (algorithmId === 'binary-search') sliced.sort((a, b) => a - b);
    return sliced;
  }

  const needed = newSize - current.length;
  let extra;
  if (['bst', 'avl-tree', 'linked-list', 'doubly-linked-list'].includes(algorithmId)) {
    const existingSet = new Set(current);
    extra = [];
    while (extra.length < needed) {
      const cand = getRandomInt(10, 99);
      if (!existingSet.has(cand)) {
        existingSet.add(cand);
        extra.push(cand);
      }
    }
  } else if (algorithmId === 'counting-sort') {
    extra = generateRandomArray(needed, 1, 15);
  } else {
    extra = generateRandomArray(needed, 5, 99);
  }

  const combined = [...current, ...extra];
  if (algorithmId === 'binary-search') {
    combined.sort((a, b) => a - b);
  }
  return combined;
}

