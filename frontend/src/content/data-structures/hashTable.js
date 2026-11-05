export const hashTableArticle = {
  introduction: [
    "A Hash Table is an associative data structure that stores key-value pairs and achieves average-case O(1) time complexity for search, insertion, and deletion operations.",
    "It accomplishes this by applying a mathematical hash function to keys to compute an integer index into an array of buckets. When two distinct keys hash to the same bucket index (a collision), resolution strategies like separate chaining (linked lists) or open addressing (linear probing) resolve the conflict.",
  ],
  complexity: {
    best: { time: "O(1)", space: "O(n)" },
    average: { time: "O(1)", space: "O(n)" },
    worst: { time: "O(n)", space: "O(n)" },
  },
  stepByStep: [
    "Compute the hash code of the input key using a uniform hash function",
    "Map the hash code to a valid bucket index using the modulo operator: index = hash(key) % capacity",
    "Inspect the target bucket at that array index",
    "For insertion: if key already exists, overwrite value; otherwise append key-value pair to bucket chain",
    "For lookup: traverse chain at bucket index, comparing keys; return value if match is found",
    "For deletion: locate entry in chain and unlink it from the bucket",
  ],
  workedExample: {
    headers: ["Operation", "Key", "Hash % Capacity", "Bucket State", "Collision?"],
    rows: [
      ["Insert", "'apple'", "hash('apple') % 5 = 2", "Bucket 2: [('apple', 10)]", "No"],
      ["Insert", "'banana'", "hash('banana') % 5 = 4", "Bucket 4: [('banana', 20)]", "No"],
      ["Insert", "'cherry'", "hash('cherry') % 5 = 2", "Bucket 2: [('apple', 10), ('cherry', 30)]", "Yes (Chained)"],
      ["Search", "'cherry'", "hash('cherry') % 5 = 2", "Traversed bucket 2 -> Found 30", "-"],
    ],
  },
  tradeoffs: {
    use: [
      "Rapid key-value lookup, insertion, and deletion in O(1) average time",
      "Counting element frequencies and deduplicating records",
      "Database indexing and memoization caches",
    ],
    avoid: [
      "Sorted traversals or range queries (hash tables have no inherent key ordering)",
      "Adversarial environments without cryptographic hash functions (vulnerable to HashDoS attacks)",
      "Memory-critical embedded systems where array overhead and bucket pointers waste space",
    ],
  },
  code: {
    python: `class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    def _hash(self, key):
        return hash(key) % self.size
    def set(self, key, value):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx][i] = (key, value)
                return
        self.table[idx].append((key, value))
    def get(self, key):
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key:
                return v
        return None`,
    javascript: `export class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = Array.from({ length: size }, () => []);
  }
  _hash(key) {
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % this.size;
  }
  set(key, value) {
    const idx = this._hash(key);
    const bucket = this.table[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }
  get(key) {
    const idx = this._hash(key);
    const bucket = this.table[idx];
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }
}`,
    java: `import java.util.*;

public class HashTable<K, V> {
    static class Entry<K, V> {
        K key; V val;
        Entry(K key, V val) { this.key = key; this.val = val; }
    }
    private List<List<Entry<K, V>>> table;
    private int capacity;
    public HashTable(int capacity) {
        this.capacity = capacity;
        table = new ArrayList<>(capacity);
        for (int i = 0; i < capacity; i++) table.add(new LinkedList<>());
    }
    private int hash(K key) { return Math.abs(key.hashCode()) % capacity; }
    public void put(K key, V val) {
        int idx = hash(key);
        for (Entry<K, V> e : table.get(idx)) {
            if (e.key.equals(key)) { e.val = val; return; }
        }
        table.get(idx).add(new Entry<>(key, val));
    }
    public V get(K key) {
        int idx = hash(key);
        for (Entry<K, V> e : table.get(idx)) {
            if (e.key.equals(key)) return e.val;
        }
        return null;
    }
}`,
    cpp: `#include <vector>
#include <list>
#include <string>

template <typename K, typename V>
class HashTable {
    std::vector<std::list<std::pair<K, V>>> table;
    size_t capacity;
    size_t hash(const K& key) const {
        return std::hash<K>{}(key) % capacity;
    }
public:
    HashTable(size_t cap = 10) : capacity(cap), table(cap) {}
    void set(const K& key, const V& val) {
        size_t idx = hash(key);
        for (auto& pair : table[idx]) {
            if (pair.first == key) {
                pair.second = val;
                return;
            }
        }
        table[idx].emplace_back(key, val);
    }
    bool get(const K& key, V& outVal) const {
        size_t idx = hash(key);
        for (const auto& pair : table[idx]) {
            if (pair.first == key) {
                outVal = pair.second;
                return true;
            }
        }
        return false;
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
    size_t size;
} HashTable;

size_t hash(const char* key, size_t size) {
    size_t h = 0;
    while (*key) h = (h * 31) + (unsigned char)(*key++);
    return h % size;
}

void ht_set(HashTable* ht, const char* key, int val) {
    size_t idx = hash(key, ht->size);
    Entry* curr = ht->buckets[idx];
    while (curr) {
        if (strcmp(curr->key, key) == 0) {
            curr->val = val;
            return;
        }
        curr = curr->next;
    }
    Entry* new_entry = (Entry*)malloc(sizeof(Entry));
    new_entry->key = strdup(key);
    new_entry->val = val;
    new_entry->next = ht->buckets[idx];
    ht->buckets[idx] = new_entry;
}`,
  },
  faq: [
    {
      q: "What causes worst-case O(n) performance in hash tables?",
      a: "When a poor hash function maps all keys to the exact same bucket, the hash table degrades into a single linked list, causing lookups to take O(n) linear time.",
    },
    {
      q: "What is load factor?",
      a: "The load factor α = n / k is the ratio of stored elements n to bucket capacity k. When α exceeds a threshold (typically 0.75), the table doubles its capacity and rehashes all items.",
    },
  ],
};

