import { describe, it, expect } from 'vitest';
import {
  playerReducer,
  initialPlayer,
  SPEED_PRESETS,
  getSpeedPreset,
  getDelayFromPreset
} from '../../src/core/player.js';

describe('playerReducer', () => {
  it('should initialize with load action', () => {
    const state = playerReducer(initialPlayer, { type: 'load', stepCount: 10 });
    expect(state.stepCount).toBe(10);
    expect(state.index).toBe(0);
    expect(state.status).toBe('idle');
  });

  it('should play from idle', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const state = playerReducer(loaded, { type: 'play' });
    expect(state.status).toBe('playing');
    expect(state.index).toBe(0);
  });

  it('should not play if no steps', () => {
    const state = playerReducer(initialPlayer, { type: 'play' });
    expect(state.status).toBe('idle');
  });

  it('should pause when playing', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const playing = playerReducer(loaded, { type: 'play' });
    const paused = playerReducer(playing, { type: 'pause' });
    expect(paused.status).toBe('paused');
  });

  it('should step forward', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const state = playerReducer(loaded, { type: 'step' });
    expect(state.index).toBe(1);
    expect(state.status).toBe('paused');
  });

  it('should step backward', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const stepped = playerReducer(loaded, { type: 'step' });
    const state = playerReducer(stepped, { type: 'back' });
    expect(state.index).toBe(0);
    expect(state.status).toBe('idle');
  });

  it('should not go below 0 on back', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const state = playerReducer(loaded, { type: 'back' });
    expect(state.index).toBe(0);
    expect(state.status).toBe('idle');
  });

  it('should reset to initial state', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const stepped = playerReducer(loaded, { type: 'step' });
    const state = playerReducer(stepped, { type: 'reset' });
    expect(state.index).toBe(0);
    expect(state.status).toBe('idle');
  });

  it('should seek to valid index', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const state = playerReducer(loaded, { type: 'seek', index: 3 });
    expect(state.index).toBe(3);
    expect(state.status).toBe('paused');
  });

  it('should clamp seek index at upper bound', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const state = playerReducer(loaded, { type: 'seek', index: 100 });
    expect(state.index).toBe(4);
    expect(state.status).toBe('finished');
  });

  it('should clamp seek index at lower bound on negative index', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const state = playerReducer(loaded, { type: 'seek', index: -10 });
    expect(state.index).toBe(0);
    expect(state.status).toBe('idle');
  });

  it('should not step forward past the last step', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 2 });
    const step1 = playerReducer(loaded, { type: 'step' });
    expect(step1.index).toBe(1);
    const step2 = playerReducer(step1, { type: 'step' });
    expect(step2.index).toBe(1);
    expect(step2.status).toBe('finished');
  });

  it('should update speed', () => {
    const state = playerReducer(initialPlayer, { type: 'speed', delayMs: 500 });
    expect(state.delayMs).toBe(500);
  });

  it('should clamp speed to limits', () => {
    const state = playerReducer(initialPlayer, { type: 'speed', delayMs: 5 });
    expect(state.delayMs).toBe(10);
    const state2 = playerReducer(initialPlayer, { type: 'speed', delayMs: 2000 });
    expect(state2.delayMs).toBe(1500);
  });

  it('should tick forward when playing', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const playing = playerReducer(loaded, { type: 'play' });
    const state = playerReducer(playing, { type: 'tick' });
    expect(state.index).toBe(1);
    expect(state.status).toBe('playing');
  });

  it('should not tick when paused or finished', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 5 });
    const tickPaused = playerReducer(loaded, { type: 'tick' });
    expect(tickPaused.index).toBe(0);
  });

  it('should finish when reaching end', () => {
    const loaded = playerReducer(initialPlayer, { type: 'load', stepCount: 2 });
    const playing = playerReducer(loaded, { type: 'play' });
    const tick1 = playerReducer(playing, { type: 'tick' });
    const state = playerReducer(tick1, { type: 'tick' });
    expect(state.index).toBe(1);
    expect(state.status).toBe('finished');
  });
});

describe('speed presets', () => {
  it('should have correct preset values', () => {
    expect(SPEED_PRESETS[1]).toBe(600);
    expect(SPEED_PRESETS[2]).toBe(250);
    expect(SPEED_PRESETS[3]).toBe(80);
  });

  it('should get correct preset from delay', () => {
    expect(getSpeedPreset(600)).toBe(1);
    expect(getSpeedPreset(250)).toBe(2);
    expect(getSpeedPreset(80)).toBe(3);
    expect(getSpeedPreset(100)).toBe(3);
    expect(getSpeedPreset(400)).toBe(2);
  });

  it('should get correct delay from preset', () => {
    expect(getDelayFromPreset(1)).toBe(600);
    expect(getDelayFromPreset(2)).toBe(250);
    expect(getDelayFromPreset(3)).toBe(80);
    expect(getDelayFromPreset(999)).toBe(250);
  });
});
