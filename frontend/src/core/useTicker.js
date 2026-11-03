import { useEffect, useRef } from 'react';

export function useTicker(playing, delayMs, index, onTick) {
  const ref = useRef(onTick);
  useEffect(() => {
    ref.current = onTick;
  });
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => ref.current(), delayMs);
    return () => window.clearTimeout(id);
  }, [playing, delayMs, index]);
}