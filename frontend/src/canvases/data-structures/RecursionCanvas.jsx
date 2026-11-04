const STATE_COLORS = {
  idle: 'var(--idle)',
  compare: 'var(--compare)',
  visit: 'var(--compare)',
  swap: 'var(--swap)',
  pivot: 'var(--pivot)',
  done: 'var(--done)',
};

export function getNodeStateColor(nodeId, highlights = {}) {
  const sId = String(nodeId);
  if (highlights.done?.some(id => String(id) === sId)) return STATE_COLORS.done;
  if (highlights.compare?.some(id => String(id) === sId)) return STATE_COLORS.compare;
  if (highlights.visit?.some(id => String(id) === sId)) return STATE_COLORS.visit;
  if (highlights.swap?.some(id => String(id) === sId)) return STATE_COLORS.swap;
  if (String(highlights.pivot) === sId) return STATE_COLORS.pivot;
  return STATE_COLORS.idle;
}

export function RecursionCanvas({ state }) {
  const {
    callStack = [],
    results = {},
    returns = [],
    totalN = 4,
    activeK = totalN,
    phase = 'init',
    unwind = null,
  } = state;

  const n = totalN;
  const levels = [];
  for (let k = n; k >= 0; k--) {
    levels.push(k);
  }

  const CARD_W = 160;
  const CARD_H = 38;
  const LEVEL_GAP = 68;
  const START_Y = 32;
  const START_X = 24;

  const svgHeight = Math.max(340, (levels.length) * LEVEL_GAP + 50);
  const svgWidth = 560;

  const getY = (k) => {
    const idx = n - k;
    return START_Y + idx * LEVEL_GAP;
  };

  const getCardCenterY = (k) => getY(k) + CARD_H / 2;

  // Track which levels have been visited
  const minReachedK = callStack.length > 0 ? Math.min(...callStack.map(f => f.k)) : (results[0] !== undefined ? 0 : n);
  const hasVisited = (k) => k >= minReachedK || results[k] !== undefined;

  return (
    <div className="w-full py-4 px-2 flex flex-col xl:flex-row gap-6 justify-center items-start">
      {/* Visual Execution Flow Graph (Downward Calls + Upward Returns) */}
      <div className="flex-1 w-full max-w-2xl bg-[var(--bg-1)] border border-[var(--border)] rounded p-4 overflow-x-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--text-0)] font-sans">Recursion Flow:</span>
            <span className="text-[var(--accent)] font-bold">sum(n = {n})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Phase:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${phase === 'base'
              ? 'bg-[var(--done)]/20 text-[var(--done)] border border-[var(--done)]/40'
              : phase === 'unwind'
                ? 'bg-[var(--swap)]/20 text-[var(--swap)] border border-[var(--swap)]/40'
                : phase === 'complete'
                  ? 'bg-[var(--done)]/20 text-[var(--done)] border border-[var(--done)]/40'
                  : 'bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40'
              }`}>
              {phase === 'init' ? 'Setup' : phase === 'call' ? 'Winding ↓' : phase === 'base' ? 'Base Case ★' : phase === 'unwind' ? 'Unwinding ↑' : 'Complete ✓'}
            </span>
          </div>
        </div>

        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible font-mono">
          <defs>
            <marker id="call-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--text-muted)" />
            </marker>
            <marker id="return-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent)" />
            </marker>
            <marker id="return-arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--done)" />
            </marker>
            <marker id="exit-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--done)" />
            </marker>
          </defs>

          {/* Level Cards and Downward Invocation Arrows */}
          {levels.map((k) => {
            const y = getY(k);
            const isBase = k === 0;
            const visited = hasVisited(k);
            const isCurrentlyActive = activeK === k;
            const hasReturned = results[k] !== undefined;

            return (
              <g key={`level-${k}`}>
                {/* Downward Call Arrow to Child (k - 1) */}
                {k > 0 && (
                  <g>
                    <line
                      x1={START_X + CARD_W / 2}
                      y1={y + CARD_H}
                      x2={START_X + CARD_W / 2}
                      y2={y + LEVEL_GAP}
                      stroke={hasVisited(k - 1) ? 'var(--accent)' : 'var(--border)'}
                      strokeWidth={hasVisited(k - 1) ? '1.5' : '1'}
                      strokeDasharray={hasVisited(k - 1) ? 'none' : '3,3'}
                      markerEnd="url(#call-arrow)"
                    />
                    <text
                      x={START_X + CARD_W / 2 + 8}
                      y={y + LEVEL_GAP - 12}
                      fill={hasVisited(k - 1) ? 'var(--text-1)' : 'var(--text-muted)'}
                      fontSize="9"
                    >
                      calls sum({k - 1})
                    </text>
                  </g>
                )}

                {/* Call Box Card */}
                <rect
                  x={START_X}
                  y={y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="3"
                  ry="3"
                  fill={isCurrentlyActive ? 'var(--bg-2)' : 'var(--bg-0)'}
                  stroke={
                    isCurrentlyActive && phase === 'base'
                      ? 'var(--done)'
                      : isCurrentlyActive
                        ? 'var(--accent)'
                        : hasReturned
                          ? 'var(--done)'
                          : visited
                            ? 'var(--border-hover)'
                            : 'var(--border)'
                  }
                  strokeWidth={isCurrentlyActive ? '2' : '1'}
                  opacity={visited ? 1 : 0.4}
                />

                <text
                  x={START_X + 12}
                  y={y + CARD_H / 2 + 4}
                  fill={visited ? 'var(--text-0)' : 'var(--text-muted)'}
                  fontSize="12"
                  fontWeight="bold"
                >
                  sum({k})
                </text>

                {/* Right Badge inside Card */}
                {isBase ? (
                  <text
                    x={START_X + CARD_W - 10}
                    y={y + CARD_H / 2 + 4}
                    textAnchor="end"
                    fill="var(--done)"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    base case (0)
                  </text>
                ) : hasReturned ? (
                  <text
                    x={START_X + CARD_W - 10}
                    y={y + CARD_H / 2 + 4}
                    textAnchor="end"
                    fill="var(--done)"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    = {results[k]}
                  </text>
                ) : (
                  <text
                    x={START_X + CARD_W - 10}
                    y={y + CARD_H / 2 + 4}
                    textAnchor="end"
                    fill="var(--text-muted)"
                    fontSize="9"
                  >
                    depth: {n - k}
                  </text>
                )}
              </g>
            );
          })}

          {/* Upward Return Unwinding Curves (From Child to Parent) */}
          {returns.map((ret, idx) => {
            const { fromK, toK, expr, result } = ret;
            const yFrom = getCardCenterY(fromK);
            const isRootExit = toK === null || toK > n;

            if (isRootExit) {
              // Final return out of sum(n)
              const yRoot = getCardCenterY(n);
              const isLatest = idx === returns.length - 1;
              return (
                <g key={`ret-exit-${idx}`}>
                  <path
                    d={`M ${START_X + CARD_W} ${yRoot} C ${START_X + CARD_W + 50} ${yRoot - 8}, ${START_X + CARD_W + 80} ${yRoot - 28}, ${START_X + CARD_W + 110} ${yRoot - 24}`}
                    stroke="var(--done)"
                    strokeWidth={isLatest ? '2' : '1.5'}
                    fill="none"
                    markerEnd="url(#exit-arrow)"
                  />
                  <text
                    x={START_X + CARD_W + 120}
                    y={yRoot - 20}
                    fill="var(--done)"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    return {result} (Final Result)
                  </text>
                </g>
              );
            }

            const yTo = getCardCenterY(toK);
            const isCurrentlyUnwinding = unwind && unwind.fromK === fromK;
            const curveDepth = 65 + (n - fromK) * 4;

            return (
              <g key={`ret-${fromK}-${toK}`}>
                {/* Curved return arrow from child level to parent level */}
                <path
                  d={`M ${START_X + CARD_W} ${yFrom} C ${START_X + CARD_W + curveDepth} ${yFrom}, ${START_X + CARD_W + curveDepth} ${yTo}, ${START_X + CARD_W} ${yTo}`}
                  stroke={isCurrentlyUnwinding ? 'var(--done)' : 'var(--accent)'}
                  strokeWidth={isCurrentlyUnwinding ? '2.5' : '1.5'}
                  fill="none"
                  markerEnd={isCurrentlyUnwinding ? 'url(#return-arrow-active)' : 'url(#return-arrow)'}
                />
                {/* Return calculation text label */}
                <text
                  x={START_X + CARD_W + curveDepth + 10}
                  y={(yFrom + yTo) / 2 + 4}
                  fill={isCurrentlyUnwinding ? 'var(--text-0)' : 'var(--text-1)'}
                  fontSize="11"
                  fontWeight={isCurrentlyUnwinding ? 'bold' : 'normal'}
                >
                  {expr}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Call Stack (LIFO) & Computed Inspector */}
      <div className="w-full xl:w-72 flex flex-col gap-4">
        {/* Call Stack Box */}
        <div className="w-full bg-[var(--bg-1)] border border-[var(--border)] rounded p-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
            <span className="font-semibold text-[var(--text-0)] font-sans">Call Stack (LIFO)</span>
            <span className="text-[var(--accent)] font-bold">{callStack.length} frame(s)</span>
          </div>

          {callStack.length === 0 ? (
            <div className="py-8 text-center text-[var(--text-muted)] text-xs">
              <div>Stack is empty</div>
              <div className="mt-1 text-[10px] text-[var(--text-muted)]/70">
                {results[n] !== undefined ? 'Execution complete' : 'Press Play (Space) or Step (→)'}
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse gap-1.5">
              {callStack.map((frame, idx) => {
                const isTop = idx === callStack.length - 1;
                const isBase = frame.status === 'base-case';
                const isRet = frame.status === 'returning';

                return (
                  <div
                    key={`${frame.id}-${idx}`}
                    className={`p-2.5 rounded border flex items-center justify-between ${isTop
                      ? isBase
                        ? 'border-[var(--done)] bg-[var(--done)]/15 text-[var(--done)] font-bold'
                        : isRet
                          ? 'border-[var(--swap)] bg-[var(--swap)]/15 text-[var(--swap)]'
                          : 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--text-0)] font-bold'
                      : 'border-[var(--border)] bg-[var(--bg-0)] text-[var(--text-1)]'
                      }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm" style={{
                        backgroundColor: isBase ? 'var(--done)' : isRet ? 'var(--swap)' : 'var(--accent)'
                      }} />
                      <span>{frame.id}</span>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase">
                      depth {frame.depth}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Computed Values Cache */}
        <div className="w-full bg-[var(--bg-1)] border border-[var(--border)] rounded p-4 font-mono text-xs">
          <span className="font-semibold text-[var(--text-0)] font-sans block pb-2 border-b border-[var(--border)] mb-3">
            Resolved Return Values
          </span>
          {Object.keys(results).length === 0 ? (
            <span className="text-xs text-[var(--text-muted)] block py-2">No returns yet (winding down...)</span>
          ) : (
            <div className="space-y-1">
              {Object.entries(results).map(([k, val]) => (
                <div key={k} className="flex justify-between py-1 px-2 rounded-sm bg-[var(--bg-0)] border border-[var(--border)]/50">
                  <span className="text-[var(--text-muted)]">sum({k}):</span>
                  <span className="text-[var(--done)] font-bold">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 5. General Tree / Trie / Binary Tree Canvas
