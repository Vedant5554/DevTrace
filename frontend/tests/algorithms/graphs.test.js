import { describe, it, expect } from 'vitest';
import { bfs } from '../../src/algorithms/graphs/bfs.js';
import { dfs } from '../../src/algorithms/graphs/dfs.js';
import { dijkstra } from '../../src/algorithms/graphs/dijkstra.js';
import { bellmanFord } from '../../src/algorithms/graphs/bellmanFord.js';
import { topologicalSort } from '../../src/algorithms/graphs/topologicalSort.js';
import { kruskal } from '../../src/algorithms/graphs/kruskal.js';
import { prim } from '../../src/algorithms/graphs/prim.js';

describe('Graph Algorithms', () => {
  const standardEdges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4]
  ];

  const weightedEdges = [
    [0, 1, 4], [0, 2, 2], [1, 2, 1], [1, 3, 5], [2, 3, 8], [2, 4, 10], [3, 4, 2]
  ];

  describe('bfs', () => {
    it('traverses connected graph completely from start node', () => {
      const steps = bfs({ edges: standardEdges, start: 0, nodeCount: 5 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.visited.length).toBe(5);
      expect(lastStep.type).toBe('mark');
    });

    it('handles disconnected graph visiting only reachable component', () => {
      const disconnectedEdges = [[0, 1], [1, 2]]; // nodes 3, 4 disconnected
      const steps = bfs({ edges: disconnectedEdges, start: 0, nodeCount: 5 });
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.visited).toContain(0);
      expect(lastStep.state.visited).toContain(1);
      expect(lastStep.state.visited).toContain(2);
      expect(lastStep.state.visited).not.toContain(3);
      expect(lastStep.state.visited).not.toContain(4);
    });

    it('handles single node graph with no edges', () => {
      const steps = bfs({ edges: [], start: 0, nodeCount: 1 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.visited).toEqual([0]);
    });
  });

  describe('dfs', () => {
    it('traverses connected graph deeply from start node', () => {
      const steps = dfs({ edges: standardEdges, start: 0, nodeCount: 5 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.visited.length).toBe(5);
    });

    it('handles cycles without infinite loop', () => {
      const cycleEdges = [[0, 1], [1, 2], [2, 0], [2, 3]];
      const steps = dfs({ edges: cycleEdges, start: 0, nodeCount: 4 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.visited.length).toBe(4);
    });

    it('handles disconnected components', () => {
      const steps = dfs({ edges: [[0, 1]], start: 0, nodeCount: 4 });
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.visited).toEqual(expect.arrayContaining([0, 1]));
      expect(lastStep.state.visited).not.toContain(2);
    });
  });

  describe('dijkstra', () => {
    it('computes shortest path distances correctly', () => {
      const steps = dijkstra({ edges: weightedEdges, start: 0, nodeCount: 5 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const nodes = lastStep.state.nodes;
      expect(nodes[0].distance).toBe(0);
      expect(nodes[1].distance).toBe(3); // 0->2(2) + 2->1(1) = 3
      expect(nodes[2].distance).toBe(2);
      expect(nodes[3].distance).toBe(8); // 3 + 5 = 8
      expect(nodes[4].distance).toBe(10); // 8 + 2 = 10
    });

    it('handles unreachable nodes leaving distance as null (serialized Infinity)', () => {
      const disconnected = [[0, 1, 3]];
      const steps = dijkstra({ edges: disconnected, start: 0, nodeCount: 4 });
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.nodes[0].distance).toBe(0);
      expect(lastStep.state.nodes[1].distance).toBe(3);
      // Infinity is serialized as null via JSON.stringify in cloneState
      expect(lastStep.state.nodes[2].distance).toBeNull();
      expect(lastStep.state.nodes[3].distance).toBeNull();
    });
  });

  describe('bellmanFord', () => {
    it('computes shortest paths with positive and negative weights', () => {
      const edges = [
        [0, 1, 4],
        [0, 2, 5],
        [1, 2, -2],
        [2, 3, 3]
      ];
      const steps = bellmanFord({ edges, start: 0, nodeCount: 4 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const nodes = lastStep.state.nodes;
      expect(nodes[0].distance).toBe(0);
      expect(nodes[1].distance).toBe(4);
      expect(nodes[2].distance).toBe(2); // 4 + (-2) = 2
      expect(nodes[3].distance).toBe(5); // 2 + 3 = 5
      expect(lastStep.note).not.toContain('Negative weight cycle detected');
    });

    it('detects negative weight cycles', () => {
      const negCycleEdges = [
        [0, 1, 1],
        [1, 2, -3],
        [2, 0, 1]
      ];
      const steps = bellmanFord({ edges: negCycleEdges, start: 0, nodeCount: 3 });
      const lastStep = steps[steps.length - 1];
      expect(lastStep.note).toContain('Negative weight cycle detected!');
      expect(lastStep.type).toBe('mark');
    });
  });

  describe('topologicalSort', () => {
    it('generates valid topological order for a DAG', () => {
      // 0 -> 1 -> 3, 0 -> 2 -> 3
      const dagEdges = [[0, 1], [0, 2], [1, 3], [2, 3]];
      const steps = topologicalSort({ edges: dagEdges, nodeCount: 4 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      const order = lastStep.state.result;
      expect(order.length).toBe(4);
      expect(order.indexOf(0)).toBeLessThan(order.indexOf(1));
      expect(order.indexOf(0)).toBeLessThan(order.indexOf(2));
      expect(order.indexOf(1)).toBeLessThan(order.indexOf(3));
      expect(order.indexOf(2)).toBeLessThan(order.indexOf(3));
    });

    it('handles cycle by noting incomplete topological ordering', () => {
      const cyclicEdges = [[0, 1], [1, 2], [2, 0]];
      const steps = topologicalSort({ edges: cyclicEdges, nodeCount: 3 });
      const lastStep = steps[steps.length - 1];
      expect(lastStep.note).toContain('cycle');
    });
  });

  describe('kruskal', () => {
    it('constructs correct Minimum Spanning Tree', () => {
      const edges = [
        [0, 1, 1], [1, 2, 2], [0, 2, 3], [1, 3, 4], [2, 3, 5]
      ];
      const steps = kruskal({ edges, nodeCount: 4 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.mst.length).toBe(3); // n - 1 edges
      const totalWeight = lastStep.state.mst.reduce((sum, e) => sum + e[2], 0);
      expect(totalWeight).toBe(1 + 2 + 4); // 7
    });

    it('handles already minimal tree', () => {
      const treeEdges = [[0, 1, 2], [1, 2, 3]];
      const steps = kruskal({ edges: treeEdges, nodeCount: 3 });
      const lastStep = steps[steps.length - 1];
      expect(lastStep.state.mst.length).toBe(2);
    });
  });

  describe('prim', () => {
    it('initializes MST from start node and completes traversal', () => {
      const edges = [
        [0, 1, 1], [1, 2, 2], [0, 2, 3], [1, 3, 4], [2, 3, 5]
      ];
      const steps = prim({ edges, start: 0, nodeCount: 4 });
      expect(steps.length).toBeGreaterThan(0);
      const initStep = steps[0];
      expect(initStep.note).toContain('Initialize');
      expect(initStep.state.inMST).toContain(0);
    });

    it('handles disconnected graph by producing only init and completion steps', () => {
      const disconnected = [[0, 1, 2]]; // nodes 2, 3 disconnected
      const steps = prim({ edges: disconnected, start: 0, nodeCount: 4 });
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.note).toContain('complete');
    });
  });
});

