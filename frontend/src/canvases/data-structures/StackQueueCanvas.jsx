import React from 'react';

const STACK_CODE = [
  { line: 1, text: 'stack = []' },
  { line: 2, text: 'def push(value):' },
  { line: 3, text: '    stack.append(value)' },
  { line: 4, text: 'def pop():' },
  { line: 5, text: '    return stack.pop()' },
];

const QUEUE_CODE = [
  { line: 1, text: 'from collections import deque' },
  { line: 2, text: 'queue = deque()' },
  { line: 3, text: 'def enqueue(value):' },
  { line: 4, text: '    queue.append(value)' },
  { line: 5, text: 'def dequeue():' },
  { line: 6, text: '    return queue.popleft()' },
];

export function StackQueueCanvas({ currentStep, algorithmId }) {
  if (!currentStep || !currentStep.state) return null;

  const {
    elements = [],
    history = [],
    justAdded = null,
  } = currentStep.state;

  const isStack = algorithmId === 'stack';
  const codeLines = isStack ? STACK_CODE : QUEUE_CODE;
  const activeLine = currentStep.line || 0;

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2" role="img" aria-label={`${isStack ? 'Stack' : 'Queue'} visualization`}>
      {/* Main Container */}
      <div className="w-full bg-[var(--bg-1)] border border-[var(--border)] rounded-md p-6 flex flex-col items-center min-h-[380px]">
        {/* Top Operations History Pill Stream (e.g. +78 +50 +34 -49 +60) */}
        <div className="w-full flex items-center justify-start gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider select-none mr-2">
            Values:
          </span>
          {history.map((item, idx) => {
            const isPush = item.op === 'push' || item.op === 'enqueue';
            return (
              <span
                key={`hist-${idx}`}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-0.5 border ${isPush
                  ? 'bg-[#15803d]/15 border-[#15803d]/40 text-[#15803d]'
                  : 'bg-[#dc2626]/15 border-[#dc2626]/40 text-[#dc2626]'
                  }`}
              >
                <span>{isPush ? '+' : '-'}</span>
                <span>{item.val}</span>
              </span>
            );
          })}
        </div>

        {/* Visualizer Structure Body */}
        {isStack ? (
          /* Stack: Vertical Column with open top and solid bottom shelf */
          <div className="flex flex-col items-center justify-end flex-1 min-h-[240px] w-full max-w-xs">
            <div className="flex flex-col items-center gap-2.5 w-full">
              {elements.length === 0 ? (
                <div className="text-xs font-mono text-[var(--text-muted)] italic py-8">
                  Stack is empty
                </div>
              ) : (
                /* Reverse so top of stack is at top visually */
                [...elements].reverse().map((val, revIdx) => {
                  const actualIdx = elements.length - 1 - revIdx;
                  const isTop = revIdx === 0;
                  const isRecent = justAdded === val && isTop;

                  return (
                    <div key={`stack-${actualIdx}`} className="flex items-center gap-4 w-full justify-center">
                      <div className="w-12 text-right">
                        {isTop && (
                          <span className="text-xs font-mono font-bold text-[#15803d] tracking-wider">
                            top
                          </span>
                        )}
                      </div>
                      <div
                        className={`w-28 py-3 rounded border text-center font-mono font-bold text-sm ${isRecent
                          ? 'bg-[#15803d] text-white border-[#15803d]'
                          : 'bg-[var(--bg-2)] text-[var(--text-0)] border-[var(--border)]'
                          }`}
                      >
                        {val}
                      </div>
                      <div className="w-12" />
                    </div>
                  );
                })
              )}
            </div>
            {/* Solid Bottom Shelf */}
            <div className="w-36 h-1 bg-[var(--text-0)] rounded-full mt-3 opacity-30" />
          </div>
        ) : (
          /* Queue: Horizontal Pipe with front (left) and rear (right) pointers */
          <div className="flex flex-col items-center justify-center flex-1 min-h-[220px] w-full">
            {elements.length === 0 ? (
              <div className="text-xs font-mono text-[var(--text-muted)] italic py-8">
                Queue is empty
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 flex-wrap max-w-xl">
                {elements.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === elements.length - 1;
                  const isRecent = justAdded === val && isRear;

                  return (
                    <div key={`queue-${idx}`} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-14 h-14 rounded border flex items-center justify-center font-mono font-bold text-sm ${isRecent
                          ? 'bg-[#15803d] text-white border-[#15803d]'
                          : 'bg-[var(--bg-2)] text-[var(--text-0)] border-[var(--border)]'
                          }`}
                      >
                        {val}
                      </div>
                      <div className="h-4 text-center">
                        {isFront && (
                          <span className="text-[11px] font-mono font-bold text-[#15803d]">
                            front
                          </span>
                        )}
                        {isRear && !isFront && (
                          <span className="text-[11px] font-mono font-bold text-[#2563eb]">
                            rear
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#15803d]" />
            <span>Just added</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#dc2626]" />
            <span>Leaving now</span>
          </span>
        </div>
      </div>

      {/* Synchronized Live CODE Execution Box */}
      <div className="w-full bg-[var(--bg-1)] border border-[var(--border)] rounded overflow-hidden text-xs font-mono">
        <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-0)]/60 text-[11px] tracking-wider font-semibold text-[var(--text-muted)] uppercase select-none flex items-center justify-between">
          <span>Code Execution</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">Python 3</span>
        </div>
        <div className="p-3 bg-[var(--bg-0)] space-y-0.5 overflow-x-auto">
          {codeLines.map(({ line, text }) => {
            const isActive = activeLine === line;
            return (
              <div
                key={line}
                className={`flex items-center px-2 py-1 rounded transition-colors ${isActive
                  ? 'bg-[#15803d]/15 text-[var(--text-0)] font-semibold'
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

export function StackQueueCanvasLegend() {
  return null;
}

