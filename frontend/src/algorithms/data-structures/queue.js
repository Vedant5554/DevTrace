import { createStep, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

export function queue(input) {
  // Input: list of operations or initial values to enqueue/dequeue
  // positive = enqueue(x), negative = dequeue()
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
          frontIndex: elements.length > 0 ? 0 : null,
          rearIndex: elements.length > 0 ? elements.length - 1 : null,
          ...extra,
        },
        { metrics: createMetrics(comparisons, swaps, steps.length) }
      )
    );
  }

  addStep(EVENT_TYPES.MARK, 2, 'Initialize empty queue: queue = deque()', {});

  ops.forEach((op, opIdx) => {
    if (typeof op === 'number' && op >= 0) {
      // ENQUEUE operation
      const val = op;
      history.push({ op: 'enqueue', val });

      addStep(EVENT_TYPES.COMPARE, 3, `Preparing to enqueue ${val} at rear`, {
        action: { type: 'enqueue', val, index: opIdx },
        pendingVal: val,
      });

      elements.push(val);
      swaps++;

      addStep(EVENT_TYPES.PUSH, 4, `enqueue(${val}): Added ${val} to rear of queue`, {
        action: { type: 'enqueue', val, index: opIdx },
        justAdded: val,
      });
    } else {
      // DEQUEUE operation
      if (elements.length > 0) {
        const leaving = elements[0];
        history.push({ op: 'dequeue', val: leaving });

        addStep(EVENT_TYPES.COMPARE, 5, `Preparing to dequeue front element ${leaving}`, {
          action: { type: 'dequeue', val: leaving, index: opIdx },
          leavingNow: leaving,
        });

        elements.shift();
        swaps++;

        addStep(EVENT_TYPES.POP, 6, `dequeue(): Removed ${leaving} from front of queue`, {
          action: { type: 'dequeue', val: leaving, index: opIdx },
          leavingNow: leaving,
        });
      }
    }
  });

  addStep(EVENT_TYPES.MARK, 2, 'Queue operations complete', {});

  return steps;
}

