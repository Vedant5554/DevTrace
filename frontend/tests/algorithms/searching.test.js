import { describe, it, expect } from 'vitest';
import { binarySearch } from '../../src/algorithms/searching/binarySearch.js';
import { linearSearch } from '../../src/algorithms/searching/linearSearch.js';

describe('Searching Algorithms', () => {
  const sortedArr = [4, 6, 11, 15, 23, 35, 50, 51, 56, 58, 59, 79, 96, 98];

  describe('binarySearch', () => {
    it('finds target when present in middle of array', () => {
      const steps = binarySearch({ array: sortedArr, target: 56 });
      expect(steps.length).toBeGreaterThan(0);
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.target).toBe(56);
      expect(foundStep.state.mid).toBe(8);
      expect(foundStep.state.array[foundStep.state.mid]).toBe(56);
    });

    it('finds target at the first index (boundary 0)', () => {
      const steps = binarySearch({ array: sortedArr, target: 4 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.mid).toBe(0);
    });

    it('finds target at the last index (boundary n-1)', () => {
      const steps = binarySearch({ array: sortedArr, target: 98 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.mid).toBe(sortedArr.length - 1);
    });

    it('reports not-found when target is smaller than all elements', () => {
      const steps = binarySearch({ array: sortedArr, target: 1 });
      const notFoundStep = steps.find(s => s.state.status === 'not-found');
      expect(notFoundStep).toBeDefined();
      expect(steps[steps.length - 1].state.status).toBe('not-found');
    });

    it('reports not-found when target is larger than all elements', () => {
      const steps = binarySearch({ array: sortedArr, target: 150 });
      const notFoundStep = steps.find(s => s.state.status === 'not-found');
      expect(notFoundStep).toBeDefined();
    });

    it('reports not-found when target falls in between existing elements', () => {
      const steps = binarySearch({ array: sortedArr, target: 20 });
      const notFoundStep = steps.find(s => s.state.status === 'not-found');
      expect(notFoundStep).toBeDefined();
    });

    it('handles single-element array where element matches target', () => {
      const steps = binarySearch({ array: [42], target: 42 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.mid).toBe(0);
    });

    it('handles single-element array where element does not match target', () => {
      const steps = binarySearch({ array: [42], target: 99 });
      const notFoundStep = steps.find(s => s.state.status === 'not-found');
      expect(notFoundStep).toBeDefined();
    });

    it('handles empty array without throwing', () => {
      const steps = binarySearch({ array: [], target: 10 });
      expect(steps.length).toBeGreaterThan(0);
      const notFoundStep = steps.find(s => s.state.status === 'not-found');
      expect(notFoundStep).toBeDefined();
    });

    it('handles raw array input defaulting target', () => {
      const steps = binarySearch([10, 20, 30, 40, 50]);
      expect(steps.length).toBeGreaterThan(0);
      expect(steps[0]).toHaveProperty('state');
    });

    it('handles negative numbers in sorted order', () => {
      const negArr = [-50, -25, -10, 0, 15, 30];
      const steps = binarySearch({ array: negArr, target: -25 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.mid).toBe(1);
    });

    it('tracks comparisons and narrows lo/hi window in steps', () => {
      const steps = binarySearch({ array: sortedArr, target: 51 });
      const compareSteps = steps.filter(s => s.type === 'compare');
      expect(compareSteps.length).toBeGreaterThan(0);
      compareSteps.forEach(s => {
        expect(s.state.lo).toBeLessThanOrEqual(s.state.hi);
        expect(s.metrics.comparisons).toBeGreaterThan(0);
      });
    });
  });

  describe('linearSearch', () => {
    it('finds target when present in array', () => {
      const steps = linearSearch({ array: sortedArr, target: 59 });
      expect(steps.length).toBeGreaterThan(0);
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.target).toBe(59);
      expect(foundStep.state.currentIdx).toBe(10);
    });

    it('finds target at the first index (index 0)', () => {
      const steps = linearSearch({ array: sortedArr, target: 4 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.currentIdx).toBe(0);
    });

    it('finds target at the last index (index n-1)', () => {
      const steps = linearSearch({ array: sortedArr, target: 98 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.currentIdx).toBe(sortedArr.length - 1);
    });

    it('reports not-found when target is missing', () => {
      const steps = linearSearch({ array: sortedArr, target: 999 });
      const notFoundStep = steps.find(s => s.state.status === 'not-found');
      expect(notFoundStep).toBeDefined();
    });

    it('handles unsorted array with duplicates, finding first occurrence', () => {
      const unsorted = [15, 3, 7, 3, 9, 3];
      const steps = linearSearch({ array: unsorted, target: 3 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.currentIdx).toBe(1);
    });

    it('handles single-element array match and mismatch', () => {
      const matchSteps = linearSearch({ array: [17], target: 17 });
      expect(matchSteps.find(s => s.state.status === 'found')).toBeDefined();

      const missSteps = linearSearch({ array: [17], target: 20 });
      expect(missSteps.find(s => s.state.status === 'not-found')).toBeDefined();
    });

    it('handles empty array without throwing', () => {
      const steps = linearSearch({ array: [], target: 5 });
      expect(steps.length).toBeGreaterThan(0);
      const notFoundStep = steps.find(s => s.state.status === 'not-found');
      expect(notFoundStep).toBeDefined();
    });

    it('handles negative numbers', () => {
      const negArr = [5, -12, 8, -3, 0];
      const steps = linearSearch({ array: negArr, target: -12 });
      const foundStep = steps.find(s => s.state.status === 'found');
      expect(foundStep).toBeDefined();
      expect(foundStep.state.currentIdx).toBe(1);
    });

    it('increments comparisons for each checked index', () => {
      const steps = linearSearch({ array: [1, 2, 3, 4, 5], target: 4 });
      const finalStep = steps[steps.length - 1];
      expect(finalStep.metrics.comparisons).toBe(4);
    });
  });
});
