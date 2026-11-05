export const heapArticle = {
  introduction: [
    "A Binary Heap is a specialized complete binary tree that satisfies the heap property. In a Max Heap, for any given node C, the key of C is less than or equal to the key of its parent P, ensuring that the maximum element is always at the root. Conversely, in a Min Heap, the key of P is less than or equal to C, keeping the minimum element at the root.",
    "Because a binary heap is always a complete binary tree, it is efficiently represented as a contiguous array without requiring explicit pointer links. For an element at 0-based index i, its left child is at index 2*i + 1, its right child is at 2*i + 2, and its parent is at floor((i - 1) / 2). This array representation provides excellent cache locality and forms the engine behind priority queues and heapsort."
  ],
  complexity: {
    best: {
      time: "O(1)",
      space: "O(n)"
    },
    average: {
      time: "O(log n)",
      space: "O(n)"
    },
    worst: {
      time: "O(log n)",
      space: "O(n)"
    }
  },
  stepByStep: [
    "Represent the complete binary tree inside a 1D array where parent-child positions are calculated using index arithmetic.",
    "To peek at the root (min or max), read the first element at array index 0 in O(1) time.",
    "To insert a new element, append it to the end of the array, then perform 'sift-up' (bubble-up) by repeatedly swapping with its parent until the heap property is restored.",
    "To extract the root, replace index 0 with the last element of the array and remove the last element.",
    "Perform 'sift-down' (heapify) on the new root by repeatedly swapping it with its largest (max-heap) or smallest (min-heap) child until heap invariants hold.",
    "To build a heap from an arbitrary unsorted array of n elements, run sift-down from floor(n/2)-1 down to index 0 in linear O(n) time."
  ],
  workedExample: {
    headers: ["Action", "Array State", "Operation Detail", "Root Value"],
    rows: [
      ["Initial", "[]", "Empty heap", "-"],
      ["Insert 10", "[10]", "Root element", "10"],
      ["Insert 20", "[20, 10]", "20 sifted up over 10", "20"],
      ["Insert 15", "[20, 10, 15]", "15 <= 20, no swap", "20"],
      ["Insert 30", "[30, 20, 15, 10]", "30 sifted up to root", "30"],
      ["Extract Max", "[20, 10, 15]", "30 popped, 10 promoted and sifted down with 20", "20"]
    ]
  },
  tradeoffs: {
    use: [
      "Priority Queues where rapid retrieval and removal of the extreme (min or max) element is required.",
      "Graph shortest path algorithms (Dijkstra) and Minimum Spanning Tree algorithms (Prim).",
      "Streaming median finders and top-K item tracking."
    ],
    avoid: [
      "Arbitrary searching for arbitrary non-root keys (requires O(n) scan since heaps lack left-to-right ordering).",
      "Workloads requiring ordered in-order traversal of all elements in linear time."
    ]
  },
  code: {
    python: `class MinHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left(self, i):
        return 2 * i + 1

    def right(self, i):
        return 2 * i + 2

    def insert(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def extract_min(self):
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()
        root = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._sift_down(0)
        return root

    def _sift_up(self, i):
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            p = self.parent(i)
            self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
            i = p

    def _sift_down(self, i):
        n = len(self.heap)
        smallest = i
        l = self.left(i)
        r = self.right(i)
        if l < n and self.heap[l] < self.heap[smallest]:
            smallest = l
        if r < n and self.heap[r] < self.heap[smallest]:
            smallest = r
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._sift_down(smallest)`,
    javascript: `class MinHeap {
  constructor() {
    this.heap = [];
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  left(i) {
    return 2 * i + 1;
  }

  right(i) {
    return 2 * i + 2;
  }

  insert(val) {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return min;
  }

  siftUp(i) {
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      const p = this.parent(i);
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
  }

  siftDown(i) {
    const n = this.heap.length;
    let smallest = i;
    const l = this.left(i);
    const r = this.right(i);
    if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
    if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.siftDown(smallest);
    }
  }
}`,
    java: `import java.util.ArrayList;
import java.util.List;

public class MinHeap {
    private List<Integer> heap = new ArrayList<>();

    private int parent(int i) { return (i - 1) / 2; }
    private int left(int i) { return 2 * i + 1; }
    private int right(int i) { return 2 * i + 2; }

    public void insert(int val) {
        heap.add(val);
        siftUp(heap.size() - 1);
    }

    public int extractMin() {
        if (heap.isEmpty()) throw new IllegalStateException();
        int root = heap.get(0);
        int last = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, last);
            siftDown(0);
        }
        return root;
    }

    private void siftUp(int i) {
        while (i > 0 && heap.get(parent(i)) > heap.get(i)) {
            int p = parent(i);
            int temp = heap.get(i);
            heap.set(i, heap.get(p));
            heap.set(p, temp);
            i = p;
        }
    }

    private void siftDown(int i) {
        int n = heap.size();
        int smallest = i;
        int l = left(i);
        int r = right(i);
        if (l < n && heap.get(l) < heap.get(smallest)) smallest = l;
        if (r < n && heap.get(r) < heap.get(smallest)) smallest = r;
        if (smallest != i) {
            int temp = heap.get(i);
            heap.set(i, heap.get(smallest));
            heap.set(smallest, temp);
            siftDown(smallest);
        }
    }
}`,
    cpp: `#include <vector>
#include <algorithm>

class MinHeap {
    std::vector<int> heap;

    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }

    void siftUp(int i) {
        while (i > 0 && heap[parent(i)] > heap[i]) {
            std::swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }

    void siftDown(int i) {
        int n = heap.size();
        int smallest = i;
        int l = left(i);
        int r = right(i);
        if (l < n && heap[l] < heap[smallest]) smallest = l;
        if (r < n && heap[r] < heap[smallest]) smallest = r;
        if (smallest != i) {
            std::swap(heap[i], heap[smallest]);
            siftDown(smallest);
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        siftUp(heap.size() - 1);
    }

    int extractMin() {
        int root = heap.front();
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) siftDown(0);
        return root;
    }
};`,
    c: `#include <stdio.h>
#include <stdlib.h>

struct MinHeap {
    int* array;
    int size;
    int capacity;
};

struct MinHeap* createHeap(int capacity) {
    struct MinHeap* h = (struct MinHeap*)malloc(sizeof(struct MinHeap));
    h->capacity = capacity;
    h->size = 0;
    h->array = (int*)malloc(capacity * sizeof(int));
    return h;
}

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

void siftUp(struct MinHeap* h, int i) {
    while (i > 0 && h->array[(i - 1) / 2] > h->array[i]) {
        swap(&h->array[i], &h->array[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

void siftDown(struct MinHeap* h, int i) {
    int smallest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < h->size && h->array[l] < h->array[smallest]) smallest = l;
    if (r < h->size && h->array[r] < h->array[smallest]) smallest = r;
    if (smallest != i) {
        swap(&h->array[i], &h->array[smallest]);
        siftDown(h, smallest);
    }
}

void insert(struct MinHeap* h, int val) {
    if (h->size == h->capacity) return;
    h->array[h->size] = val;
    h->size++;
    siftUp(h, h->size - 1);
}

int extractMin(struct MinHeap* h) {
    if (h->size <= 0) return -1;
    int root = h->array[0];
    h->array[0] = h->array[h->size - 1];
    h->size--;
    siftDown(h, 0);
    return root;
}`
  },
  faq: [
    {
      q: "Why does building a binary heap take O(n) time instead of O(n log n)?",
      a: "In bottom-up heap construction, most nodes are located close to the bottom where the required sift-down distance is small. Summing the work across all levels yields a convergent geometric series bounded by 2n, producing linear O(n) construction."
    },
    {
      q: "Can binary heaps be used for arbitrary element lookups?",
      a: "No. Unlike binary search trees, there is no relationship between sibling nodes or left and right subtrees. Finding an arbitrary key requires checking every element in O(n) time."
    }
  ]
};

