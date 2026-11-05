export const quickSortArticle = {
  introduction: [
    "Quick Sort is a highly efficient divide-and-conquer sorting algorithm developed by Tony Hoare in 1959. It works by selecting a 'pivot' element and partitioning the array around it - elements smaller than the pivot go left, larger go right.",
    "The algorithm then recursively sorts the subarrays. The choice of pivot significantly affects performance. Common strategies include picking the first, last, middle, or random element. With good pivot selection, Quick Sort is often the fastest in practice.",
  ],
  complexity: {
    best: { time: "O(n log n)", space: "O(log n)" },
    average: { time: "O(n log n)", space: "O(log n)" },
    worst: { time: "O(n²)", space: "O(n)" },
  },
  stepByStep: [
    "Choose a pivot element (e.g., last element)",
    "Partition: rearrange array so elements < pivot are left, > pivot are right",
    "Place pivot in its final sorted position",
    "Recursively apply to left subarray (elements < pivot)",
    "Recursively apply to right subarray (elements > pivot)",
    "Base case: subarray of size 0 or 1 is already sorted",
  ],
  workedExample: {
    headers: ["Call", "Pivot", "Partition Result", "Recursive Calls"],
    rows: [
      ["qsort([10,7,8,9,1,5])", "5", "[1] 5 [10,7,8,9]", "left: [1], right: [10,7,8,9]"],
      ["qsort([1])", "-", "[1]", "Base case - sorted"],
      ["qsort([10,7,8,9])", "9", "[7,8] 9 [10]", "left: [7,8], right: [10]"],
      ["qsort([7,8])", "8", "[7] 8 []", "left: [7], right: []"],
      ["qsort([7])", "-", "[7]", "Base case - sorted"],
      ["qsort([10])", "-", "[10]", "Base case - sorted"],
      ["Combine", "-", "[1,5,7,8,9,10]", "Final sorted array"],
    ],
  },
  tradeoffs: {
    use: [
      "General-purpose sorting - often fastest in practice",
      "In-memory sorting with good cache locality",
      "When average-case performance matters more than worst-case",
      "Can be optimized with hybrid approaches (Introsort)",
      "Parallelizable - independent subproblems",
    ],
    avoid: [
      "When worst-case O(n²) is unacceptable (use Introsort/Heapsort)",
      "Already sorted or reverse sorted data with naive pivot",
      "When stable sorting is required (standard implementation is unstable)",
      "Small arrays - insertion sort is faster due to overhead",
    ],
  },
  code: {
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
    java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}`,
    cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    c: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}

void quick_sort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}`,
  },
  faq: [
    { q: "Why is Quick Sort unstable?", a: "During partitioning, equal elements can be swapped across the pivot boundary, changing their relative order. For example, if we have [3a, 3b, 2] with pivot 2, both 3s move past each other." },
    { q: "How to avoid worst-case O(n²)?", a: "Use randomized pivot selection or median-of-three (first, middle, last). Introsort switches to Heapsort if recursion depth exceeds 2*log(n)." },
    { q: "What is the space complexity?", a: "O(log n) for the recursion stack in the average case. Worst case O(n) for highly unbalanced partitions. Tail recursion optimization can reduce this." },
  ],
};