export const trieArticle = {
  introduction: [
    "A Trie (derived from 'retrieval' and commonly pronounced 'try') is a specialized tree-based data structure used to store and retrieve strings over an alphabet. Instead of storing entire keys in nodes, each node represents an individual character, and strings are reconstructed along paths descending from the root.",
    "Tries are particularly well-suited for prefix-matching applications like autocomplete, spell checking, and IP routing tables. Lookups, insertions, and deletions depend solely on the length of the query key (k) rather than the total number of items stored (n), guaranteeing deterministic O(k) performance."
  ],
  complexity: {
    best: {
      time: "O(k)",
      space: "O(n * k)"
    },
    average: {
      time: "O(k)",
      space: "O(n * k)"
    },
    worst: {
      time: "O(k)",
      space: "O(n * k)"
    }
  },
  stepByStep: [
    "Initialize an empty root node containing a hash map or fixed array of child pointers and a boolean flag indicating word termination.",
    "To insert a word of length k, start at the root and iterate through each character in sequence.",
    "For each character, check if a child link exists; if not, allocate and link a new child node.",
    "Move the pointer down to the child node and repeat for the next character.",
    "After processing all k characters, mark the terminal node's isEndOfWord flag as true.",
    "To search for a word or prefix, traverse child links matching the characters of the query; return true if the entire sequence exists (and matches isEndOfWord for full word queries)."
  ],
  workedExample: {
    headers: ["Operation", "Word / Prefix", "Path Traversed", "Outcome"],
    rows: [
      ["Insert", "cat", "root -> 'c' -> 'a' -> 't'", "Marked 't' as end-of-word"],
      ["Insert", "car", "root -> 'c' -> 'a' -> 'r'", "Shared 'c' and 'a', branched at 'r'"],
      ["Search", "car", "root -> 'c' -> 'a' -> 'r'", "Found ('r' is end-of-word)"],
      ["Search", "ca", "root -> 'c' -> 'a'", "Prefix exists, not end-of-word"],
      ["StartsWith", "ca", "root -> 'c' -> 'a'", "True (matches 'cat' and 'car')"],
      ["Search", "dog", "root -> 'd' missing", "False"]
    ]
  },
  tradeoffs: {
    use: [
      "Typeahead autocomplete engines and search suggestion bars.",
      "Prefix matching, dictionary lookups, and spell checkers.",
      "Longest prefix matching in network packet IP routing."
    ],
    avoid: [
      "Datasets with long keys and few shared prefixes where memory overhead per node pointer exceeds acceptable limits.",
      "Workloads requiring ordered comparisons of non-string arbitrary data types."
    ]
  },
  code: {
    python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
    javascript: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}`,
    java: `import java.util.HashMap;
import java.util.Map;

public class Trie {
    static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEndOfWord = false;
    }

    private final TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            curr.children.putIfAbsent(c, new TrieNode());
            curr = curr.children.get(c);
        }
        curr.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            TrieNode node = curr.children.get(c);
            if (node == null) return false;
            curr = node;
        }
        return curr.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            TrieNode node = curr.children.get(c);
            if (node == null) return false;
            curr = node;
        }
        return true;
    }
}`,
    cpp: `#include <string>
#include <unordered_map>

class TrieNode {
public:
    std::unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    TrieNode() : isEndOfWord(false) {}
};

class Trie {
    TrieNode* root;
public:
    Trie() {
        root = new TrieNode();
    }

    void insert(const std::string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (curr->children.find(c) == curr->children.end()) {
                curr->children[c] = new TrieNode();
            }
            curr = curr->children[c];
        }
        curr->isEndOfWord = true;
    }

    bool search(const std::string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (curr->children.find(c) == curr->children.end()) return false;
            curr = curr->children[c];
        }
        return curr->isEndOfWord;
    }

    bool startsWith(const std::string& prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            if (curr->children.find(c) == curr->children.end()) return false;
            curr = curr->children[c];
        }
        return true;
    }
};`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define ALPHABET_SIZE 26

struct TrieNode {
    struct TrieNode* children[ALPHABET_SIZE];
    bool isEndOfWord;
};

struct TrieNode* createNode() {
    struct TrieNode* node = (struct TrieNode*)malloc(sizeof(struct TrieNode));
    node->isEndOfWord = false;
    for (int i = 0; i < ALPHABET_SIZE; i++) {
        node->children[i] = NULL;
    }
    return node;
}

void insert(struct TrieNode* root, const char* key) {
    struct TrieNode* curr = root;
    for (int i = 0; key[i] != '\\0'; i++) {
        int index = key[i] - 'a';
        if (curr->children[index] == NULL) {
            curr->children[index] = createNode();
        }
        curr = curr->children[index];
    }
    curr->isEndOfWord = true;
}

bool search(struct TrieNode* root, const char* key) {
    struct TrieNode* curr = root;
    for (int i = 0; key[i] != '\\0'; i++) {
        int index = key[i] - 'a';
        if (curr->children[index] == NULL) return false;
        curr = curr->children[index];
    }
    return (curr != NULL && curr->isEndOfWord);
}`
  },
  faq: [
    {
      q: "What is the primary advantage of a Trie over a Hash Map for storing strings?",
      a: "Tries natively support prefix queries (such as listing all words starting with 'pre') in O(k) time and avoid hash collisions entirely. Additionally, they store shared prefixes once, potentially saving storage across large dictionaries with common roots."
    },
    {
      q: "How can memory usage be reduced in Trie implementations?",
      a: "Compressed Tries (Radix trees / Patricia tries) merge nodes with single children into a single edge containing a string segment, dramatically reducing total pointer allocations."
    }
  ]
};

