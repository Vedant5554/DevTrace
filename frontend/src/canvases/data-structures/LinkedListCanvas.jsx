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

export function LinkedListCanvas({ state, highlights, _shouldAnimate }) {
  const { nodes = {}, head, tail } = state;
  const listItems = [];
  let curr = head;
  const visitedIds = new Set();

  while (curr && nodes[curr] && !visitedIds.has(curr)) {
    visitedIds.add(curr);
    listItems.push(nodes[curr]);
    curr = nodes[curr].next;
  }

  if (listItems.length === 0) {
    Object.values(nodes).forEach(n => listItems.push(n));
  }

  const isDoubly = listItems.some(n => n.prev !== undefined);

  return (
    <div className="w-full overflow-x-auto py-6 px-4 flex flex-col items-center justify-center min-h-[300px]">
      <div className="flex items-center gap-1.5 flex-nowrap">
        {listItems.map((node) => {
          const color = getNodeStateColor(node.id, highlights);
          const isHead = node.id === head;
          const isTail = node.id === tail;
          const isHighlighted = highlights.compare?.includes(node.id) ||
            highlights.visit?.includes(node.id) ||
            highlights.swap?.includes(node.id) ||
            highlights.done?.includes(node.id);

          return (
            <div key={node.id} className="flex items-center">
              <div
                className="relative flex flex-col items-center justify-center min-w-[76px] h-18 px-3 py-2 rounded border bg-[var(--bg-1)] transition-colors"
                style={{
                  borderColor: isHighlighted ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: color !== STATE_COLORS.idle ? `${color}22` : 'var(--bg-1)',
                }}
              >
                {(isHead || isTail) && (
                  <div className="absolute -top-3 flex gap-1">
                    {isHead && (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded-sm bg-[var(--accent)] text-[var(--bg-0)]">
                        HEAD
                      </span>
                    )}
                    {isTail && (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded-sm bg-[var(--pivot)] text-[var(--bg-0)]">
                        TAIL
                      </span>
                    )}
                  </div>
                )}
                <span
                  className="text-base font-mono font-bold"
                  style={{ color: color !== STATE_COLORS.idle ? color : 'var(--text-0)' }}
                >
                  {node.value}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
                  [{node.id}]
                </span>
              </div>

              {/* Connector arrow */}
              <div className="px-2 flex flex-col items-center justify-center text-[var(--accent)] select-none font-mono text-sm">
                {isDoubly ? '⇄' : '→'}
              </div>
            </div>
          );
        })}

        {/* Null terminator */}
        <div className="px-3 py-2 rounded border border-dashed border-[var(--border)] text-[var(--text-muted)] font-mono text-xs font-semibold">
          NULL
        </div>
      </div>
    </div>
  );
}

