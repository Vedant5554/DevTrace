export const avlTreeArticle = {
  introduction: [
    "An AVL Tree (named after inventors Adelson-Velsky and Landis) is a self-balancing binary search tree. In an AVL tree, the heights of the two child subtrees of any node differ by at most one. This property is known as the balance factor, defined as the height of the left subtree minus the height of the right subtree, strictly restricted to the set {-1, 0, 1}.",
    "Whenever an insertion or deletion causes a node's balance factor to become -2 or +2, the tree restores balance using tree rotations (Single Left, Single Right, Left-Right, or Right-Left). Because balance is maintained after every modification, the height of an AVL tree with n nodes never exceeds 1.44 * log2(n), guaranteeing worst-case O(log n) time for lookup, insertion, and deletion."
  ],
  complexity: {
    best: {
      time: "O(log n)",
      space: "O(n)"
    },
    average: {
      time: "O(log n)",
      space: "O(n)"
    },
    worst: {
      time: "O(log n)",
      space: "O(n)"
    }
  },
  stepByStep: [
    "Perform standard binary search tree insertion to place the new node at a leaf position.",
    "Retrace the path backwards from the inserted node to the root, updating each ancestor's height value.",
    "Calculate the balance factor for each node: balanceFactor = height(left) - height(right).",
    "If balance factor > 1 and new key was inserted into left child's left subtree (LL case), perform a Single Right Rotation.",
    "If balance factor < -1 and new key was inserted into right child's right subtree (RR case), perform a Single Left Rotation.",
    "If balance factor > 1 and new key was inserted into left child's right subtree (LR case), perform a Left Rotation on the child followed by a Right Rotation on the parent.",
    "If balance factor < -1 and new key was inserted into right child's left subtree (RL case), perform a Right Rotation on the child followed by a Left Rotation on the parent."
  ],
  workedExample: {
    headers: ["Action", "Inserted Key", "Unbalanced Node", "Rotation Type", "Root State"],
    rows: [
      ["Insert", "30", "None", "None", "[30] (BF: 0)"],
      ["Insert", "20", "None", "None", "[30] -> L:[20] (BF: 1)"],
      ["Insert", "10", "Node 30 (BF: 2)", "Right Rotation (LL)", "[20] -> L:[10], R:[30]"],
      ["Insert", "25", "None", "None", "[30] -> L:[25]"],
      ["Insert", "28", "Node 30 (BF: 2)", "Left-Right (LR)", "[20] balanced around [25]"]
    ]
  },
  tradeoffs: {
    use: [
      "Read-intensive lookup systems where search queries heavily outnumber inserts and deletions.",
      "Strict real-time applications requiring strict O(log n) worst-case access guarantees.",
      "In-memory indexes where worst-case linear degeneration of ordinary BSTs cannot be tolerated."
    ],
    avoid: [
      "Frequent write-heavy workloads where rotation rebalancing overhead becomes a bottleneck (Red-Black trees require fewer rotations on average).",
      "Simple memory-constrained systems where storing heights or balance factors per node creates unwanted memory overhead."
    ]
  },
  code: {
    python: `class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def get_height(self, node):
        return node.height if node else 0

    def get_balance(self, node):
        return self.get_height(node.left) - self.get_height(node.right) if node else 0

    def right_rotate(self, y):
        x = y.left
        t2 = x.right
        x.right = y
        y.left = t2
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        return x

    def left_rotate(self, x):
        y = x.right
        t2 = y.left
        y.left = x
        x.right = t2
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        return y

    def insert(self, root, key):
        if not root:
            return AVLNode(key)
        if key < root.key:
            root.left = self.insert(root.left, key)
        elif key > root.key:
            root.right = self.insert(root.right, key)
        else:
            return root

        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))
        balance = self.get_balance(root)

        if balance > 1 and key < root.left.key:
            return self.right_rotate(root)
        if balance < -1 and key > root.right.key:
            return self.left_rotate(root)
        if balance > 1 and key > root.left.key:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)
        if balance < -1 and key < root.right.key:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)
        return root`,
    javascript: `class AVLNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const t2 = x.right;
    x.right = y;
    y.left = t2;
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const t2 = y.left;
    y.left = x;
    x.right = t2;
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    return y;
  }

  insert(root, key) {
    if (!root) return new AVLNode(key);
    if (key < root.key) {
      root.left = this.insert(root.left, key);
    } else if (key > root.key) {
      root.right = this.insert(root.right, key);
    } else {
      return root;
    }

    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    const balance = this.getBalance(root);

    if (balance > 1 && key < root.left.key) {
      return this.rightRotate(root);
    }
    if (balance < -1 && key > root.right.key) {
      return this.leftRotate(root);
    }
    if (balance > 1 && key > root.left.key) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    }
    if (balance < -1 && key < root.right.key) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }
    return root;
  }
}`,
    java: `public class AVLTree {
    static class AVLNode {
        int key;
        AVLNode left;
        AVLNode right;
        int height;
        AVLNode(int key) {
            this.key = key;
            this.height = 1;
        }
    }

    private int height(AVLNode node) {
        return node == null ? 0 : node.height;
    }

    private int getBalance(AVLNode node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }

    private AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left;
        AVLNode t2 = x.right;
        x.right = y;
        y.left = t2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    private AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right;
        AVLNode t2 = y.left;
        y.left = x;
        x.right = t2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    public AVLNode insert(AVLNode node, int key) {
        if (node == null) return new AVLNode(key);
        if (key < node.key) {
            node.left = insert(node.left, key);
        } else if (key > node.key) {
            node.right = insert(node.right, key);
        } else {
            return node;
        }

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        if (balance > 1 && key < node.left.key) {
            return rightRotate(node);
        }
        if (balance < -1 && key > node.right.key) {
            return leftRotate(node);
        }
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }
}`,
    cpp: `#include <algorithm>

struct AVLNode {
    int key;
    AVLNode* left;
    AVLNode* right;
    int height;
    AVLNode(int k) : key(k), left(nullptr), right(nullptr), height(1) {}
};

class AVLTree {
    int height(AVLNode* n) {
        return n ? n->height : 0;
    }

    int getBalance(AVLNode* n) {
        return n ? height(n->left) - height(n->right) : 0;
    }

    AVLNode* rightRotate(AVLNode* y) {
        AVLNode* x = y->left;
        AVLNode* t2 = x->right;
        x->right = y;
        y->left = t2;
        y->height = std::max(height(y->left), height(y->right)) + 1;
        x->height = std::max(height(x->left), height(x->right)) + 1;
        return x;
    }

    AVLNode* leftRotate(AVLNode* x) {
        AVLNode* y = x->right;
        AVLNode* t2 = y->left;
        y->left = x;
        x->right = t2;
        x->height = std::max(height(x->left), height(x->right)) + 1;
        y->height = std::max(height(y->left), height(y->right)) + 1;
        return y;
    }

public:
    AVLNode* insert(AVLNode* node, int key) {
        if (!node) return new AVLNode(key);
        if (key < node->key) {
            node->left = insert(node->left, key);
        } else if (key > node->key) {
            node->right = insert(node->right, key);
        } else {
            return node;
        }

        node->height = 1 + std::max(height(node->left), height(node->right));
        int balance = getBalance(node);

        if (balance > 1 && key < node->left->key) return rightRotate(node);
        if (balance < -1 && key > node->right->key) return leftRotate(node);
        if (balance > 1 && key > node->left->key) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node->right->key) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }
        return node;
    }
};`,
    c: `#include <stdio.h>
#include <stdlib.h>

struct AVLNode {
    int key;
    struct AVLNode* left;
    struct AVLNode* right;
    int height;
};

int max(int a, int b) {
    return (a > b) ? a : b;
}

int height(struct AVLNode* n) {
    return n == NULL ? 0 : n->height;
}

struct AVLNode* createNode(int key) {
    struct AVLNode* node = (struct AVLNode*)malloc(sizeof(struct AVLNode));
    node->key = key;
    node->left = NULL;
    node->right = NULL;
    node->height = 1;
    return node;
}

int getBalance(struct AVLNode* n) {
    return n == NULL ? 0 : height(n->left) - height(n->right);
}

struct AVLNode* rightRotate(struct AVLNode* y) {
    struct AVLNode* x = y->left;
    struct AVLNode* t2 = x->right;
    x->right = y;
    y->left = t2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}

struct AVLNode* leftRotate(struct AVLNode* x) {
    struct AVLNode* y = x->right;
    struct AVLNode* t2 = y->left;
    y->left = x;
    x->right = t2;
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    return y;
}

struct AVLNode* insert(struct AVLNode* node, int key) {
    if (node == NULL) return createNode(key);
    if (key < node->key) {
        node->left = insert(node->left, key);
    } else if (key > node->key) {
        node->right = insert(node->right, key);
    } else {
        return node;
    }

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key) return rightRotate(node);
    if (balance < -1 && key > node->right->key) return leftRotate(node);
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
    return node;
}`
  },
  faq: [
    {
      q: "How does an AVL Tree differ from a Red-Black Tree?",
      a: "AVL trees are more strictly balanced than Red-Black trees (maximum height 1.44 log n vs 2 log n). As a result, AVL trees offer faster lookup speeds but require more frequent rotations during insertions and deletions."
    },
    {
      q: "What is the maximum number of rotations needed during an AVL insertion?",
      a: "At most two rotations (either a single rotation or a double rotation) are needed to restore balance after an insertion."
    }
  ]
};

