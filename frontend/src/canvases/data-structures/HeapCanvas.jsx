const NODE_WIDTH = 52;
const NODE_HEIGHT = 34;
const LEVEL_HEIGHT = 80;
const HORIZONTAL_SPACING = 68;

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

export function HeapCanvas({ state, highlights }) {
  const { array = [], heapSize = array.length } = state;
  const n = array.length;

  const positions = {};
  const depthOf = (i) => Math.floor(Math.log2(i + 1));
  const maxDepth = Math.max(0, depthOf(Math.max(0, n - 1)));

  for (let i = 0; i < n; i++) {
    const d = depthOf(i);
    const nodesInLevel = Math.pow(2, d);
    const indexInLevel = i - (nodesInLevel - 1);
    const levelWidth = Math.pow(2, maxDepth) * HORIZONTAL_SPACING;
    const spacing = levelWidth / nodesInLevel;
    const x = -levelWidth / 2 + spacing / 2 + indexInLevel * spacing;
    const y = d * LEVEL_HEIGHT;
    positions[i] = { x, y };
  }

  const minX = Object.values(positions).reduce((acc, p) => Math.min(acc, p.x), 0) - NODE_WIDTH;
  const maxX = Object.values(positions).reduce((acc, p) => Math.max(acc, p.x), 0) + NODE_WIDTH;
  const width = Math.max(620, maxX - minX + 80);
  const height = (maxDepth + 1) * LEVEL_HEIGHT + 50;

  return (
    <div className="w-full flex flex-col items-center py-4">
      <svg
        width={width}
        height={height}
        viewBox={`${minX - 30} -20 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Edges */}
        {Array.from({ length: n }).map((_, i) => {
          const left = 2 * i + 1;
          const right = 2 * i + 2;
          const from = positions[i];
          const lines = [];
          if (left < n && positions[left]) {
            lines.push(
              <line
                key={`l-${i}`}
                x1={from.x}
                y1={from.y + NODE_HEIGHT / 2}
                x2={positions[left].x}
                y2={positions[left].y - NODE_HEIGHT / 2}
                stroke={left >= heapSize ? 'var(--border)/30' : 'var(--border)'}
                strokeWidth="1.5"
              />
            );
          }
          if (right < n && positions[right]) {
            lines.push(
              <line
                key={`r-${i}`}
                x1={from.x}
                y1={from.y + NODE_HEIGHT / 2}
                x2={positions[right].x}
                y2={positions[right].y - NODE_HEIGHT / 2}
                stroke={right >= heapSize ? 'var(--border)/30' : 'var(--border)'}
                strokeWidth="1.5"
              />
            );
          }
          return lines;
        })}

        {/* Rectangular Node Blocks */}
        {array.map((val, i) => {
          const pos = positions[i];
          if (!pos) return null;
          const isExtracted = i >= heapSize;
          const color = isExtracted ? 'var(--border)' : getNodeStateColor(i, highlights);
          const isHighlighted = (highlights.compare?.includes(i) ||
            highlights.swap?.includes(i) ||
            highlights.pivot === i) && !isExtracted;

          return (
            <g
              key={i}
              transform={`translate(${pos.x - NODE_WIDTH / 2}, ${pos.y - NODE_HEIGHT / 2})`}
              opacity={isExtracted ? 0.35 : 1}
            >
              <rect
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx="4"
                ry="4"
                fill={color !== STATE_COLORS.idle ? color : 'var(--bg-1)'}
                stroke={isHighlighted ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={isHighlighted ? 2 : 1}
              />
              <text
                x={NODE_WIDTH / 2}
                y={NODE_HEIGHT / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill={color === STATE_COLORS.idle ? 'var(--text-0)' : 'var(--bg-0)'}
                fontSize="12"
                fontWeight="700"
                fontFamily="'JetBrains Mono', monospace"
              >
                {val}
              </text>
              <text
                x={NODE_WIDTH / 2}
                y={NODE_HEIGHT + 13}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="9"
                fontFamily="'JetBrains Mono', monospace"
              >
                [{i}]
              </text>
            </g>
          );
        })}
      </svg>

      {/* Array representation row */}
      <div className="mt-4 flex flex-wrap gap-1 items-center justify-center">
        {array.map((val, i) => {
          const isExtracted = i >= heapSize;
          const isHighlighted = (highlights.compare?.includes(i) ||
            highlights.swap?.includes(i) ||
            highlights.pivot === i) && !isExtracted;
          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-center w-10 h-12 rounded border font-mono text-xs ${isExtracted
                  ? 'border-[var(--border)]/40 text-[var(--text-muted)] opacity-40'
                  : isHighlighted
                    ? 'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--text-0)] font-bold'
                    : 'border-[var(--border)] bg-[var(--bg-1)] text-[var(--text-0)]'
                }`}
            >
              <span>{val}</span>
              <span className="text-[9px] text-[var(--text-muted)]">{i}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 4. Recursion (Call & Return Unwinding Flow)
