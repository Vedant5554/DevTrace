export const radixSortArticle = {
  introduction: [
    "Radix Sort is a non-comparative integer sorting algorithm that processes digits from least significant to most significant (LSD) or vice versa (MSD). It uses Counting Sort as a subroutine to sort by each digit position.",
    "Unlike comparison-based sorts, Radix Sort can achieve O(nk) time where k is the number of digits. This makes it faster than O(n log n) comparison sorts for large datasets with bounded integer ranges, but it requires additional space and only works on integers (or strings with fixed-length keys).",
  ],
  complexity: {
    best: { time: "O(nk)", space: "O(n + k)" },
    average: { time: "O(nk)", space: "O(n + k)" },
    worst: { time: "O(nk)", space: "O(n + k)" },
  },
  stepByStep: [
    "Find the maximum number to determine the number of digits (k)",
    "For each digit position from LSD to MSD:",
    "  Use Counting Sort to sort by the current digit",
    "  Maintain stability - equal digits preserve relative order",
    "  Update array with sorted-by-digit order",
    "After all k passes, array is fully sorted",
  ],
  workedExample: {
    headers: ["Pass", "Digit Place", "Array State", "Stable?"],
    rows: [
      ["1", "Ones (10⁰)", "[170, 90, 802, 2, 24, 45, 75, 66]", "Yes"],
      ["2", "Tens (10¹)", "[802, 2, 24, 45, 66, 170, 75, 90]", "Yes"],
      ["3", "Hundreds (10²)", "[2, 24, 45, 66, 75, 90, 170, 802]", "Yes"],
    ],
  },
  tradeoffs: {
    use: [
      "Large datasets of integers with known bounded range",
      "When O(n log n) comparison sorts are too slow",
      "Fixed-length string sorting (padded to same length)",
      "Parallel processing - each digit pass is independent",
      "External sorting with large integer keys",
    ],
    avoid: [
      "Floating-point numbers without conversion",
      "Variable-length strings without padding",
      "Small datasets - overhead of multiple passes",
      "Memory-constrained environments - needs O(n) extra space",
      "When comparison-based sort is required by spec",
    ],
  },
  code: {
    python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        count[(arr[i] // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    for i in range(n):
        arr[i] = output[i]`,
    javascript: `function radixSort(arr) {
    const maxVal = Math.max(...arr);
    let exp = 1;
    while (Math.floor(maxVal / exp) > 0) {
        countingSortByDigit(arr, exp);
        exp *= 10;
    }
    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    for (let i = 0; i < n; i++) arr[i] = output[i];
}`,
    java: `public static void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; max / exp > 0; exp *= 10) countingSortByDigit(arr, exp);
}

private static void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    System.arraycopy(output, 0, arr, 0, n);
}`,
    cpp: `void countingSortByDigit(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    vector<int> count(10, 0);
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    arr = output;
}

void radixSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    for (int exp = 1; maxVal / exp > 0; exp *= 10) countingSortByDigit(arr, exp);
}`,
    c: `void counting_sort_by_digit(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radix_sort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];
    for (int exp = 1; max / exp > 0; exp *= 10) counting_sort_by_digit(arr, n, exp);
}`,
  },
  faq: [
    { q: "Is Radix Sort stable?", a: "Yes, when implemented with a stable subroutine like Counting Sort, Radix Sort is stable. The relative order of equal elements is preserved through each digit pass." },
    { q: "Can Radix Sort handle negative numbers?", a: "Standard Radix Sort works on non-negative integers. For negatives, separate positive and negative arrays, sort positives normally, sort negatives by absolute value in reverse, then combine." },
    { q: "What's the difference between LSD and MSD Radix Sort?", a: "LSD (Least Significant Digit) processes from rightmost digit, simpler and stable. MSD (Most Significant Digit) processes from leftmost, can be faster for strings but more complex." },
  ],
};