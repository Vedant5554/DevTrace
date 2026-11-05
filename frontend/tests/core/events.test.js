import { describe, it, expect } from 'vitest';
import {
  EVENT_TYPES,
  TRACE_LIMIT,
  TraceLimitError,
  createStep,
  cloneState,
  createMetrics,
} from '../../src/core/events.js';

describe('events module', () => {
  it('defines all 10 core EVENT_TYPES constants', () => {
    expect(EVENT_TYPES.COMPARE).toBe('compare');
    expect(EVENT_TYPES.SWAP).toBe('swap');
    expect(EVENT_TYPES.SET).toBe('set');
    expect(EVENT_TYPES.MARK).toBe('mark');
    expect(EVENT_TYPES.VISIT).toBe('visit');
    expect(EVENT_TYPES.PUSH).toBe('push');
    expect(EVENT_TYPES.POP).toBe('pop');
    expect(EVENT_TYPES.RELAX).toBe('relax');
    expect(EVENT_TYPES.LINK).toBe('link');
    expect(EVENT_TYPES.UNLINK).toBe('unlink');
  });

  it('defines TRACE_LIMIT as 20000', () => {
    expect(TRACE_LIMIT).toBe(20000);
  });

  it('instantiates TraceLimitError with standard message and name', () => {
    const error = new TraceLimitError();
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('TraceLimitError');
    expect(error.message).toContain('20,000');
  });

  it('creates valid step object with deep cloned state and metrics', () => {
    const rawState = { array: [1, 2, 3], highlights: { compare: [0, 1] } };
    const step = createStep(EVENT_TYPES.COMPARE, 5, 'Comparing elements', rawState);

    expect(step.type).toBe('compare');
    expect(step.line).toBe(5);
    expect(step.note).toBe('Comparing elements');
    expect(step.state).toEqual(rawState);
    expect(step.metrics).toEqual({ comparisons: 0, swaps: 0, steps: 0 });

    // Ensure state is isolated (deep cloned)
    rawState.array[0] = 999;
    expect(step.state.array[0]).toBe(1);
  });

  it('throws Error on unknown event type', () => {
    expect(() => createStep('invalid_type', 1, 'note', {})).toThrow(/Invalid event type/);
  });

  it('creates metrics object with default and custom values', () => {
    expect(createMetrics()).toEqual({ comparisons: 0, swaps: 0, steps: 0 });
    expect(createMetrics(10, 5, 20)).toEqual({ comparisons: 10, swaps: 5, steps: 20 });
  });

  it('deep clones state objects independently', () => {
    const original = { a: [1, 2], b: { c: 'test' } };
    const clone = cloneState(original);
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
    clone.b.c = 'modified';
    expect(original.b.c).toBe('test');
  });
});

