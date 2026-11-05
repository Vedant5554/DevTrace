import { describe, it, expect } from 'vitest';
import {
  generateRandomInput,
  formatInputToString,
  parseInputFromString,
  resizeInput,
  DEFAULT_INPUTS,
  SIZE_LIMITS
} from '../../src/core/inputs.js';

const ALL_27_ALGORITHMS = [
  'bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort',
  'quick-sort', 'heap-sort', 'radix-sort', 'counting-sort',
  'linear-search', 'binary-search',
  'recursion',
  'linked-list', 'doubly-linked-list', 'hash-table', 'hash-map',
  'binary-tree', 'bst', 'avl-tree', 'heap', 'trie',
  'dfs', 'bfs', 'topological-sort', 'dijkstra', 'bellman-ford', 'kruskal', 'prim'
];

describe('inputs module', () => {
  it('contains all 27 algorithms in default inputs', () => {
    expect(ALL_27_ALGORITHMS.length).toBe(27);
    ALL_27_ALGORITHMS.forEach(id => {
      expect(DEFAULT_INPUTS[id]).toBeDefined();
    });
  });

  it('defines valid SIZE_LIMITS for all sections', () => {
    const sections = ['sorting', 'data-structures', 'graphs', 'searching', 'concepts'];
    sections.forEach(sec => {
      expect(SIZE_LIMITS[sec]).toBeDefined();
      expect(SIZE_LIMITS[sec].min).toBeLessThanOrEqual(SIZE_LIMITS[sec].max);
      expect(SIZE_LIMITS[sec].default).toBeGreaterThanOrEqual(SIZE_LIMITS[sec].min);
      expect(SIZE_LIMITS[sec].default).toBeLessThanOrEqual(SIZE_LIMITS[sec].max);
    });
  });

  it('generates random inputs for all 27 algorithms with specified size', () => {
    ALL_27_ALGORITHMS.forEach(id => {
      const input = generateRandomInput(id, 6);
      expect(input).toBeDefined();
    });
  });

  it('formats and parses custom text inputs for number arrays', () => {
    const text = '12, 45, 8, 23, 67';
    const parsed = parseInputFromString('bubble-sort', text);
    expect(parsed).toEqual([12, 45, 8, 23, 67]);
    expect(formatInputToString('bubble-sort', parsed)).toBe('12, 45, 8, 23, 67');
  });

  it('sorts custom input for binary search automatically', () => {
    const text = '50, 10, 30, 20';
    const parsed = parseInputFromString('binary-search', text);
    expect(parsed).toEqual([10, 20, 30, 50]);
  });

  it('parses search format with target specification', () => {
    const parsed = parseInputFromString('linear-search', '1, 2, 3, 4 | 3');
    expect(parsed).toBeDefined();
    if (typeof parsed === 'object' && !Array.isArray(parsed)) {
      expect(parsed.array).toEqual([1, 2, 3, 4]);
      expect(parsed.target).toBe(3);
    }
  });

  it('parses custom words for trie', () => {
    const text = 'cat, car, card, dog';
    const parsed = parseInputFromString('trie', text);
    expect(parsed).toEqual(['cat', 'car', 'card', 'dog']);
  });

  it('parses single number for recursion clamped between limits', () => {
    const parsed = parseInputFromString('recursion', '5');
    expect(parsed).toEqual([5]);

    const clampedLarge = parseInputFromString('recursion', '99');
    expect(clampedLarge[0]).toBeLessThanOrEqual(7);

    const clampedSmall = parseInputFromString('recursion', '0');
    expect(clampedSmall[0]).toBeGreaterThanOrEqual(1);
  });

  it('parses graph edge list correctly', () => {
    const text = '0-1, 0-2, 1-3, 2-3';
    const parsed = parseInputFromString('dfs', text);
    expect(parsed).toBeDefined();
    expect(parsed.nodeCount).toBe(4);
    expect(parsed.edges.length).toBe(4);
  });

  it('parses weighted graph edges correctly', () => {
    const text = '0-1:4, 1-2:3, 2-0:7';
    const parsed = parseInputFromString('dijkstra', text);
    expect(parsed).toBeDefined();
    expect(parsed.nodeCount).toBe(3);
    expect(parsed.edges.length).toBe(3);
  });

  it('returns null on completely invalid number array strings', () => {
    const parsed = parseInputFromString('bubble-sort', 'invalid, not, numbers');
    expect(parsed).toBeNull();
  });

  it('returns null on empty or whitespace strings', () => {
    expect(parseInputFromString('bubble-sort', '')).toBeNull();
    expect(parseInputFromString('bubble-sort', '   ')).toBeNull();
  });

  it('resizes arrays preserving existing items on expansion and truncation', () => {
    const initial = [10, 20, 30];
    const expanded = resizeInput('bubble-sort', initial, 5);
    expect(expanded.length).toBe(5);
    expect(expanded.slice(0, 3)).toEqual([10, 20, 30]);

    const truncated = resizeInput('bubble-sort', expanded, 2);
    expect(truncated).toEqual([10, 20]);
  });

  it('resizes graph inputs updating nodeCount and trimming edges', () => {
    const graph = {
      nodeCount: 5,
      edges: [[0, 1, 2], [1, 2, 3], [3, 4, 1]],
    };
    const resized = resizeInput('dijkstra', graph, 3);
    expect(resized.nodeCount).toBe(3);
    resized.edges.forEach(([u, v]) => {
      expect(u).toBeLessThan(3);
      expect(v).toBeLessThan(3);
    });
  });
});
