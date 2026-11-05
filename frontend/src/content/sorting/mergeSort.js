export const mergeSortArticle = {
  introduction: [
    "Merge Sort is a divide-and-conquer algorithm that recursively splits the array into halves until each subarray has one element, then merges them back in sorted order. It was invented by John von Neumann in 1945.",
    "The key insight is that merging two sorted arrays is efficient - we only need to compare the first elements of each array. This gives Merge Sort its guaranteed O(n log n) time complexity, making it reliable for large datasets.",
  ],
  complexity: {
    best: { time: "O(n log n)", space: "O(n)" },
    average: { time: "O(n log n)", space: "O(n)" },
    worst: { time: "O(n log n)", space: "O(n)" },
  },
  stepByStep: [
    "Divide: Split array into two halves recursively",
    "Conquer: Continue splitting until single elements remain",
    "Merge: Combine two sorted halves by comparing first elements",
    "Copy smaller element to output, advance in that half",
    "Repeat until all elements are merged",
    "Return merged sorted array up the recursion stack",
  ],
  workedExample: {
    headers: ["Level", "Operation", "Arrays Being Merged", "Result"],
    rows: [
      ["Split", "Divide", "[38,27,43,3] [9,82,10]", "-"],
      ["Split", "Divide", "[38,27] [43,3] [9,82] [10]", "-"],
      ["Split", "Divide", "[38] [27] [43] [3] [9] [82] [10]", "-"],
      ["Merge", "Combine", "[38] [27]", "[27,38]"],
      ["Merge", "Combine", "[43] [3]", "[3,43]"],
      ["Merge", "Combine", "[9] [82]", "[9,82]"],
      ["Merge", "Combine", "[27,38] [3,43]", "[3,27,38,43]"],
      ["Merge", "Combine", "[9,82] [10]", "[9,10,82]"],
      ["Merge", "Combine", "[3,27,38,43] [9,10,82]", "[3,9,10,27,38,43,82]"],
    ],
  },
  tradeoffs: {
    use: [
      "Large datasets requiring guaranteed O(n log n)",
      "When stable sorting is required",
      "External sorting (data doesn't fit in memory)",
      "Linked lists - O(1) extra space possible",
      "Parallel processing - divide step is independent",
    ],
    avoid: [
      "Small arrays - overhead of recursion and merging",
      "Memory-constrained environments - needs O(n) auxiliary space",
      "When in-place sorting is required",
      "Nearly sorted data - still does full divide and merge",
    ],
  },
  code: {
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}

private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        result[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
}`,
    cpp: `vector<int> mergeSort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.end());
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right);
}

vector<int> merge(vector<int> left, vector<int> right) {
    vector<int> result;
    int i = 0, j = 0;
    while (i < left.size() && j < right.size()) {
        result.push_back(left[i] <= right[j] ? left[i++] : right[j++]);
    }
    result.insert(result.end(), left.begin() + i, left.end());
    result.insert(result.end(), right.begin() + j, right.end());
    return result;
}`,
    c: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void merge_sort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
  },
  faq: [
    { q: "Is Merge Sort stable?", a: "Yes, Merge Sort is stable when implemented correctly. During merging, when elements are equal, we take from the left subarray first, preserving relative order." },
    { q: "Why does Merge Sort need O(n) extra space?", a: "During the merge step, we need a temporary array to hold the merged result before copying back. This is fundamental to the standard implementation." },
    { q: "Can Merge Sort be made in-place?", a: "Yes, in-place variants exist but they are complex and typically slower due to increased element movements. The standard O(n) space version is preferred in practice." },
  ],
};