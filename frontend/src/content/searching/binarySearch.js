export const binarySearchArticle = {
  introduction: [
    "Binary Search is an exceptionally efficient algorithm for locating a target value within a sorted collection. It works on the divide-and-conquer principle, repeatedly halving the active search interval in each step.",
    "By comparing the target value to the element at the midpoint of the current range, the algorithm immediately eliminates the half of the array that cannot contain the target. This logarithmic scaling enables Binary Search to locate an item among 1,000,000 elements in approximately 20 comparisons.",
  ],
  complexity: {
    best: { time: "O(1)", space: "O(1)" },
    average: { time: "O(log n)", space: "O(1)" },
    worst: { time: "O(log n)", space: "O(1)" },
  },
  stepByStep: [
    "Set the left boundary pointer to index 0 and right boundary pointer to index n - 1",
    "Calculate the middle index as Math.floor((left + right) / 2)",
    "Compare the midpoint value with the target value",
    "If the midpoint value matches the target, return the middle index",
    "If the target is smaller than the midpoint value, narrow the right boundary to mid - 1",
    "If the target is greater than the midpoint value, narrow the left boundary to mid + 1",
    "Repeat while left <= right; if left exceeds right, return -1 indicating target absent",
  ],
  workedExample: {
    headers: ["Left", "Right", "Mid", "Mid Value", "Target", "Comparison", "Action"],
    rows: [
      ["0", "9", "4", "20", "42", "20 < 42", "Target is in right half; set left = 5"],
      ["5", "9", "7", "35", "42", "35 < 42", "Target is in right half; set left = 8"],
      ["8", "9", "8", "42", "42", "42 == 42", "Target found! Return index 8"],
    ],
  },
  tradeoffs: {
    use: [
      "Sorted arrays where O(log n) lookup is needed",
      "Repeated queries on static or infrequently modified data",
      "Finding boundary conditions, lower bounds, or upper bounds in monotonic search spaces",
      "Memory-constrained scenarios requiring logarithmic lookup with O(1) auxiliary space",
    ],
    avoid: [
      "Unsorted data where the cost of sorting (O(n log n)) outweighs repeated searches",
      "Singly linked lists where random element indexing is O(n), negating the logarithmic benefit",
      "Highly dynamic datasets with frequent insertions and deletions where maintaining sorted order is slow",
    ],
  },
  code: {
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    javascript: `export function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
    java: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
    cpp: `#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    c: `#include <stddef.h>

int binary_search(const int arr[], size_t n, int target) {
    int left = 0;
    int right = (int)n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
  },
  faq: [
    {
      q: "What causes integer overflow in Binary Search?",
      a: "In languages like Java, C++, and C, computing (left + right) / 2 can overflow if the sum exceeds 2^31 - 1. Using left + (right - left) / 2 guarantees numeric safety.",
    },
    {
      q: "Can Binary Search find duplicate elements?",
      a: "Standard binary search returns any matching index. Variations like lower_bound and upper_bound return the first or last occurrences of duplicates respectively.",
    },
    {
      q: "Why is Binary Search inefficient on linked lists?",
      a: "Finding the midpoint in a linked list requires traversing nodes sequentially taking O(n) time, destroying the O(log n) efficiency.",
    },
  ],
};

