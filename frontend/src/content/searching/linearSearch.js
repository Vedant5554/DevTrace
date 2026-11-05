export const linearSearchArticle = {
  introduction: [
    "Linear Search scans an array or collection sequentially from index 0 to n - 1 until it finds the target key or reaches the end.",
    "It requires no pre-sorting or specific data structure invariants, allowing it to run on unsorted arrays, singly linked lists, and streams. In exchange for zero preprocessing, worst-case lookup time scales at O(n).",
  ],
  complexity: {
    best: { time: "O(1)", space: "O(1)" },
    average: { time: "O(n)", space: "O(1)" },
    worst: { time: "O(n)", space: "O(1)" },
  },
  stepByStep: [
    "Initialize pointer at index 0 of the collection",
    "Compare the current element with the target search key",
    "If the current element matches the target, return the current index",
    "If the element does not match, advance pointer to the next index",
    "Repeat comparison until matching element is found or end of array is reached",
    "If array boundary is exceeded without a match, return -1 indicating failure",
  ],
  workedExample: {
    headers: ["Index", "Element", "Target", "Comparison", "Action"],
    rows: [
      ["0", "35", "20", "35 == 20 (false)", "Mismatch, advance index to 1"],
      ["1", "12", "20", "12 == 20 (false)", "Mismatch, advance index to 2"],
      ["2", "48", "20", "48 == 20 (false)", "Mismatch, advance index to 3"],
      ["3", "20", "20", "20 == 20 (true)", "Match found! Return index 3"],
    ],
  },
  tradeoffs: {
    use: [
      "Small arrays (typically n < 50) where overhead of sorting exceeds search time",
      "Unsorted or continuously modified collections where maintaining sort order is expensive",
      "Singly linked lists or sequential access data streams lacking random indexing",
      "Single-use one-off searches where sorting first would degrade overall time complexity",
    ],
    avoid: [
      "Large datasets requiring frequent query lookups",
      "Pre-sorted arrays where Binary Search achieves O(log n) performance",
      "Latency-sensitive lookups where hash table O(1) average lookup is preferred",
    ],
  },
  code: {
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    javascript: `export function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    java: `public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`,
    cpp: `#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) {
            return static_cast<int>(i);
        }
    }
    return -1;
}`,
    c: `#include <stddef.h>

int linear_search(const int arr[], size_t n, int target) {
    for (size_t i = 0; i < n; i++) {
        if (arr[i] == target) {
            return (int)i;
        }
    }
    return -1;
}`,
  },
  faq: [
    {
      q: "Why use Linear Search over Binary Search?",
      a: "Binary Search requires the collection to be strictly sorted first, costing O(n log n). If you only need to perform one search on unsorted data, Linear Search takes O(n), avoiding the sorting cost.",
    },
    {
      q: "Can Linear Search be optimized on unsorted data?",
      a: "Sentinel Linear Search eliminates the loop boundary check on every iteration by placing the target value at the end of the array, saving one comparison per element.",
    },
    {
      q: "Does Linear Search work on linked lists?",
      a: "Yes. Linear Search is ideal for linked lists because traversing node references is inherently sequential.",
    },
  ],
};

