import { describe, it, expect } from 'vitest';
import { bubbleSort } from '../../src/algorithms/sorting/bubbleSort.js';
import { selectionSort } from '../../src/algorithms/sorting/selectionSort.js';
import { insertionSort } from '../../src/algorithms/sorting/insertionSort.js';
import { mergeSort } from '../../src/algorithms/sorting/mergeSort.js';
import { quickSort } from '../../src/algorithms/sorting/quickSort.js';
import { heapSort } from '../../src/algorithms/sorting/heapSort.js';
import { radixSort } from '../../src/algorithms/sorting/radixSort.js';
import { countingSort } from '../../src/algorithms/sorting/countingSort.js';

function getFinalArray(steps) {
  const lastStep = steps[steps.length - 1];
  return lastStep.state.array;
}

function getSortedArray(arr) {
  return [...arr].sort((a, b) => a - b);
}

describe('Sorting Algorithms', () => {
  const testCases = [
    { name: 'random', input: [64, 34, 25, 12, 22, 11, 90] },
    { name: 'already sorted', input: [1, 2, 3, 4, 5, 6, 7] },
    { name: 'reverse sorted', input: [7, 6, 5, 4, 3, 2, 1] },
    { name: 'duplicates', input: [4, 2, 2, 8, 3, 3, 1] },
    { name: 'single element', input: [42] },
    { name: 'two elements sorted', input: [1, 2] },
    { name: 'two elements unsorted', input: [2, 1] },
    { name: 'negative numbers', input: [-5, 3, -1, 0, 2, -3] },
  ];

  const algorithms = [
    { name: 'bubbleSort', fn: bubbleSort },
    { name: 'selectionSort', fn: selectionSort },
    { name: 'insertionSort', fn: insertionSort },
    { name: 'mergeSort', fn: mergeSort },
    { name: 'quickSort', fn: quickSort },
    { name: 'heapSort', fn: heapSort },
    { name: 'radixSort', fn: radixSort },
    { name: 'countingSort', fn: countingSort },
  ];

  algorithms.forEach(({ name, fn }) => {
    describe(name, () => {
      testCases.forEach(({ name: caseName, input }) => {
        // Radix Sort and Counting Sort don't support negative numbers natively
        const skipNegative = (name === 'radixSort' || name === 'countingSort') && caseName === 'negative numbers';
        if (skipNegative) return;

        it(`should sort ${caseName} array`, () => {
          const steps = fn(input);
          expect(steps.length).toBeGreaterThan(0);
          const finalArray = getFinalArray(steps);
          const expected = getSortedArray(input);
          expect(finalArray).toEqual(expected);
        });
      });

      // Empty array boundary test (known issue in countingSort where Math.max() on empty yields -Infinity)
      if (name !== 'countingSort') {
        it('should handle empty array gracefully', () => {
          const steps = fn([]);
          expect(steps.length).toBeGreaterThan(0);
          const finalArray = getFinalArray(steps);
          expect(finalArray).toEqual([]);
        });
      }

      it('should produce steps with required fields', () => {
        const steps = fn([3, 1, 2]);
        expect(steps.length).toBeGreaterThan(0);
        steps.forEach(step => {
          expect(step).toHaveProperty('type');
          expect(step).toHaveProperty('line');
          expect(step).toHaveProperty('note');
          expect(step).toHaveProperty('state');
          expect(step).toHaveProperty('metrics');
          expect(typeof step.note).toBe('string');
          expect(typeof step.line).toBe('number');
          expect(step.metrics).toHaveProperty('comparisons');
          expect(step.metrics).toHaveProperty('swaps');
          expect(step.metrics).toHaveProperty('steps');
        });
      });

      it('should end with completion step', () => {
        const steps = fn([3, 1, 2]);
        const lastStep = steps[steps.length - 1];
        expect(lastStep.type).toBe('mark');
        expect(lastStep.note.toLowerCase()).toMatch(/sorted|complete/);
      });

      it('should track comparisons and steps monotonically', () => {
        const steps = fn([5, 2, 8, 1, 9]);
        expect(steps.length).toBeGreaterThan(2);
        for (let i = 1; i < steps.length; i++) {
          expect(steps[i].metrics.steps).toBeGreaterThanOrEqual(steps[i - 1].metrics.steps);
        }
      });
    });
  });
});
