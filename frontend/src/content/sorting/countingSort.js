export const countingSortArticle = {
  introduction: [
    "Counting Sort is a non-comparative integer sorting algorithm that works by counting the frequency of each distinct element in the input, then using those counts to determine the positions of elements in the sorted output.",
    "It operates in O(n + k) time where n is the number of elements and k is the range of input values. This makes it extremely fast when k is small relative to n, but impractical for large value ranges due to space requirements. It's often used as a subroutine in Radix Sort.",
  ],
  complexity: {
    best: { time: "O(n + k)", space: "O(k)" },
    average: { time: "O(n + k)", space: "O(k)" },
    worst: { time: "O(n + k)", space: "O(k)" },
  },
  stepByStep: [
    "Find the minimum and maximum values to determine range k",
    "Create a count array of size (max - min + 1) initialized to 0",
    "Iterate through input, incrementing count[value - min] for each element",
    "Transform count array to cumulative counts (prefix sums)",
    "Iterate through input backwards (for stability), placing each element at count[value - min] - 1 in output",
    "Decrement count[value - min] after placing each element",
    "Copy output array back to input (or return output)",
  ],
  workedExample: {
    headers: ["Step", "Operation", "Count Array", "Output"],
    rows: [
      ["Input", "[4, 2, 2, 8, 3, 3, 1]", "min=1, max=8, k=8", "-"],
      ["Count", "Frequency count", "[1,2,2,1,1,0,0,1]", "-"],
      ["Cumulative", "Prefix sums", "[1,3,5,6,7,7,7,8]", "-"],
      ["Place", "Backward iteration", "-", "[1,2,2,3,3,4,8]"],
    ],
  },
  tradeoffs: {
    use: [
      "Small integer ranges (k << n) - extremely fast O(n + k)",
      "As a subroutine in Radix Sort for each digit",
      "When stability is required",
      "Frequency analysis / histogram generation",
      "Sorting integers with known bounded range",
    ],
    avoid: [
      "Large value ranges (k >> n) - space inefficient",
      "Floating-point numbers without discretization",
      "Negative numbers without range adjustment",
      "When only comparison-based sort is allowed",
      "Sparse value distributions - wasted space in count array",
    ],
  },
  code: {
    python: `def counting_sort(arr):
    if not arr: return arr
    min_val, max_val = min(arr), max(arr)
    k = max_val - min_val + 1
    count = [0] * k
    for num in arr:
        count[num - min_val] += 1
    for i in range(1, k):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for num in reversed(arr):
        idx = num - min_val
        output[count[idx] - 1] = num
        count[idx] -= 1
    return output`,
    javascript: `function countingSort(arr) {
    if (arr.length === 0) return arr;
    const minVal = Math.min(...arr);
    const maxVal = Math.max(...arr);
    const k = maxVal - minVal + 1;
    const count = new Array(k).fill(0);
    for (const num of arr) count[num - minVal]++;
    for (let i = 1; i < k; i++) count[i] += count[i - 1];
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const idx = arr[i] - minVal;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    return output;
}`,
    java: `public static int[] countingSort(int[] arr) {
    if (arr.length == 0) return arr;
    int minVal = Arrays.stream(arr).min().getAsInt();
    int maxVal = Arrays.stream(arr).max().getAsInt();
    int k = maxVal - minVal + 1;
    int[] count = new int[k];
    for (int num : arr) count[num - minVal]++;
    for (int i = 1; i < k; i++) count[i] += count[i - 1];
    int[] output = new int[arr.length];
    for (int i = arr.length - 1; i >= 0; i--) {
        int idx = arr[i] - minVal;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    return output;
}`,
    cpp: `vector<int> countingSort(vector<int> arr) {
    if (arr.empty()) return arr;
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    int k = maxVal - minVal + 1;
    vector<int> count(k, 0);
    for (int num : arr) count[num - minVal]++;
    for (int i = 1; i < k; i++) count[i] += count[i - 1];
    vector<int> output(arr.size());
    for (int i = arr.size() - 1; i >= 0; i--) {
        int idx = arr[i] - minVal;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    return output;
}`,
    c: `void counting_sort(int arr[], int n, int output[]) {
    if (n == 0) return;
    int min_val = arr[0], max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min_val) min_val = arr[i];
        if (arr[i] > max_val) max_val = arr[i];
    }
    int k = max_val - min_val + 1;
    int count[k];
    for (int i = 0; i < k; i++) count[i] = 0;
    for (int i = 0; i < n; i++) count[arr[i] - min_val]++;
    for (int i = 1; i < k; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int idx = arr[i] - min_val;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}`,
  },
  faq: [
    { q: "Why iterate backwards when placing elements?", a: "To maintain stability. When multiple elements have the same value, the one appearing later in the input gets placed later in the output, preserving relative order." },
    { q: "Can Counting Sort handle negative numbers?", a: "Yes, by finding the minimum value and shifting all indices by -min_val. The count array size becomes max_val - min_val + 1." },
    { q: "What's the difference between Counting Sort and Bucket Sort?", a: "Counting Sort uses an array indexed by value (good for small integer ranges). Bucket Sort distributes elements into buckets (good for uniformly distributed data over a range)." },
  ],
};