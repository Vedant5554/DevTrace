import { createStep, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../core/events.js';

function recursion(input) {
  const n = Math.max(1, Math.min(7, Array.isArray(input) ? (input[0] || 4) : 4));
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const callStack = [];
  const results = {};
  const returns = []; // records all resolved return steps: { fromK, toK, expr, result }

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(
      type,
      line,
      note,
      {
        fnName: 'sum',
        totalN: n,
        callStack: [...callStack],
        results: { ...results },
        returns: [...returns],
        highlights: {},
        ...extra
      },
      { metrics: createMetrics(comparisons, swaps, steps.length) }
    ));
  }

  // Step 0: Initial call setup
  addStep(
    EVENT_TYPES.MARK,
    0,
    `Initialize recursive sum(n = ${n}): compute 1 + 2 + ... + ${n} with base case sum(0) = 0`,
    { phase: 'init', activeK: n }
  );

  function sumToN(k, depth) {
    const frameId = `sum(${k})`;
    callStack.push({ id: frameId, k, depth, status: 'calling' });

    addStep(
      EVENT_TYPES.PUSH,
      1,
      `Call ${frameId} (depth ${depth}): push frame to call stack`,
      {
        phase: 'call',
        activeK: k,
        activeDepth: depth,
        highlights: { visit: [callStack.length - 1] },
        target: callStack.length - 1,
      }
    );

    // Base case: k <= 0
    if (k <= 0) {
      results[0] = 0;
      callStack[callStack.length - 1].status = 'base-case';
      callStack[callStack.length - 1].result = 0;

      addStep(
        EVENT_TYPES.MARK,
        2,
        `Base case reached: sum(0) returns 0 directly without recursive call`,
        {
          phase: 'base',
          activeK: 0,
          activeDepth: depth,
          highlights: { done: [callStack.length - 1] },
          target: callStack.length - 1,
        }
      );

      callStack.pop();
      returns.push({
        fromK: 0,
        toK: 1,
        expr: 'return 0',
        result: 0,
      });

      addStep(
        EVENT_TYPES.POP,
        3,
        `Return 0 from sum(0), popping frame from call stack`,
        {
          phase: 'unwind',
          activeK: 0,
          unwind: { fromK: 0, toK: 1, expr: 'return 0', result: 0 },
          highlights: { done: [] },
        }
      );

      return 0;
    }

    // Recursive step
    callStack[callStack.length - 1].status = 'recurse';
    addStep(
      EVENT_TYPES.MARK,
      4,
      `Recursive step: sum(${k}) awaits result of sum(${k - 1}) to compute ${k} + sum(${k - 1})`,
      {
        phase: 'call',
        activeK: k,
        activeDepth: depth,
        highlights: { pivot: callStack.length - 1 },
      }
    );

    const prevResult = sumToN(k - 1, depth + 1);
    const myResult = k + prevResult;
    results[k] = myResult;

    const returnExpr = `${k} + ${prevResult} = ${myResult}`;
    returns.push({
      fromK: k,
      toK: k + 1,
      expr: `return ${returnExpr}`,
      result: myResult,
    });

    callStack[callStack.length - 1].status = 'returning';
    callStack[callStack.length - 1].result = myResult;

    addStep(
      EVENT_TYPES.POP,
      5,
      `Unwind to sum(${k}): computed ${k} + sum(${k - 1}) = ${myResult}. Return ${myResult}`,
      {
        phase: 'unwind',
        activeK: k,
        activeDepth: depth,
        unwind: { fromK: k, toK: k === n ? null : k + 1, expr: `return ${returnExpr}`, result: myResult },
        highlights: { swap: [callStack.length - 1] },
      }
    );

    callStack.pop();
    return myResult;
  }

  const finalSum = sumToN(n, 0);

  addStep(
    EVENT_TYPES.MARK,
    6,
    `Execution complete: sum(${n}) = ${finalSum}. Call stack is completely empty.`,
    {
      phase: 'complete',
      activeK: n,
      finalResult: finalSum,
      highlights: { done: [] },
    }
  );

  return steps;
}

export { recursion };
