export const hashMapArticle = {
  introduction: [
    "A Hash Map stores key-value pairs in bucket arrays, computing positions via hash functions and automatically resizing capacity when the load factor crosses a set limit (commonly 0.75).",
    "Dynamic resizing and rehashing keep chain lengths short, preserving amortized O(1) reads and writes across varying collection sizes.",
  ],
  complexity: {
    best: { time: "O(1)", space: "O(n)" },
    average: { time: "O(1)", space: "O(n)" },
    worst: { time: "O(n)", space: "O(n)" },
  },
  stepByStep: [
    "Receive key-value pair for insertion",
    "Calculate bucket index = hash(key) & (capacity - 1)",
    "Traverse bucket chain; if key exists, update value and return",
    "If key is new, add entry to bucket chain and increment size",
    "Check if (size / capacity) exceeds load factor (0.75)",
    "If load factor exceeded: double capacity, allocate new bucket array, and rehash all existing entries",
  ],
  workedExample: {
    headers: ["Operation", "Key-Value", "Size / Capacity", "Load Factor", "Action"],
    rows: [
      ["Put", "('user:1', 'Alice')", "1 / 4", "0.25", "Stored in bucket 1"],
      ["Put", "('user:2', 'Bob')", "2 / 4", "0.50", "Stored in bucket 2"],
      ["Put", "('user:3', 'Charlie')", "3 / 4", "0.75", "Threshold reached; double capacity to 8"],
      ["Rehash", "All 3 entries", "3 / 8", "0.375", "Re-distributed across 8 buckets"],
      ["Put", "('user:4', 'David')", "4 / 8", "0.50", "Stored in bucket 5 without resizing"],
    ],
  },
  tradeoffs: {
    use: [
      "Dynamic dictionaries with unknown or unbounded item counts",
      "Fast lookup tables with frequent additions and deletions",
      "Database caching layers (Redis, Memcached)",
    ],
    avoid: [
      "Real-time hard deadline systems where occasional O(n) resize pauses cannot be tolerated",
      "Sorted key order requirements (use a balanced BST like Red-Black tree / AVL)",
    ],
  },
  code: {
    python: `class HashMap:
    def __init__(self, capacity=4, load_factor=0.75):
        self.capacity = capacity
        self.load_factor = load_factor
        self.size = 0
        self.buckets = [[] for _ in range(capacity)]
    def _resize(self):
        new_capacity = self.capacity * 2
        new_buckets = [[] for _ in range(new_capacity)]
        for bucket in self.buckets:
            for k, v in bucket:
                idx = hash(k) % new_capacity
                new_buckets[idx].append((k, v))
        self.capacity = new_capacity
        self.buckets = new_buckets
    def put(self, key, value):
        idx = hash(key) % self.capacity
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)
                return
        self.buckets[idx].append((key, value))
        self.size += 1
        if self.size / self.capacity > self.load_factor:
            self._resize()`,
    javascript: `export class HashMap {
  constructor(capacity = 4, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array.from({ length: capacity }, () => []);
  }
  _hash(key) {
    let h = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h) % this.capacity;
  }
  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
    for (const bucket of oldBuckets) {
      for (const [k, v] of bucket) {
        this.put(k, v);
      }
    }
  }
  put(key, value) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;
    if (this.size / this.capacity > this.loadFactor) {
      this._resize();
    }
  }
}`,
    java: `import java.util.*;

public class ResizableHashMap<K, V> {
    static class Node<K, V> {
        K key; V val;
        Node(K key, V val) { this.key = key; this.val = val; }
    }
    private List<List<Node<K, V>>> buckets;
    private int capacity = 4, size = 0;
    public ResizableHashMap() {
        buckets = new ArrayList<>(capacity);
        for (int i = 0; i < capacity; i++) buckets.add(new LinkedList<>());
    }
    private int hash(K key) { return Math.abs(key.hashCode()) % capacity; }
    private void resize() {
        List<List<Node<K, V>>> old = buckets;
        capacity *= 2;
        buckets = new ArrayList<>(capacity);
        for (int i = 0; i < capacity; i++) buckets.add(new LinkedList<>());
        size = 0;
        for (List<Node<K, V>> b : old) {
            for (Node<K, V> n : b) put(n.key, n.val);
        }
    }
    public void put(K key, V val) {
        int idx = hash(key);
        for (Node<K, V> n : buckets.get(idx)) {
            if (n.key.equals(key)) { n.val = val; return; }
        }
        buckets.get(idx).add(new Node<>(key, val));
        if (++size > capacity * 0.75) resize();
    }
}`,
    cpp: `#include <vector>
#include <list>
#include <string>

template <typename K, typename V>
class ResizableHashMap {
    std::vector<std::list<std::pair<K, V>>> buckets;
    size_t capacity = 4;
    size_t size = 0;
    size_t hash(const K& key) const { return std::hash<K>{}(key) % capacity; }
    void resize() {
        auto old = std::move(buckets);
        capacity *= 2;
        buckets.resize(capacity);
        size = 0;
        for (const auto& b : old) {
            for (const auto& [k, v] : b) put(k, v);
        }
    }
public:
    ResizableHashMap() : buckets(capacity) {}
    void put(const K& key, const V& val) {
        size_t idx = hash(key);
        for (auto& p : buckets[idx]) {
            if (p.first == key) { p.second = val; return; }
        }
        buckets[idx].emplace_back(key, val);
        if (++size > capacity * 0.75) resize();
    }
};`,
    c: `#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char* key;
    int val;
    struct Entry* next;
} Entry;

typedef struct {
    Entry** buckets;
    size_t capacity;
    size_t size;
} HashMap;

HashMap* hm_create(size_t cap) {
    HashMap* hm = (HashMap*)malloc(sizeof(HashMap));
    hm->capacity = cap;
    hm->size = 0;
    hm->buckets = (Entry**)calloc(cap, sizeof(Entry*));
    return hm;
}`,
  },
  faq: [
    {
      q: "What is the difference between Hash Table and Hash Map?",
      a: "Historically in Java, Hashtable is synchronized and thread-safe, whereas HashMap is unsynchronized, faster, and permits null keys. In modern computer science, Hash Map generally denotes dynamic resizable hashing.",
    },
    {
      q: "How does capacity doubling affect amortized time complexity?",
      a: "Although resizing takes O(n) time, doubling the size means resizing occurs exponentially less frequently. The amortized cost per insertion remains O(1).",
    },
  ],
};

