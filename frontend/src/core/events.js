export const EVENT_TYPES = {
  COMPARE: 'compare',
  SWAP: 'swap',
  SET: 'set',
  MARK: 'mark',
  VISIT: 'visit',
  PUSH: 'push',
  POP: 'pop',
  RELAX: 'relax',
  LINK: 'link',
  UNLINK: 'unlink',
};

export const TRACE_LIMIT = 20000;

export class TraceLimitError extends Error {
  constructor() {
    super('Trace limit exceeded: maximum 20,000 frames');
    this.name = 'TraceLimitError';
  }
}

export function createStep(type, line, note, state, extra = {}) {
  if (!Object.values(EVENT_TYPES).includes(type)) {
    throw new Error(`Invalid event type: ${type}`);
  }
  const { metrics, ...restExtra } = extra;
  return {
    type,
    line,
    note,
    state: JSON.parse(JSON.stringify(state)),
    metrics: metrics || createMetrics(),
    ...restExtra,
  };
}

export function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

export function createMetrics(comparisons = 0, swaps = 0, steps = 0) {
  return { comparisons, swaps, steps };
}