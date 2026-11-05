export const heapSortArticle = {
  introduction: [
    "Heap Sort uses a binary heap data structure to sort elements. It first builds a max heap from the input array, then repeatedly extracts the maximum element (root of the heap) and places it at the end of the array, reducing the heap size each time.",
    "The algorithm leverages the heap property where each parent node is greater than or equal to its children (for max heap). Building the heap takes O(n) time, and each of the n extractions takes O(log n), giving an overall O(n log n) time complexity with O(1) space.",
  ],
  complexity: {
    best: { time: "O(n log n)", space: "O(1)" },
    average: { time: "O(n log n)", space: "O(1)" },
    worst: { time: "O(n log n)", space: "O(1)" },
  },
  stepByStep: [
    "Build max heap from the input array (bottom-up heapify)",
    "The largest element is now at the root (index 0)",
    "Swap root with the last element of the heap",
    "Reduce heap size by 1 (excluding sorted elements)",
    "Heapify the root to restore max heap property",
    "Repeat steps 3-5 until heap size is 1",
  ],
  workedExample: {
    headers: ["Phase", "Array State", "Heap Size", "Action"],
    rows: [
      ["Build Heap", "[4,10,3,5,1]", "5", "Heapify from index 1"],
      ["Build Heap", "[10,5,3,4,1]", "5", "Heapify from index 0"],
      ["Extract", "[1,5,3,4,10]", "4", "Swap 10 with 1, heapify root"],
      ["Extract", "[5,4,3,1,10]", "4", "Heapify complete"],
      ["Extract", "[1,4,3,5,10]", "3", "Swap 5 with 1, heapify root"],
      ["Extract", "[4,1,3,5,10]", "3", "Heapify complete"],
      ["Extract", "[1,3,4,5,10]", "2", "Swap 4 with 1, heapify root"],
      ["Extract", "[3,1,4,5,10]", "2", "Heapify complete"],
      ["Extract", "[1,3,4,5,10]", "1", "Swap 3 with 1, done"],
    ],
  },
  tradeoffs: {
    use: [
      "When guaranteed O(n log n) worst-case is required",
      "In-place sorting with O(1) space (no recursion/auxiliary arrays)",
      "Embedded systems with strict memory limits",
      "When you need to find top k elements efficiently",
      "Priority queue implementations",
    ],
    avoid: [
      "When cache performance matters - poor locality of reference",
      "Small arrays - insertion sort has less overhead",
      "When stable sorting is required (Heap Sort is not stable)",
      "Nearly sorted data - still does full heap operations",
    ],
  },
  code: {
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    javascript: `function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}`,
    java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, n, largest);
    }
}`,
    cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    c: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void heap_sort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
  },
  faq: [
    { q: "Why is Heap Sort not stable?", a: "During heapify operations, elements can move long distances in the array. Equal elements can swap positions when one is a parent/child of the other, changing their relative order." },
    { q: "Is Heap Sort really O(1) space?", a: "Yes, if implemented iteratively (using loops instead of recursion for heapify). Recursive heapify uses O(log n) stack space, which can be eliminated with an iterative approach." },
    { q: "How does Heap Sort compare to Quick Sort?", a: "Heap Sort guarantees O(n log n) worst-case but has worse cache performance. Quick Sort is typically faster in practice but has O(n²) worst-case. Introsort combines both." },
  ],
};