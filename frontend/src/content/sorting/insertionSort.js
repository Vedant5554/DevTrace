export const insertionSortArticle = {
  introduction: [
    "Insertion Sort builds the final sorted array one element at a time by repeatedly taking an element from the unsorted portion and inserting it into its correct position in the sorted portion. It works similarly to how you might sort playing cards in your hand.",
    "The algorithm maintains a sorted subarray at the beginning of the array. For each new element, it shifts larger elements to the right to make space, then inserts the new element in its correct position. This makes it efficient for small or nearly sorted arrays.",
  ],
  complexity: {
    best: { time: "O(n)", space: "O(1)" },
    average: { time: "O(n²)", space: "O(1)" },
    worst: { time: "O(n²)", space: "O(1)" },
  },
  stepByStep: [
    "Consider the first element as sorted",
    "Take the next element (key) from the unsorted portion",
    "Compare key with elements in sorted portion from right to left",
    "Shift elements greater than key one position to the right",
    "Insert key into the correct position",
    "Repeat for all remaining elements",
  ],
  workedExample: {
    headers: ["Step", "Array State", "Key", "Action"],
    rows: [
      ["1", "[12, 11, 13, 5, 6]", "11", "Shift 12, insert 11"],
      ["2", "[11, 12, 13, 5, 6]", "13", "Already in place"],
      ["3", "[11, 12, 13, 5, 6]", "5", "Shift 13,12,11 insert 5"],
      ["4", "[5, 11, 12, 13, 6]", "6", "Shift 13, insert 6"],
      ["5", "[5, 6, 11, 12, 13]", "-", "Sorted"],
    ],
  },
  tradeoffs: {
    use: [
      "Small datasets (n < 50)",
      "Nearly sorted arrays - O(n) best case",
      "Online algorithms - can sort as data arrives",
      "When simplicity and low overhead matter",
      "Stable sorting required",
    ],
    avoid: [
      "Large datasets - O(n²) average/worst case",
      "Reverse sorted data - worst case performance",
      "When better alternatives like Timsort are available",
      "Memory-constrained environments where binary insertion would help",
    ],
  },
  code: {
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
    java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    cpp: `void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    c: `void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  },
  faq: [
    { q: "Is Insertion Sort stable?", a: "Yes, Insertion Sort is stable. Equal elements maintain their relative order because we only shift elements that are strictly greater than the key." },
    { q: "Why is Insertion Sort fast for nearly sorted arrays?", a: "In the best case (already sorted), the inner while loop never executes, giving O(n) time complexity. Each element is only compared with its predecessor." },
    { q: "What is Binary Insertion Sort?", a: "A variant that uses binary search to find the insertion point, reducing comparisons to O(log n) per element, though shifts remain O(n)." },
  ],
};