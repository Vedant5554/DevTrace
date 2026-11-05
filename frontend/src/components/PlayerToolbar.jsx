import { useCallback } from 'react';
import {
  IconReset,
  IconSkipBack,
  IconPlay,
  IconPause,
  IconSkipForward
} from './Icons.jsx';
import { SPEED_PRESETS } from '../core/player.js';

export function PlayerToolbar({
  status,
  index,
  stepCount,
  _delayMs,
  speedPreset,
  view,
  onPlayPause,
  onStep,
  onBack,
  onReset,
  onSpeedChange,
  onViewChange,
  onSizeChange,
  size,
  minSize,
  maxSize,
}) {
  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    switch (e.key) {
      case ' ':
        e.preventDefault();
        onPlayPause();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onStep();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onBack();
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        onReset();
        break;
      case '[':
        e.preventDefault();
        onSpeedChange(Math.min(3, speedPreset + 1));
        break;
      case ']':
        e.preventDefault();
        onSpeedChange(Math.max(1, speedPreset - 1));
        break;
    }
  }, [onPlayPause, onStep, onBack, onReset, onSpeedChange, speedPreset]);

  const formatTime = (ms) => {
    if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
    return `${ms}ms`;
  };

  return (
    <div className="bg-[var(--bg-0)] border-t border-[var(--border)] p-3.5" onKeyDown={handleKeyDown}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            disabled={index === 0 && status === 'idle'}
            className="p-1.5 bg-[var(--bg-1)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-0)] hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Reset (R)"
            title="Reset (R)"
          >
            <IconReset size={16} />
          </button>
          <button
            onClick={onBack}
            disabled={index === 0}
            className="p-1.5 bg-[var(--bg-1)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-0)] hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Step Back (Left Arrow)"
            title="Step Back (Left Arrow)"
          >
            <IconSkipBack size={16} />
          </button>
          <button
            onClick={onPlayPause}
            disabled={stepCount === 0}
            className="p-1.5 px-4 bg-[var(--accent)] text-white font-semibold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity flex items-center gap-1 text-xs font-sans tracking-widest uppercase rounded-sm"
            aria-label={status === 'playing' ? 'Pause (Space)' : 'Play (Space)'}
            title={status === 'playing' ? 'Pause (Space)' : 'Play (Space)'}
          >
            {status === 'playing' ? <IconPause size={16} /> : <IconPlay size={16} />}
            <span>{status === 'playing' ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={onStep}
            disabled={index >= stepCount - 1 || stepCount === 0}
            className="p-1.5 bg-[var(--bg-1)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-0)] hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Step Forward (Right Arrow)"
            title="Step Forward (Right Arrow)"
          >
            <IconSkipForward size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <label className="text-[10px] text-[var(--text-muted)] font-sans tracking-widest uppercase">Speed</label>
            <select
              value={speedPreset}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="bg-[var(--bg-1)] border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-0)] focus:outline-none focus:border-[var(--accent)] font-mono"
              aria-label="Animation speed"
            >
              <option value={1}>Slow ({formatTime(SPEED_PRESETS[1])})</option>
              <option value={2}>Normal ({formatTime(SPEED_PRESETS[2])})</option>
              <option value={3}>Fast ({formatTime(SPEED_PRESETS[3])})</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <label className="text-[10px] text-[var(--text-muted)] font-sans tracking-widest uppercase">Size</label>
            <input
              type="range"
              min={minSize}
              max={maxSize}
              value={size}
              onChange={(e) => onSizeChange(Number(e.target.value))}
              className="w-28 bg-transparent cursor-pointer"
              aria-label="Input size"
            />
            <span className="font-mono text-xs text-[var(--text-1)] w-6 text-right">{size}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <label className="text-[10px] text-[var(--text-muted)] font-sans tracking-widest uppercase">View</label>
            <select
              value={view}
              onChange={(e) => onViewChange(e.target.value)}
              className="bg-[var(--bg-1)] border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-0)] focus:outline-none focus:border-[var(--accent)] font-mono"
              aria-label="Visualization view"
            >
              <option value="bars">Bars</option>
              <option value="search">Search</option>
              <option value="tree">Tree</option>
              <option value="graph">Graph</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span className="font-mono">
            Step {Math.min(index + 1, stepCount)} / {stepCount}
          </span>
          {index > 0 && index < stepCount && (
            <span className="font-mono text-[var(--compare)]">[Running]</span>
          )}
          {index >= stepCount - 1 && stepCount > 0 && (
            <span className="font-mono text-[var(--done)]">[Complete]</span>
          )}
        </div>
      </div>
    </div>
  );
}
