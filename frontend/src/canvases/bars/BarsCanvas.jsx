import { motion, AnimatePresence } from 'framer-motion';
import { reducedMotion } from '../../core/useReducedMotion.js';

const BAR_COLORS = {
  idle: 'var(--idle)',
  compare: 'var(--compare)',
  swap: 'var(--swap)',
  pivot: 'var(--pivot)',
  range: 'var(--range)',
  done: 'var(--done)',
};

const TRANSITION = { duration: 0.15, ease: 'easeOut' };

export function BarsCanvas({ currentStep, delayMs, _view = 'bars' }) {
  if (!currentStep || !currentStep.state) return null;

  const { array, highlights = {}, sorted = [], range = null } = currentStep.state;
  const maxVal = Math.max(...array, 1);
  const barCount = array.length;
  const barWidth = Math.max(2, Math.floor(800 / barCount) - 2);
  const containerWidth = barCount * (barWidth + 2);

  const getBarColor = (index) => {
    if (sorted.includes(index)) return BAR_COLORS.done;
    if (highlights.compare?.includes(index)) return BAR_COLORS.compare;
    if (highlights.swap?.includes(index)) return BAR_COLORS.swap;
    if (highlights.pivot === index) return BAR_COLORS.pivot;
    if (range && index >= range[0] && index <= range[1]) return BAR_COLORS.range;
    return BAR_COLORS.idle;
  };

  const getBarHeight = (value) => Math.max(4, (value / maxVal) * 280);

  const shouldAnimate = delayMs >= 60 && !reducedMotion;

  return (
    <div className="flex justify-center items-end min-h-[320px] px-4" role="img" aria-label="Array visualization">
      <div className="flex items-end gap-1 h-[300px]" style={{ width: containerWidth }}>
        <AnimatePresence mode="wait">
          {array.map((value, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                height: getBarHeight(value),
                backgroundColor: getBarColor(index),
              }}
              transition={shouldAnimate ? TRANSITION : { duration: 0 }}
              className="rounded-t transition-colors duration-100"
              style={{
                width: barWidth,
                minWidth: 2,
              }}
            >
              {barWidth >= 20 && (
                <span className="absolute bottom-full left-0 right-0 text-center text-xs font-mono text-[var(--text-muted)] mb-1">
                  {value}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function BarsCanvasLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-[var(--text-muted)]">
      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--idle)' }} /> Idle</span>
      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--compare)' }} /> Compare</span>
      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--swap)' }} /> Swap/Write</span>
      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--pivot)' }} /> Pivot</span>
      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--range)' }} /> Range</span>
      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--done)' }} /> Sorted</span>
    </div>
  );
}