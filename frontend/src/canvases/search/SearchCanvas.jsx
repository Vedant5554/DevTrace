import React from 'react';

const BINARY_SEARCH_CODE = [
  { line: 1, text: 'def binary_search(a, target):' },
  { line: 2, text: '    lo, hi = 0, len(a) - 1' },
  { line: 3, text: '    while lo <= hi:' },
  { line: 4, text: '        mid = (lo + hi) // 2' },
  { line: 5, text: '        if a[mid] == target:' },
  { line: 6, text: '            return mid' },
  { line: 7, text: '        if a[mid] < target:' },
  { line: 8, text: '            lo = mid + 1' },
  { line: 9, text: '        else:' },
  { line: 10, text: '            hi = mid - 1' },
  { line: 11, text: '    return -1' },
];

const LINEAR_SEARCH_CODE = [
  { line: 1, text: 'def linear_search(a, target):' },
  { line: 2, text: '    for i in range(len(a)): ' },
  { line: 3, text: '        if a[i] == target:' },
  { line: 4, text: '            return i' },
  { line: 5, text: '    return -1' },
];

export function SearchCanvas({ currentStep, algorithmId }) {
  if (!currentStep || !currentStep.state) return null;

  const {
    array = [],
    target = null,
    lo = null,
    hi = null,
    mid = null,
    currentIdx = null,
    status = 'searching',
    highlights = {},
  } = currentStep.state;

  const activeLine = currentStep.line || 0;
  const isBinary = algorithmId === 'binary-search';
  const codeLines = isBinary ? BINARY_SEARCH_CODE : LINEAR_SEARCH_CODE;

  // Build pointer labels for each index
  const getPointersForIndex = (idx) => {
    if (isBinary) {
      const labels = [];
      if (lo === idx) labels.push('lo');
      if (mid === idx) labels.push('mid');
      if (hi === idx) labels.push('hi');
      return labels.length > 0 ? labels.join(', ') : null;
    } else {
      return currentIdx === idx ? 'i' : null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">
      {/* Search Canvas Box */}
      <div className="w-full bg-[var(--bg-1)] border border-[var(--border)] rounded p-6 flex flex-col items-center">
        {/* Top Status Header */}
        <div className="w-full flex items-center justify-between mb-6 text-xs font-mono">
          <span className={`font-semibold tracking-wide ${status === 'found'
              ? 'text-[var(--done)]'
              : status === 'not-found'
                ? 'text-[var(--swap)]'
                : 'text-[var(--text-1)]'
            }`}>
            {status === 'found'
              ? `Found target ${target}!`
              : status === 'not-found'
                ? `Target ${target} not found in array`
                : `Searching for target ${target}...`}
          </span>

          {/* Centered Target Pill */}
          <div className="px-3.5 py-1 bg-[var(--bg-2)] border border-[var(--border)] rounded flex items-center gap-2">
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Target</span>
            <span className="font-bold text-[var(--accent)] text-sm">{target}</span>
          </div>
        </div>

        {/* Array of Number Cells */}
        <div className="w-full overflow-x-auto pb-6 pt-2 flex justify-center">
          <div className="flex items-start gap-1.5 md:gap-2 px-2 flex-nowrap min-w-max">
            {array.map((val, idx) => {
              const isFound = highlights.done?.includes(idx);
              const isComparing = highlights.compare?.includes(idx);
              const isMid = isBinary && mid === idx;

              // Elimination logic
              let isEliminated = false;
              if (isBinary && lo !== null && hi !== null) {
                isEliminated = idx < lo || idx > hi;
              } else if (!isBinary && currentIdx !== null) {
                isEliminated = idx < currentIdx && !isFound;
              }

              const pointerLabel = getPointersForIndex(idx);

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 w-9 sm:w-11">
                  {/* The Cell Block */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded flex items-center justify-center font-mono text-xs sm:text-sm font-bold transition-all duration-150 ${isFound
                        ? 'border-2 border-[var(--done)] bg-[var(--done)]/20 text-[var(--done)] scale-105'
                        : isComparing
                          ? 'border-2 border-[var(--compare)] bg-[var(--compare)]/20 text-[var(--compare)]'
                          : isMid
                            ? 'border-2 border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--text-0)]'
                            : isEliminated
                              ? 'border border-[var(--border)] bg-[var(--bg-0)] text-[var(--text-muted)] opacity-35'
                              : 'border border-[var(--border)] bg-[var(--bg-0)] text-[var(--text-0)] hover:bg-[var(--bg-2)]'
                      }`}
                  >
                    {val}
                  </div>

                  {/* Index Label */}
                  <span className="text-[10px] font-mono text-[var(--text-muted)] select-none">
                    {idx}
                  </span>

                  {/* Pointer Label Below */}
                  <div className="h-5 flex items-center justify-center">
                    {pointerLabel && (
                      <span className={`text-[11px] font-mono font-bold flex items-center gap-0.5 whitespace-nowrap ${pointerLabel.includes('mid')
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--compare)]'
                        }`}>
                        <span className="text-[9px]">▲</span>
                        <span>{pointerLabel}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Synchronized Live CODE Box */}
      <div className="w-full bg-[var(--bg-1)] border border-[var(--border)] rounded overflow-hidden text-xs font-mono">
        <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-0)]/60 text-[11px] tracking-wider font-semibold text-[var(--text-muted)] uppercase select-none">
          Code Execution
        </div>
        <div className="p-3 bg-[var(--bg-0)] space-y-0.5 overflow-x-auto">
          {codeLines.map(({ line, text }) => {
            const isActive = activeLine === line;
            return (
              <div
                key={line}
                className={`flex items-center px-2 py-1 rounded transition-colors ${isActive
                    ? 'bg-[var(--accent)]/15 text-[var(--text-0)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-1)]'
                  }`}
              >
                <span className="w-7 text-right select-none opacity-40 mr-4 font-normal">
                  {line}
                </span>
                <pre className="m-0 font-mono text-xs">{text}</pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SearchCanvasLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs text-[var(--text-muted)] font-mono">
      <span className="flex items-center gap-1.5">
        <span className="w-3.5 h-2 rounded-sm" style={{ backgroundColor: 'var(--compare)' }} />
        Comparing
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-3.5 h-2 rounded-sm border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-0)', opacity: 0.4 }} />
        Target missing / Eliminated
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-3.5 h-2 rounded-sm" style={{ backgroundColor: 'var(--done)' }} />
        Target present / Found
      </span>
    </div>
  );
}

