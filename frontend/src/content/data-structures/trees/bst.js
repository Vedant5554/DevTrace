export const bstArticle = {
  introduction: [
    "A Binary Search Tree (BST) is a binary tree with an ordering invariant: for any given node, all values stored in its left subtree are strictly less than the node's value, and all values stored in its right subtree are strictly greater than the node's value. This structural rule ensures that an in-order traversal yields elements in monotonically increasing sorted order.",
    "Because each comparison eliminates an entire subtree, basic operations such as search, insertion, and deletion run in O(h) time, where h is the tree height. In balanced scenarios, this achieves O(log n) efficiency. However, without balancing mechanisms, sequential inserts can degrade the tree into a linear linked list of height O(n)."
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
      time: "O(n)",
      space: "O(n)"
    }
  },
  stepByStep: [
    "To search for a key, start at the root: if the target matches the current node, return it; if target is smaller, recurse left; if larger, recurse right.",
    "To insert a key, traverse the tree using search logic until a null reference is reached, then attach the new node at that empty slot.",
    "To delete a node with no children (leaf), disconnect it from its parent.",
    "To delete a node with one child, replace the node with its single child.",
    "To delete a node with two children, locate its in-order successor (the minimum node in its right subtree), copy its value to the node, and recursively delete the successor.",
    "Perform an in-order traversal (left, root, right) to retrieve all keys in sorted order."
  ],
  workedExample: {
    headers: ["Operation", "Key", "Comparisons", "Tree Structure"],
    rows: [
      ["Insert", "50", "Root is null", "[50]"],
      ["Insert", "30", "30 < 50 (left)", "[50] -> L:[30]"],
      ["Insert", "70", "70 > 50 (right)", "[50] -> L:[30], R:[70]"],
      ["Insert", "20", "20 < 50, 20 < 30 (left)", "[30] -> L:[20]"],
      ["Search", "70", "70 > 50 -> right match", "Found in 2 steps"],
      ["Delete", "30", "Has one child (20)", "[50] -> L:[20], R:[70]"]
    ]
  },
  tradeoffs: {
    use: [
      "Dynamic datasets requiring sorted order maintenance alongside fast searches and updates.",
      "Implementing associative maps and sets when range queries (finding keys between A and B) are needed.",
      "Scenarios where elements arrive with sufficient randomness to keep the tree reasonably balanced."
    ],
    avoid: [
      "Data arriving already sorted or reverse-sorted without auto-balancing (degrades to O(n) degenerate linked list).",
      "Cases where strict O(1) average lookup is required and range operations are irrelevant (prefer hash tables)."
    ]
  },
  code: {
    python: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, root, val):
        if not root:
            return TreeNode(val)
        if val < root.val:
            root.left = self.insert(root.left, val)
        elif val > root.val:
            root.right = self.insert(root.right, val)
        return root

    def search(self, root, val):
        if not root or root.val == val:
            return root
        if val < root.val:
            return self.search(root.left, val)
        return self.search(root.right, val)

    def find_min(self, node):
        curr = node
        while curr.left:
            curr = curr.left
        return curr

    def delete(self, root, val):
        if not root:
            return None
        if val < root.val:
            root.left = self.delete(root.left, val)
        elif val > root.val:
            root.right = self.delete(root.right, val)
        else:
            if not root.left:
                return root.right
            elif not root.right:
                return root.left
            temp = self.find_min(root.right)
            root.val = temp.val
            root.right = self.delete(root.right, temp.val)
        return root`,
    javascript: `class TreeNode {
  constructor(val = 0) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(root, val) {
    if (!root) return new TreeNode(val);
    if (val < root.val) {
      root.left = this.insert(root.left, val);
    } else if (val > root.val) {
      root.right = this.insert(root.right, val);
    }
    return root;
  }

  search(root, val) {
    if (!root || root.val === val) return root;
    if (val < root.val) return this.search(root.left, val);
    return this.search(root.right, val);
  }

  findMin(node) {
    let curr = node;
    while (curr.left) curr = curr.left;
    return curr;
  }

  delete(root, val) {
    if (!root) return null;
    if (val < root.val) {
      root.left = this.delete(root.left, val);
    } else if (val > root.val) {
      root.right = this.delete(root.right, val);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      const minNode = this.findMin(root.right);
      root.val = minNode.val;
      root.right = this.delete(root.right, minNode.val);
    }
    return root;
  }
}`,
    java: `public class BST {
    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) {
            this.val = val;
        }
    }

    private TreeNode root;

    public TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) {
            root.left = insert(root.left, val);
        } else if (val > root.val) {
            root.right = insert(root.right, val);
        }
        return root;
    }

    public TreeNode search(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        if (val < root.val) return search(root.left, val);
        return search(root.right, val);
    }

    private TreeNode findMin(TreeNode node) {
        TreeNode curr = node;
        while (curr.left != null) curr = curr.left;
        return curr;
    }

    public TreeNode delete(TreeNode root, int val) {
        if (root == null) return null;
        if (val < root.val) {
            root.left = delete(root.left, val);
        } else if (val > root.val) {
            root.right = delete(root.right, val);
        } else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode minNode = findMin(root.right);
            root.val = minNode.val;
            root.right = delete(root.right, minNode.val);
        }
        return root;
    }
}`,
    cpp: `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BST {
public:
    TreeNode* insert(TreeNode* root, int val) {
        if (!root) return new TreeNode(val);
        if (val < root->val) {
            root->left = insert(root->left, val);
        } else if (val > root->val) {
            root->right = insert(root->right, val);
        }
        return root;
    }

    TreeNode* search(TreeNode* root, int val) {
        if (!root || root->val == val) return root;
        if (val < root->val) return search(root->left, val);
        return search(root->right, val);
    }

    TreeNode* findMin(TreeNode* node) {
        TreeNode* curr = node;
        while (curr && curr->left) curr = curr->left;
        return curr;
    }

    TreeNode* remove(TreeNode* root, int val) {
        if (!root) return nullptr;
        if (val < root->val) {
            root->left = remove(root->left, val);
        } else if (val > root->val) {
            root->right = remove(root->right, val);
        } else {
            if (!root->left) {
                TreeNode* temp = root->right;
                delete root;
                return temp;
            } else if (!root->right) {
                TreeNode* temp = root->left;
                delete root;
                return temp;
            }
            TreeNode* minNode = findMin(root->right);
            root->val = minNode->val;
            root->right = remove(root->right, minNode->val);
        }
        return root;
    }
};`,
    c: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

struct TreeNode* insert(struct TreeNode* root, int val) {
    if (root == NULL) return createNode(val);
    if (val < root->val) {
        root->left = insert(root->left, val);
    } else if (val > root->val) {
        root->right = insert(root->right, val);
    }
    return root;
}

struct TreeNode* findMin(struct TreeNode* node) {
    struct TreeNode* curr = node;
    while (curr && curr->left != NULL) curr = curr->left;
    return curr;
}

struct TreeNode* deleteNode(struct TreeNode* root, int val) {
    if (root == NULL) return NULL;
    if (val < root->val) {
        root->left = deleteNode(root->left, val);
    } else if (val > root->val) {
        root->right = deleteNode(root->right, val);
    } else {
        if (root->left == NULL) {
            struct TreeNode* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct TreeNode* temp = root->left;
            free(root);
            return temp;
        }
        struct TreeNode* minNode = findMin(root->right);
        root->val = minNode->val;
        root->right = deleteNode(root->right, minNode->val);
    }
    return root;
}`
  },
  faq: [
    {
      q: "What causes a Binary Search Tree to degenerate into O(n) time?",
      a: "When items are inserted in sorted order (e.g. 1, 2, 3, 4, 5) or reverse sorted order, every new node becomes the single child of the previous one. This creates a linked list of height n, destroying logarithmic search speed."
    },
    {
      q: "How is BST degeneracy prevented in practice?",
      a: "Self-balancing binary search trees such as AVL trees or Red-Black trees perform rotation operations upon insertion and deletion to enforce strict logarithmic height guarantees."
    }
  ]
};

