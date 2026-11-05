import { Link } from 'react-router-dom';
import {
  IconArrowRight,
  IconSorting,
  IconDataStructures,
  IconGraphs,
  IconSearching,
  IconConcepts,
  // Sorting Icons
  IconBubbleSort,
  IconSelectionSort,
  IconInsertionSort,
  IconMergeSort,
  IconQuickSort,
  IconHeapSort,
  IconRadixSort,
  IconCountingSort,
  // Data Structures Icons
  IconStack,
  IconQueue,
  IconLinkedList,
  IconDoublyLinkedList,
  IconHashTable,
  IconHashMap,
  IconBinaryTree,
  IconBST,
  IconAVLTree,
  IconHeapTree,
  IconTrie,
  // Graph Algorithm Icons
  IconDFS,
  IconBFS,
  IconTopologicalSort,
  IconDijkstra,
  IconBellmanFord,
  IconKruskal,
  IconPrim,
  // Searching Algorithm Icons
  IconLinearSearch,
  IconBinarySearch,
  // Concept Icons
  IconRecursion
} from './Icons.jsx';

const SECTION_ICONS = {
  sorting: IconSorting,
  'data-structures': IconDataStructures,
  graphs: IconGraphs,
  searching: IconSearching,
  concepts: IconConcepts,
};

const ALGORITHM_ICONS = {
  // Sorting (8)
  'bubble-sort': IconBubbleSort,
  'selection-sort': IconSelectionSort,
  'insertion-sort': IconInsertionSort,
  'merge-sort': IconMergeSort,
  'quick-sort': IconQuickSort,
  'heap-sort': IconHeapSort,
  'radix-sort': IconRadixSort,
  'counting-sort': IconCountingSort,
  // Data Structures (11)
  stack: IconStack,
  queue: IconQueue,
  'linked-list': IconLinkedList,
  'doubly-linked-list': IconDoublyLinkedList,
  'hash-table': IconHashTable,
  'hash-map': IconHashMap,
  'binary-tree': IconBinaryTree,
  bst: IconBST,
  'avl-tree': IconAVLTree,
  heap: IconHeapTree,
  trie: IconTrie,
  // Graphs (7)
  dfs: IconDFS,
  bfs: IconBFS,
  'topological-sort': IconTopologicalSort,
  dijkstra: IconDijkstra,
  'bellman-ford': IconBellmanFord,
  kruskal: IconKruskal,
  prim: IconPrim,
  // Searching (2)
  'linear-search': IconLinearSearch,
  'binary-search': IconBinarySearch,
  // Concepts (1)
  recursion: IconRecursion,
};

export function AlgorithmCard({ algorithm, section }) {
  const Icon = ALGORITHM_ICONS[algorithm.id] || SECTION_ICONS[section] || IconSorting;

  return (
    <Link
      to={`/visualize/${section}/${algorithm.id}`}
      className="group block p-5 bg-[var(--bg-1)] border border-[var(--border)] rounded-md hover:bg-[var(--bg-2)] transition-colors duration-150"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[var(--bg-2)] group-hover:bg-[var(--bg-0)] rounded text-[var(--text-0)] transition-colors">
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--text-0)] text-sm mb-1.5">{algorithm.name}</h3>
          <p className="text-[var(--text-muted)] text-xs line-clamp-2 leading-relaxed font-sans">{algorithm.blurb}</p>
        </div>
        <IconArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text-0)] transition-colors flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}
