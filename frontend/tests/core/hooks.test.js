import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTicker } from '../../src/core/useTicker.js';
import { useReducedMotion } from '../../src/core/useReducedMotion.js';

describe('core hooks', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useTicker', () => {
    it('calls onTick callback periodically when playing', () => {
      const onTick = vi.fn();
      const { rerender } = renderHook(
        ({ playing, delay, index }) => useTicker(playing, delay, index, onTick),
        { initialProps: { playing: true, delay: 100, index: 0 } }
      );

      expect(onTick).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(onTick).toHaveBeenCalledTimes(1);

      // On index change, timer resets
      rerender({ playing: true, delay: 100, index: 1 });
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(onTick).toHaveBeenCalledTimes(2);
    });

    it('does not invoke callback when playing is false', () => {
      const onTick = vi.fn();
      renderHook(() => useTicker(false, 100, 0, onTick));

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(onTick).not.toHaveBeenCalled();
    });

    it('clears pending timeout on unmount', () => {
      const onTick = vi.fn();
      const { unmount } = renderHook(() => useTicker(true, 100, 0, onTick));

      unmount();
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(onTick).not.toHaveBeenCalled();
    });
  });

  describe('useReducedMotion', () => {
    it('returns matchMedia boolean state', () => {
      const { result } = renderHook(() => useReducedMotion());
      expect(typeof result.current).toBe('boolean');
    });
  });
});

