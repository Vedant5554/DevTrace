export const SECTIONS = [
  { id: 'sorting', name: 'Sorting', icon: 'ArrowUpDown', description: 'Compare and sort elements with 8 classic algorithms' },
  { id: 'data-structures', name: 'Data Structures', icon: 'Database', description: 'Explore fundamental data structures and their operations' },
  { id: 'graphs', name: 'Graphs', icon: 'GitBranch', description: 'Traverse and analyze graph structures with 7 algorithms' },
  { id: 'searching', name: 'Searching', icon: 'Search', description: 'Find elements efficiently in sorted and unsorted data' },
  { id: 'concepts', name: 'Concepts', icon: 'Brain', description: 'Understand core algorithmic concepts and patterns' },
];

export const ALGORITHMS = {
  sorting: [
    { id: 'bubble-sort', name: 'Bubble Sort', blurb: 'Compare adjacent pairs and swap out-of-order elements until sorted' },
    { id: 'selection-sort', name: 'Selection Sort', blurb: 'Find minimum element in unsorted prefix and append to sorted partition' },
    { id: 'insertion-sort', name: 'Insertion Sort', blurb: 'Shift elements to insert each item into its correct sorted position' },
    { id: 'merge-sort', name: 'Merge Sort', blurb: 'Divide array into halves, recursively sort, and merge in linear time' },
    { id: 'quick-sort', name: 'Quick Sort', blurb: 'Partition around a pivot element and recursively sort partitions in place' },
    { id: 'heap-sort', name: 'Heap Sort', blurb: 'Build max-heap and repeatedly extract root to array end' },
    { id: 'radix-sort', name: 'Radix Sort', blurb: 'Sort numbers digit by digit using stable counting sort passes' },
    { id: 'counting-sort', name: 'Counting Sort', blurb: 'Count key frequencies and reconstruct sorted order in linear time' },
  ],
  'data-structures': [
    { id: 'stack', name: 'Stack', blurb: 'LIFO collection supporting constant-time push and pop' },
    { id: 'queue', name: 'Queue', blurb: 'FIFO buffer supporting constant-time enqueue and dequeue' },
    { id: 'linked-list', name: 'Linked List', blurb: 'Singly linked nodes with forward pointer traversal' },
    { id: 'doubly-linked-list', name: 'Doubly Linked List', blurb: 'Bidirectional nodes with forward and backward pointers' },
    { id: 'hash-table', name: 'Hash Table', blurb: 'Key-value mapping using hash hashing with separate chaining' },
    { id: 'hash-map', name: 'Hash Map', blurb: 'Dynamic bucket table with load-factor resizing and rehashing' },
    { id: 'binary-tree', name: 'Binary Tree', blurb: 'Hierarchical node tree where each node has up to two children' },
    { id: 'bst', name: 'Binary Search Tree', blurb: 'Ordered tree where left child is less and right child is greater' },
    { id: 'avl-tree', name: 'AVL Tree', blurb: 'Self-balancing BST using single and double rotations on insertion/deletion' },
    { id: 'heap', name: 'Heap', blurb: 'Complete binary tree maintaining min or max parent heap invariant' },
    { id: 'trie', name: 'Trie', blurb: 'Prefix tree branching on characters for dictionary lookups' },
  ],
  graphs: [
    { id: 'dfs', name: 'Depth-First Search', blurb: 'Traverse along branches to maximum depth before backtracking' },
    { id: 'bfs', name: 'Breadth-First Search', blurb: 'Traverse graph in concentric layers ordered by edge distance' },
    { id: 'topological-sort', name: 'Topological Sort', blurb: 'Linear vertex ordering where all directed edges point forward' },
    { id: 'dijkstra', name: "Dijkstra's Algorithm", blurb: 'Greedy shortest-path search on non-negative weighted graphs' },
    { id: 'bellman-ford', name: 'Bellman-Ford', blurb: 'Dynamic-programming shortest path supporting negative edge weights' },
    { id: 'kruskal', name: "Kruskal's Algorithm", blurb: 'Sort edges by weight and union disjoint sets to build MST' },
    { id: 'prim', name: "Prim's Algorithm", blurb: 'Greedy tree expansion adding minimum crossing edge at each step' },
  ],
  searching: [
    { id: 'linear-search', name: 'Linear Search', blurb: 'Scan indices sequentially from 0 to n - 1 until target matches' },
    { id: 'binary-search', name: 'Binary Search', blurb: 'Bisect sorted interval at midpoint in logarithmic time' },
  ],
  concepts: [
    { id: 'recursion', name: 'Recursion', blurb: 'Function self-invocation with base case termination and call-stack unwinding' },
  ],
};

export const COMPARISON_TABLES = {
  sorting: {
    columns: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Stable'],
    rows: [
      ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
      ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'No'],
      ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
      ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
      ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'No'],
      ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', 'No'],
      ['Radix Sort', 'O(nk)', 'O(nk)', 'O(nk)', 'O(n + k)', 'Yes'],
      ['Counting Sort', 'O(n + k)', 'O(n + k)', 'O(n + k)', 'O(k)', 'Yes'],
    ],
  },
  'data-structures': {
    columns: ['Structure', 'Access', 'Search', 'Insert', 'Delete'],
    rows: [
      ['Linked List', 'O(n)', 'O(n)', 'O(1)*', 'O(1)*'],
      ['Doubly Linked List', 'O(n)', 'O(n)', 'O(1)*', 'O(1)*'],
      ['Hash Table', 'N/A', 'O(1) avg', 'O(1) avg', 'O(1) avg'],
      ['Hash Map', 'N/A', 'O(1) avg', 'O(1) avg', 'O(1) avg'],
      ['Binary Tree', 'O(n)', 'O(n)', 'O(n)', 'O(n)'],
      ['BST', 'O(log n) avg', 'O(log n) avg', 'O(log n) avg', 'O(log n) avg'],
      ['AVL Tree', 'O(log n)', 'O(log n)', 'O(log n)', 'O(log n)'],
      ['Heap', 'O(1) peek', 'O(n)', 'O(log n)', 'O(log n)'],
      ['Trie', 'O(m)', 'O(m)', 'O(m)', 'O(m)'],
    ],
  },
  graphs: {
    columns: ['Algorithm', 'Time', 'Space', 'Solves', 'Weighted'],
    rows: [
      ['DFS', 'O(V + E)', 'O(V)', 'Reachability, cycles', 'No'],
      ['BFS', 'O(V + E)', 'O(V)', 'Shortest path (unweighted)', 'No'],
      ['Topological Sort', 'O(V + E)', 'O(V)', 'Task scheduling', 'No'],
      ["Dijkstra's", 'O(E log V)', 'O(V)', 'Shortest path (non-neg)', 'Yes'],
      ['Bellman-Ford', 'O(VE)', 'O(V)', 'Shortest path (neg weights)', 'Yes'],
      ["Kruskal's", 'O(E log E)', 'O(V)', 'MST', 'Yes'],
      ["Prim's", 'O(E log V)', 'O(V)', 'MST', 'Yes'],
    ],
  },
  searching: {
    columns: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Needs sorted?'],
    rows: [
      ['Linear Search', 'O(1)', 'O(n)', 'O(n)', 'O(1)', 'No'],
      ['Binary Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)', 'Yes'],
    ],
  },
  concepts: {
    columns: ['Concept', 'Time', 'Space', 'Key Insight'],
    rows: [
      ['Recursion', 'Varies', 'O(n) call stack', 'Base case + recursive step = solution'],
    ],
  },
};

export function getAlgorithm(section, id) {
  const list = ALGORITHMS[section];
  if (!list) return null;
  return list.find((a) => a.id === id) || null;
}

export function getSectionAlgorithms(section) {
  return ALGORITHMS[section] || [];
}

export function getComparisonTable(section) {
  return COMPARISON_TABLES[section] || null;
}

export function getSiblingAlgorithms(section, currentId) {
  const list = ALGORITHMS[section] || [];
  const idx = list.findIndex((a) => a.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? { ...list[idx - 1], section } : null,
    next: idx < list.length - 1 ? { ...list[idx + 1], section } : null,
  };
}