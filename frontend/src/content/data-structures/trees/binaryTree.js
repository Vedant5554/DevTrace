export const binaryTreeArticle = {
  introduction: [
    "A Binary Tree is a hierarchical data structure in which each node has at most two children, typically referred to as the left child and the right child. The topmost node is called the root, and nodes without children are known as leaf nodes. Binary trees provide a natural way to represent hierarchical relationships, arithmetic expressions, and decision processes.",
    "Unlike linear data structures such as arrays and linked lists, binary trees allow navigation along multiple branches. They form the foundational basis for specialized tree variants, including Binary Search Trees, AVL trees, and Heaps. Traversal algorithms such as in-order, pre-order, post-order, and level-order visit every node with a time complexity proportional to the number of nodes."
  ],
  complexity: {
    best: {
      time: "O(1)",
      space: "O(n)"
    },
    average: {
      time: "O(n)",
      space: "O(n)"
    },
    worst: {
      time: "O(n)",
      space: "O(n)"
    }
  },
  stepByStep: [
    "Create a root node storing the initial data value, with its left and right child pointers initialized to null.",
    "To insert a child node, locate the target parent node and attach the new node to either the left or right pointer.",
    "For tree traversal, use depth-first strategies (pre-order, in-order, post-order) via recursion or explicit stacks.",
    "Alternatively, use breadth-first (level-order) traversal using a queue to visit nodes layer by layer from top to bottom.",
    "To search for a value in an unconstrained binary tree, inspect the current node; if not equal, recursively search both left and right subtrees.",
    "To delete a node, replace it with a designated descendant (often the deepest node in level order) or restructure the pointers accordingly."
  ],
  workedExample: {
    headers: ["Operation", "Current Node", "Queue / Stack", "Result / State"],
    rows: [
      ["Insert 1", "Root", "-", "Tree: (1)"],
      ["Insert 2 as left child", "Node 1", "-", "Tree: (1) -> L:(2)"],
      ["Insert 3 as right child", "Node 1", "-", "Tree: (1) -> L:(2), R:(3)"],
      ["Level-order visit", "Node 1", "[2, 3]", "Visited: [1]"],
      ["Level-order visit", "Node 2", "[3]", "Visited: [1, 2]"],
      ["Level-order visit", "Node 3", "[]", "Visited: [1, 2, 3]"]
    ]
  },
  tradeoffs: {
    use: [
      "Representing naturally hierarchical data like file systems or nested organization charts.",
      "Parsing and evaluating syntax trees or mathematical expressions.",
      "Building specialized hierarchical search structures such as heaps and search trees."
    ],
    avoid: [
      "Simple sequential access where contiguous arrays offer better cache locality and O(1) random indexing.",
      "Scenarios requiring strict O(log n) search without balancing invariants (plain binary trees can degenerate into linear chains)."
    ]
  },
  code: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BinaryTree:
    def __init__(self):
        self.root = None

    def inorder(self, root):
        res = []
        def traverse(node):
            if not node:
                return
            traverse(node.left)
            res.append(node.val)
            traverse(node.right)
        traverse(root)
        return res

    def level_order(self, root):
        if not root:
            return []
        res, queue = [], [root]
        while queue:
            node = queue.pop(0)
            res.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return res`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  inorder(root) {
    const res = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      res.push(node.val);
      traverse(node.right);
    }
    traverse(root);
    return res;
  }

  levelOrder(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while (queue.length > 0) {
      const node = queue.shift();
      res.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return res;
  }
}`,
    java: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BinaryTree {
    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) {
            this.val = val;
        }
    }

    private TreeNode root;

    public List<Integer> inorder(TreeNode node) {
        List<Integer> res = new ArrayList<>();
        traverseInorder(node, res);
        return res;
    }

    private void traverseInorder(TreeNode node, List<Integer> res) {
        if (node == null) return;
        traverseInorder(node.left, res);
        res.add(node.val);
        traverseInorder(node.right, res);
    }

    public List<Integer> levelOrder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            res.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        return res;
    }
}`,
    cpp: `#include <vector>
#include <queue>

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BinaryTree {
public:
    void inorderHelper(TreeNode* node, std::vector<int>& res) {
        if (!node) return;
        inorderHelper(node->left, res);
        res.push_back(node->val);
        inorderHelper(node->right, res);
    }

    std::vector<int> inorder(TreeNode* root) {
        std::vector<int> res;
        inorderHelper(root, res);
        return res;
    }

    std::vector<int> levelOrder(TreeNode* root) {
        std::vector<int> res;
        if (!root) return res;
        std::queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            res.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        return res;
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

void inorder(struct TreeNode* root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->val);
    inorder(root->right);
}

void freeTree(struct TreeNode* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}`
  },
  faq: [
    {
      q: "What is the maximum number of nodes at depth d in a binary tree?",
      a: "At depth d (starting from root depth 0), the maximum number of nodes is 2^d. A full binary tree of height h has 2^(h+1) - 1 nodes."
    },
    {
      q: "What is the difference between full, complete, and perfect binary trees?",
      a: "A full binary tree has every node with 0 or 2 children. A complete binary tree is completely filled on all levels except possibly the last, where nodes are filled from left to right. A perfect binary tree is both full and complete with all leaves at the same depth."
    }
  ]
};

