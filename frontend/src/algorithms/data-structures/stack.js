import { createStep, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

export function stack(input) {
  // Input: list of operations or initial values to push/pop
  // e.g. [78, 50, 34, 23, 49, -49, -23, 60, 46, -46, 2]
  // positive = push(x), negative = pop()
  let ops = [];
  if (Array.isArray(input)) {
    ops = input;
  } else if (input && Array.isArray(input.operations)) {
    ops = input.operations;
  } else {
    ops = [78, 50, 34, 23, 49, -1, -1, 60, 46, -1, 2];
  }

  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const elements = [];
  const history = [];

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(
      createStep(
        type,
        line,
        note,
        {
          elements: [...elements],
          history: [...history],
          topIndex: elements.length > 0 ? elements.length - 1 : null,
          ...extra,
        },
        { metrics: createMetrics(comparisons, swaps, steps.length) }
      )
    );
  }

  addStep(EVENT_TYPES.MARK, 1, 'Initialize empty stack: stack = []', {});

  ops.forEach((op, opIdx) => {
    if (typeof op === 'number' && op >= 0) {
      // PUSH operation
      const val = op;
      history.push({ op: 'push', val });
      
      addStep(EVENT_TYPES.COMPARE, 2, `Preparing to push ${val} onto stack`, {
        action: { type: 'push', val, index: opIdx },
        pendingVal: val,
      });

      elements.push(val);
      swaps++;

      addStep(EVENT_TYPES.PUSH, 3, `push(${val}): Added ${val} to top of stack`, {
        action: { type: 'push', val, index: opIdx },
        justAdded: val,
      });
    } else {
      // POP operation
      if (elements.length > 0) {
        const leaving = elements[elements.length - 1];
        history.push({ op: 'pop', val: leaving });

        addStep(EVENT_TYPES.COMPARE, 4, `Preparing to pop top element ${leaving}`, {
          action: { type: 'pop', val: leaving, index: opIdx },
          leavingNow: leaving,
        });

        elements.pop();
        swaps++;

        addStep(EVENT_TYPES.POP, 5, `pop(): Removed ${leaving} from top of stack`, {
          action: { type: 'pop', val: leaving, index: opIdx },
          leavingNow: leaving,
        });
      }
    }
  });

  addStep(EVENT_TYPES.MARK, 1, 'Stack operations complete', {});

  return steps;
}

