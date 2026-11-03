const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export const initialPlayer = {
  stepCount: 0,
  index: 0,
  status: 'idle',
  delayMs: 250,
};

export function playerReducer(state, action) {
  const last = state.stepCount - 1;
  switch (action.type) {
    case 'load':
      return { ...state, stepCount: action.stepCount, index: 0, status: 'idle' };
    case 'play':
      if (state.stepCount === 0) return state;
      return {
        ...state,
        index: state.status === 'finished' ? 0 : state.index,
        status: 'playing',
      };
    case 'pause':
      return state.status === 'playing' ? { ...state, status: 'paused' } : state;
    case 'tick': {
      if (state.status !== 'playing') return state;
      const nextIndex = Math.min(state.index + 1, last);
      return {
        ...state,
        index: nextIndex,
        status: nextIndex >= last ? 'finished' : 'playing',
      };
    }
    case 'step': {
      if (state.stepCount === 0) return state;
      const nextIndex = Math.min(state.index + 1, last);
      return {
        ...state,
        index: nextIndex,
        status: nextIndex >= last ? 'finished' : 'paused',
      };
    }
    case 'back': {
      const prevIndex = Math.max(state.index - 1, 0);
      return {
        ...state,
        index: prevIndex,
        status: prevIndex === 0 ? 'idle' : 'paused',
      };
    }
    case 'seek': {
      const seekIndex = clamp(action.index, 0, Math.max(last, 0));
      return {
        ...state,
        index: seekIndex,
        status:
          seekIndex === 0
            ? 'idle'
            : seekIndex >= last
            ? 'finished'
            : 'paused',
      };
    }
    case 'reset':
      return { ...state, index: 0, status: 'idle' };
    case 'speed':
      return { ...state, delayMs: clamp(action.delayMs, 10, 1500) };
    default:
      return state;
  }
}

export const SPEED_PRESETS = {
  1: 600,
  2: 250,
  3: 80,
};

export function getSpeedPreset(delayMs) {
  if (delayMs <= 100) return 3;
  if (delayMs <= 400) return 2;
  return 1;
}

export function getDelayFromPreset(preset) {
  return SPEED_PRESETS[preset] ?? 250;
}