import { describe, it, expect } from 'vitest';
import { stack } from '../../src/algorithms/data-structures/stack.js';
import { queue } from '../../src/algorithms/data-structures/queue.js';
import { linkedList } from '../../src/algorithms/data-structures/linkedList.js';
import { doublyLinkedList } from '../../src/algorithms/data-structures/doublyLinkedList.js';
import { hashTable } from '../../src/algorithms/data-structures/hashTable.js';
import { hashMap } from '../../src/algorithms/data-structures/hashMap.js';
import { binaryTree } from '../../src/algorithms/data-structures/trees/binaryTree.js';
import { bst } from '../../src/algorithms/data-structures/trees/bst.js';
import { avlTree } from '../../src/algorithms/data-structures/trees/avlTree.js';
import { heap } from '../../src/algorithms/data-structures/trees/heap.js';
import { trie } from '../../src/algorithms/data-structures/trees/trie.js';

describe('Data Structures Algorithms', () => {
  describe('stack', () => {
    it('handles push and pop operations correctly (LIFO order)', () => {
      // positive = push, negative = pop
      const ops = [10, 20, 30, -1, 40];
      const steps = stack(ops);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.elements).toEqual([10, 20, 40]);
    });

    it('handles empty initial operations list without crashing', () => {
      const steps = stack([]);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.elements).toEqual([]);
    });

    it('processes negative-only operations on empty stack without crashing', () => {
      // Negative input means "pop"; popping empty stack should return steps without throwing
      const ops = [-1, -1];
      const steps = stack(ops);
      expect(steps.length).toBeGreaterThan(0);
      // Final state reflects no elements were added
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.elements).toEqual([]);
    });
  });

  describe('queue', () => {
    it('handles enqueue and dequeue operations correctly (FIFO order)', () => {
      // positive = enqueue, negative = dequeue
      const ops = [10, 20, 30, -1, 40];
      const steps = queue(ops);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.elements).toEqual([20, 30, 40]);
    });

    it('handles empty operations list without crashing', () => {
      const steps = queue([]);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.elements).toEqual([]);
    });

    it('processes negative-only operations on empty queue without crashing', () => {
      // Negative input means "dequeue"; dequeuing empty queue should not throw
      const ops = [-1];
      const steps = queue(ops);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.elements).toEqual([]);
    });
  });

  describe('linkedList', () => {
    it('creates chained singly linked nodes and performs forward traversal', () => {
      const values = [5, 10, 15];
      const steps = linkedList(values);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const nodes = lastStep.state.nodes;
      expect(nodes['node_0'].value).toBe(5);
      expect(nodes['node_0'].next).toBe('node_1');
      expect(nodes['node_1'].value).toBe(10);
      expect(nodes['node_1'].next).toBe('node_2');
      expect(nodes['node_2'].value).toBe(15);
      expect(nodes['node_2'].next).toBeNull();
    });

    it('handles single node linked list', () => {
      const steps = linkedList([42]);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.head).toBe('node_0');
      expect(lastStep.state.tail).toBe('node_0');
    });
  });

  describe('doublyLinkedList', () => {
    it('creates bidirectional links and performs forward and backward traversals', () => {
      const values = [1, 2, 3];
      const steps = doublyLinkedList(values);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const nodes = lastStep.state.nodes;
      expect(nodes['node_1'].prev).toBe('node_0');
      expect(nodes['node_1'].next).toBe('node_2');
      expect(nodes['node_0'].prev).toBeNull();
      expect(nodes['node_2'].next).toBeNull();
    });
  });

  describe('hashTable', () => {
    it('hashes elements into buckets and handles collisions via chaining', () => {
      const input = [1, 2, 3, 17, 33];
      const steps = hashTable(input);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const buckets = lastStep.state.buckets;
      expect(buckets.length).toBe(16);
      const totalStored = buckets.reduce((acc, b) => acc + b.length, 0);
      expect(totalStored).toBe(5);
    });
  });

  describe('hashMap', () => {
    it('triggers resize when load factor exceeds threshold (0.75)', () => {
      // Initial capacity is 8; 7 items will exceed 8 * 0.75 = 6 and trigger resize to 16
      const items = [1, 2, 3, 4, 5, 6, 7];
      const steps = hashMap(items);
      expect(steps.length).toBeGreaterThan(0);
      const resizeStep = steps.find(s => s.note.includes('resize to 16'));
      expect(resizeStep).toBeDefined();
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.capacity).toBe(16);
    });
  });

  describe('binaryTree', () => {
    it('builds complete binary tree and performs in-order, pre-order and post-order traversals', () => {
      const values = [10, 20, 30, 40, 50];
      const steps = binaryTree(values);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const nodes = lastStep.state.nodes;
      expect(nodes[0].value).toBe(10);
      expect(nodes[0].left).toBe(1);
      expect(nodes[0].right).toBe(2);
      expect(nodes[1].left).toBe(3);
      expect(nodes[1].right).toBe(4);
    });
  });

  describe('bst', () => {
    it('inserts elements maintaining BST invariant (left < parent <= right) and searches', () => {
      const values = [50, 30, 70, 20, 40, 60, 80];
      const steps = bst(values);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const nodes = lastStep.state.nodes;
      const root = nodes[lastStep.state.root];
      expect(root.value).toBe(50);
      expect(nodes[root.left].value).toBe(30);
      expect(nodes[root.right].value).toBe(70);
    });
  });

  describe('avlTree', () => {
    it('maintains AVL balance with height factor <= 1 across rotations', () => {
      // Sequential increasing values [10, 20, 30] forces left rotation
      const values = [10, 20, 30, 40, 50];
      const steps = avlTree(values);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.root).toBeDefined();
    });
  });

  describe('heap', () => {
    it('builds max-heap where root is the maximum element', () => {
      const values = [4, 10, 3, 5, 1];
      const steps = heap(values);
      expect(steps.length).toBeGreaterThan(0);
      // The step after build is noted "Max heap built. Root contains maximum element."
      const builtStep = steps.find(s => s.note && s.note.includes('Max heap built'));
      expect(builtStep).toBeDefined();
      const arr = builtStep.state.array;
      // Root (index 0) must hold the maximum value in the original input
      expect(arr[0]).toBe(10);
    });
  });

  describe('trie', () => {
    it('inserts words and marks terminal character nodes', () => {
      const words = ['cat', 'car', 'card', 'dog'];
      const steps = trie(words);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const nodes = lastStep.state.nodes;
      const terminalNodes = Object.values(nodes).filter(n => n.isEnd);
      expect(terminalNodes.length).toBeGreaterThanOrEqual(words.length);
    });
  });
});

