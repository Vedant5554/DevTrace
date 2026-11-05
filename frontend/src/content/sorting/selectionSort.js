export const selectionSortArticle = {
  introduction: [
    "Selection Sort is a simple comparison-based sorting algorithm that divides the input into a sorted and unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region.",
    "The algorithm maintains two subarrays: the sorted subarray at the beginning and the unsorted subarray at the end. In each iteration, it finds the minimum element from the unsorted portion and swaps it with the first element of the unsorted portion.",
  ],
  complexity: {
    best: { time: "O(n²)", space: "O(1)" },
    average: { time: "O(n²)", space: "O(1)" },
    worst: { time: "O(n²)", space: "O(1)" },
  },
  stepByStep: [
    "Set the first element as the minimum",
    "Scan the unsorted portion to find the actual minimum",
    "Swap the found minimum with the first unsorted element",
    "Move the boundary between sorted and unsorted by one",
    "Repeat until the entire array is sorted",
  ],
  workedExample: {
    headers: ["Pass", "Array State", "Min Found", "Action"],
    rows: [
      ["1", "[64, 25, 12, 22, 11]", "11 at index 4", "Swap 64 and 11"],
      ["2", "[11, 25, 12, 22, 64]", "12 at index 2", "Swap 25 and 12"],
      ["3", "[11, 12, 25, 22, 64]", "22 at index 3", "Swap 25 and 22"],
      ["4", "[11, 12, 22, 25, 64]", "25 at index 3", "No swap needed"],
      ["5", "[11, 12, 22, 25, 64]", "Sorted", "Complete"],
    ],
  },
  tradeoffs: {
    use: [
      "When memory writes are expensive (minimizes swaps - at most n-1)",
      "Small datasets where simplicity is preferred",
      "When auxiliary memory is not available (in-place, O(1) space)",
      "Teaching algorithm fundamentals",
    ],
    avoid: [
      "Large datasets - always O(n²) regardless of input",
      "When adaptive sorting is needed (doesn't benefit from partial order)",
      "Production systems requiring efficiency",
      "When stable sorting is required (Selection Sort is not stable)",
    ],
  },
  code: {
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    javascript: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}`,
    java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
    cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
    c: `void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        int temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
}`,
  },
  faq: [
    { q: "Is Selection Sort stable?", a: "No, Selection Sort is not stable. When swapping the minimum element with the first unsorted element, equal elements can change their relative order." },
    { q: "How many swaps does Selection Sort perform?", a: "At most n-1 swaps, which is the minimum possible for any comparison-based sorting algorithm." },
    { q: "Does Selection Sort adapt to sorted input?", a: "No, Selection Sort always performs O(n²) comparisons regardless of the initial order of the array." },
  ],
};