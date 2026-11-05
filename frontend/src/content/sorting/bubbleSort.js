export const bubbleSortArticle = {
  introduction: [
    "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    "The algorithm gets its name because smaller elements 'bubble' to the top of the list (beginning of the array) with each iteration, similar to how air bubbles rise to the surface of water. Despite its simplicity, Bubble Sort is rarely used in practice due to its poor time complexity.",
  ],
  complexity: {
    best: { time: "O(n)", space: "O(1)" },
    average: { time: "O(n²)", space: "O(1)" },
    worst: { time: "O(n²)", space: "O(1)" },
  },
  stepByStep: [
    "Start at the beginning of the array",
    "Compare adjacent elements",
    "If the left element is greater than the right, swap them",
    "Move to the next pair and repeat",
    "After each complete pass, the largest unsorted element is in its final position",
    "Repeat passes until no swaps are needed",
  ],
  workedExample: {
    headers: ["Step", "Array State", "Comparisons", "Swaps"],
    rows: [
      ["1", "[5, 3, 8, 4, 2] → [3, 5, 8, 4, 2]", "1", "1"],
      ["2", "[3, 5, 8, 4, 2] → [3, 5, 4, 8, 2]", "2", "2"],
      ["3", "[3, 5, 4, 8, 2] → [3, 5, 4, 2, 8]", "3", "3"],
      ["4", "[3, 5, 4, 2, 8] → [3, 4, 5, 2, 8]", "4", "4"],
      ["5", "[3, 4, 5, 2, 8] → [3, 4, 2, 5, 8]", "5", "5"],
      ["6", "[3, 4, 2, 5, 8] → [3, 2, 4, 5, 8]", "6", "6"],
      ["7", "[3, 2, 4, 5, 8] → [2, 3, 4, 5, 8]", "7", "7"],
    ],
  },
  tradeoffs: {
    use: [
      "Educational purposes - simple to understand and implement",
      "Small datasets (n < 50) where simplicity matters more than performance",
      "Nearly sorted arrays (best case O(n) with optimization)",
      "When memory is extremely constrained (O(1) space)",
    ],
    avoid: [
      "Large datasets - O(n²) time complexity is prohibitive",
      "Production systems requiring efficient sorting",
      "Real-time systems with strict performance requirements",
      "When stable sorting is needed and better alternatives exist",
    ],
  },
  code: {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    c: `void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}`,
  },
  faq: [
    { q: "Why is Bubble Sort called 'Bubble' Sort?", a: "Because larger elements 'bubble up' to their correct positions at the end of the array with each pass, similar to how air bubbles rise to the surface of water." },
    { q: "Is Bubble Sort stable?", a: "Yes, Bubble Sort is stable. Equal elements maintain their relative order because we only swap when the left element is strictly greater than the right." },
    { q: "Can Bubble Sort be optimized?", a: "Yes, by adding a flag to track if any swaps occurred in a pass. If no swaps happen, the array is already sorted and we can terminate early." },
    { q: "What is the best case for Bubble Sort?", a: "O(n) when the array is already sorted (with the early termination optimization). Without optimization, it's still O(n²)." },
  ],
};