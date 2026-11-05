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

export function HashCanvas({ state, highlights }) {
  const { buckets = [], capacity = 16, size, loadFactor } = state;

  return (
    <div className="w-full py-4 px-4 flex flex-col items-center">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6 text-xs font-mono bg-[var(--bg-1)] border border-[var(--border)] px-4 py-2 rounded">
        <span>Capacity: <strong className="text-[var(--text-0)]">{capacity}</strong></span>
        {size !== undefined && (
          <span>Size: <strong className="text-[var(--text-0)]">{size}</strong></span>
        )}
        {loadFactor !== undefined && (
          <span>Load Factor: <strong className="text-[var(--accent)]">{loadFactor.toFixed(2)}</strong> / 0.75</span>
        )}
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-2">
        {buckets.map((bucket, idx) => {
          const bucketId = `bucket_${idx}`;
          const isVisited = highlights.visit?.includes(bucketId) || highlights.target === bucketId;
          const isComparing = highlights.compare?.some(id => String(id).startsWith(`bucket_${idx}`));

          return (
            <div
              key={idx}
              className={`p-2.5 rounded border text-xs flex flex-col gap-1.5 transition-colors ${isVisited || isComparing
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                  : 'border-[var(--border)] bg-[var(--bg-1)]'
                }`}
            >
              <div className="flex items-center justify-between border-b border-[var(--border)]/50 pb-1">
                <span className="font-mono font-semibold text-[var(--accent)]">
                  [{idx}]
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  {bucket.length} {bucket.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {bucket.length === 0 ? (
                <span className="text-[var(--text-muted)] text-[11px] py-1">empty</span>
              ) : (
                <div className="flex flex-col gap-1 py-0.5">
                  {bucket.map((entry, j) => {
                    const entryId = `bucket_${idx}_${j}`;
                    const isEntryComp = highlights.compare?.includes(entryId);
                    return (
                      <div
                        key={j}
                        className={`px-2 py-1 rounded-sm font-mono text-[11px] border flex justify-between ${isEntryComp
                            ? 'border-[var(--compare)] bg-[var(--compare)]/20 text-[var(--compare)]'
                            : 'border-[var(--border)]/70 bg-[var(--bg-0)] text-[var(--text-0)]'
                          }`}
                      >
                        <span className="font-medium">{entry.key}:</span>
                        <span className="text-[var(--text-1)]">{entry.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. Heap Canvas (Tree + Array representation)
