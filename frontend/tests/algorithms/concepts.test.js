import { describe, it, expect } from 'vitest';
import { recursion } from '../../src/algorithms/concepts/recursion.js';

describe('Concepts Algorithms', () => {
  describe('recursion', () => {
    it('executes recursive sum(n) with call stack push and pop unwinding', () => {
      const steps = recursion([4]);
      expect(steps.length).toBeGreaterThan(0);
      const lastStep = steps[steps.length - 1];
      // sum(4) = 1 + 2 + 3 + 4 = 10
      expect(lastStep.type).toBe('mark');
      expect(lastStep.note).toContain('10');
      expect(lastStep.state.callStack.length).toBe(0); // completely unwound
    });

    it('clamps input values between 1 and 7', () => {
      const largeSteps = recursion([10]);
      expect(largeSteps[0].state.totalN).toBe(7);

      // Note: input[0] || 4 means 0 is treated as falsy and defaults to 4
      const zeroSteps = recursion([0]);
      expect(zeroSteps[0].state.totalN).toBe(4);
    });

    it('records base case when reaching n = 0', () => {
      const steps = recursion([3]);
      const baseCaseStep = steps.find(s => s.note.toLowerCase().includes('base case'));
      expect(baseCaseStep).toBeDefined();
    });

    it('produces push and pop events for call stack frames', () => {
      const steps = recursion([3]);
      const pushEvents = steps.filter(s => s.type === 'push');
      const popEvents = steps.filter(s => s.type === 'pop');
      expect(pushEvents.length).toBeGreaterThan(0);
      expect(popEvents.length).toBeGreaterThan(0);
    });
  });
});

