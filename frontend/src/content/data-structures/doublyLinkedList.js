export const doublyLinkedListArticle = {
  introduction: [
    "A Doubly Linked List is a linear data structure composed of nodes that each maintain two explicit pointer references: one to the next node and one to the previous node in sequence.",
    "The presence of bidirectional pointers allows instantaneous backward traversal and enables deleting or inserting before an arbitrary node in O(1) time without requiring a scan from the head to find the preceding node.",
  ],
  complexity: {
    best: { time: "O(1)", space: "O(n)" },
    average: { time: "O(n)", space: "O(n)" },
    worst: { time: "O(n)", space: "O(n)" },
  },
  stepByStep: [
    "To insert at head: create newNode, set newNode.next = head, if head exists set head.prev = newNode, update head = newNode",
    "To insert at tail: create newNode, set newNode.prev = tail, if tail exists set tail.next = newNode, update tail = newNode",
    "To delete node: set node.prev.next = node.next and node.next.prev = node.prev, unlinking the target",
    "To traverse forward: follow next pointers until null",
    "To traverse backward: follow prev pointers from tail until null",
  ],
  workedExample: {
    headers: ["Operation", "Node Value", "List Representation", "Pointers Updated"],
    rows: [
      ["Insert Head", "10", "null <- [10] -> null", "head = 10, tail = 10"],
      ["Insert Tail", "20", "null <- [10] <-> [20] -> null", "10.next = 20, 20.prev = 10, tail = 20"],
      ["Insert Tail", "30", "null <- [10] <-> [20] <-> [30] -> null", "20.next = 30, 30.prev = 20, tail = 30"],
      ["Delete Node", "20", "null <- [10] <-> [30] -> null", "10.next = 30, 30.prev = 10"],
    ],
  },
  tradeoffs: {
    use: [
      "LRU Cache implementations (combining hash map with doubly linked list for O(1) access and eviction)",
      "Browser history navigation (forward and back buttons)",
      "Undo/redo mechanisms in text editors and productivity software",
      "Music and media playlist management with previous and next track controls",
    ],
    avoid: [
      "Memory-restricted environments where storing two pointer references per node is prohibitive",
      "Simple forward-only sequential pipelines where a singly linked list saves pointer overhead",
    ],
  },
  code: {
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    def insert_head(self, val):
        new_node = Node(val)
        new_node.next = self.head
        if self.head:
            self.head.prev = new_node
        else:
            self.tail = new_node
        self.head = new_node
    def delete_node(self, node):
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev`,
    javascript: `class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insertHead(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
  }
  deleteNode(node) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }
}`,
    java: `public class DoublyLinkedList {
    static class Node {
        int val;
        Node prev, next;
        Node(int val) { this.val = val; }
    }
    private Node head, tail;
    public void insertHead(int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        if (head != null) head.prev = newNode;
        else tail = newNode;
        head = newNode;
    }
    public void delete(Node node) {
        if (node.prev != null) node.prev.next = node.next;
        else head = node.next;
        if (node.next != null) node.next.prev = node.prev;
        else tail = node.prev;
    }
}`,
    cpp: `class DoublyLinkedList {
    struct Node {
        int val;
        Node *prev = nullptr, *next = nullptr;
        Node(int v) : val(v) {}
    };
    Node *head = nullptr, *tail = nullptr;
public:
    void insertHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        if (head) head->prev = newNode;
        else tail = newNode;
        head = newNode;
    }
    void deleteNode(Node* node) {
        if (!node) return;
        if (node->prev) node->prev->next = node->next;
        else head = node->next;
        if (node->next) node->next->prev = node->prev;
        else tail = node->prev;
        delete node;
    }
};`,
    c: `#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node* prev;
    struct Node* next;
} Node;

void insert_head(Node** head, Node** tail, int val) {
    Node* new_node = (Node*)malloc(sizeof(Node));
    new_node->val = val;
    new_node->prev = NULL;
    new_node->next = *head;
    if (*head) (*head)->prev = new_node;
    else *tail = new_node;
    *head = new_node;
}

void delete_node(Node** head, Node** tail, Node* node) {
    if (node->prev) node->prev->next = node->next;
    else *head = node->next;
    if (node->next) node->next->prev = node->prev;
    else *tail = node->prev;
    free(node);
}`,
  },
  faq: [
    {
      q: "Why is a Doubly Linked List preferred in LRU Cache over a Singly Linked List?",
      a: "An LRU Cache must move accessed nodes to the front and remove the tail node in O(1) time. Removing an arbitrary node from a singly linked list requires an O(n) scan to find its previous node; doubly linked lists do it in O(1).",
    },
    {
      q: "What are the disadvantages of Doubly Linked Lists?",
      a: "Every node requires extra memory for the previous pointer, and every insertion/deletion requires managing four pointers instead of two.",
    },
  ],
};

