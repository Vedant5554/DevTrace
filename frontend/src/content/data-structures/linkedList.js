export const linkedListArticle = {
  introduction: [
    "A Singly Linked List is a linear data structure where elements, called nodes, are stored non-contiguously in memory. Each node contains two components: data value and a pointer (reference) pointing to the next node in sequence.",
    "Unlike arrays, linked lists do not require memory reallocation or block shifting during insertions and deletions at the head, making them ideal for dynamic allocation and implementing stacks and queues.",
  ],
  complexity: {
    best: { time: "O(1)", space: "O(n)" },
    average: { time: "O(n)", space: "O(n)" },
    worst: { time: "O(n)", space: "O(n)" },
  },
  stepByStep: [
    "To access or search: start at the head pointer and traverse node by node following next pointers",
    "Compare each node's value with target key; return true/index if matched",
    "To insert at head: create new node, set newNode.next = head, then point head to newNode",
    "To insert at tail: traverse to the final node (where next == null) and set current.next = newNode",
    "To delete a node: find node preceding target, update previous.next = target.next, then unreference target",
  ],
  workedExample: {
    headers: ["Operation", "Node Value", "List State", "Pointers Modified"],
    rows: [
      ["Insert Head", "10", "10 -> null", "head points to 10"],
      ["Insert Head", "20", "20 -> 10 -> null", "20.next = 10, head = 20"],
      ["Insert Tail", "30", "20 -> 10 -> 30 -> null", "10.next = 30, 30.next = null"],
      ["Delete Node", "10", "20 -> 30 -> null", "20.next bypassed 10 to point to 30"],
      ["Search Key", "30", "20 -> 30 -> null", "Traversed 2 nodes: Found at index 1"],
    ],
  },
  tradeoffs: {
    use: [
      "Frequent insertions and deletions at the beginning of the list in O(1) time",
      "Dynamic data structures where collection size is unknown or varies unpredictably",
      "Implementing stacks, queues, and adjacency lists for graphs",
    ],
    avoid: [
      "Frequent random element access (accessing index k takes O(k) time)",
      "Strict cache performance requirements (scattered heap nodes cause cache misses)",
      "Memory-constrained systems (each node incurs pointer storage overhead)",
    ],
  },
  code: {
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    def insert_head(self, val):
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node
    def search(self, val):
        curr = self.head
        while curr:
            if curr.val == val:
                return True
            curr = curr.next
        return False`,
    javascript: `class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }
  insertHead(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
  }
  search(val) {
    let curr = this.head;
    while (curr !== null) {
      if (curr.val === val) return true;
      curr = curr.next;
    }
    return false;
  }
}`,
    java: `public class LinkedList {
    static class Node {
        int val;
        Node next;
        Node(int val) { this.val = val; }
    }
    private Node head;
    public void insertHead(int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
    }
    public boolean search(int val) {
        Node curr = head;
        while (curr != null) {
            if (curr.val == val) return true;
            curr = curr.next;
        }
        return false;
    }
}`,
    cpp: `class LinkedList {
    struct Node {
        int val;
        Node* next;
        Node(int v) : val(v), next(nullptr) {}
    };
    Node* head = nullptr;
public:
    void insertHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    bool search(int val) const {
        Node* curr = head;
        while (curr) {
            if (curr->val == val) return true;
            curr = curr->next;
        }
        return false;
    }
};`,
    c: `#include <stdbool.h>
#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node* next;
} Node;

Node* insert_head(Node* head, int val) {
    Node* new_node = (Node*)malloc(sizeof(Node));
    new_node->val = val;
    new_node->next = head;
    return new_node;
}

bool search(const Node* head, int val) {
    const Node* curr = head;
    while (curr) {
        if (curr->val == val) return true;
        curr = curr->next;
    }
    return false;
}`,
  },
  faq: [
    {
      q: "Why does array access take O(1) while linked list access takes O(n)?",
      a: "Array elements sit contiguously in memory allowing direct address calculation base + index * size. Linked list nodes reside scattered in heap memory, requiring sequential pointer chasing.",
    },
    {
      q: "How do you detect a cycle in a linked list?",
      a: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare) uses two pointers moving at different speeds (1 step and 2 steps). If they meet, a cycle exists.",
    },
    {
      q: "What is a dummy/sentinel node?",
      a: "A dummy node is an empty node placed before the head to simplify edge cases during insertions and deletions, eliminating special-case checks for head mutations.",
    },
  ],
};

