import { GRAPH_CODE_TEMPLATES } from './graphCode.js';

const NODE_RADIUS = 24;
const CANVAS_WIDTH = 740;
const CANVAS_HEIGHT = 380;

function computeLayout(nodes, _edges = []) {
  const positions = {};
  const nodeList = Object.values(nodes);
  const n = nodeList.length;

  if (n === 0) return positions;
  if (n === 1) {
    positions[nodeList[0].id] = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
    return positions;
  }

  // Pre-configured hierarchical / balanced tree layout for common 5 & 6 node topologies (like DFS/BFS reference diagram)
  const hierarchicalLayouts = {
    5: [
      { x: 370, y: 70 },   // 0 (Root)
      { x: 230, y: 175 },  // 1 (Left branch)
      { x: 510, y: 175 },  // 2 (Right branch)
      { x: 150, y: 290 },  // 3 (Left-left leaf)
      { x: 310, y: 290 }   // 4 (Left-right leaf)
    ],
    6: [
      { x: 370, y: 65 },   // 0
      { x: 220, y: 165 },  // 1
      { x: 520, y: 165 },  // 2
      { x: 140, y: 280 },  // 3
      { x: 300, y: 280 },  // 4
      { x: 520, y: 280 }   // 5
    ]
  };

  if (hierarchicalLayouts[n]) {
    nodeList.forEach((node, i) => {
      positions[node.id] = hierarchicalLayouts[n][i];
    });
    return positions;
  }

  // General BFS-layering layout for arbitrary graph sizes
  const levels = {};
  const visited = new Set();
  const queue = [{ id: nodeList[0].id, level: 0 }];
  visited.add(nodeList[0].id);

  while (queue.length > 0) {
    const { id, level } = queue.shift();
    if (!levels[level]) levels[level] = [];
    levels[level].push(id);

    const neighbors = nodes[id]?.neighbors || [];
    neighbors.forEach((nbr) => {
      const toId = typeof nbr === 'object' ? nbr.to : nbr;
      if (!visited.has(toId) && nodes[toId]) {
        visited.add(toId);
        queue.push({ id: toId, level: level + 1 });
      }
    });
  }

  nodeList.forEach((node) => {
    if (!visited.has(node.id)) {
      const maxLvl = Object.keys(levels).length;
      if (!levels[maxLvl]) levels[maxLvl] = [];
      levels[maxLvl].push(node.id);
      visited.add(node.id);
    }
  });

  const levelKeys = Object.keys(levels).map(Number).sort((a, b) => a - b);
  const rowSpacing = (CANVAS_HEIGHT - 120) / Math.max(1, levelKeys.length - 1);

  levelKeys.forEach((lvl, rowIdx) => {
    const nodeIds = levels[lvl];
    const colSpacing = (CANVAS_WIDTH - 180) / Math.max(1, nodeIds.length + 1);
    const y = 65 + rowIdx * rowSpacing;

    nodeIds.forEach((id, colIdx) => {
      const x = 90 + (colIdx + 1) * colSpacing;
      positions[id] = { x, y };
    });
  });

  return positions;
}

export function GraphCanvas({ currentStep, algorithmId }) {
  if (!currentStep || !currentStep.state) return null;

  const { nodes, highlights = {}, visited = [] } = currentStep.state;
  if (!nodes) return null;

  const edges = currentStep.state.edges || (() => {
    const list = [];
    const seen = new Set();
    Object.values(nodes).forEach((node) => {
      (node.neighbors || []).forEach((nbr) => {
        const toId = typeof nbr === 'object' ? nbr.to : nbr;
        const weight = typeof nbr === 'object' ? nbr.weight : undefined;
        const key = `${Math.min(node.id, toId)}-${Math.max(node.id, toId)}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ from: node.id, to: toId, weight });
        }
      });
    });
    return list;
  })();

  const positions = computeLayout(nodes, edges);

  const pathEdges = highlights.pathEdges || currentStep.state.pathEdges || [];
  const activeEdge = currentStep.state.activeEdge;
  const visitOrder = visited || [];

  // Live code execution box synchronization
  const codeLines = GRAPH_CODE_TEMPLATES[algorithmId] || GRAPH_CODE_TEMPLATES['dfs'];
  const activeLine = currentStep.line || 0;

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2" role="img" aria-label="Graph visualization">
      {/* Top Diagram Header with Live Sequence Trail */}
      <div className="w-full bg-[var(--bg-1)] border border-[var(--border)] rounded-md p-4 flex flex-col items-center">
        <div className="h-7 flex items-center justify-center gap-2 mb-2 font-mono text-sm tracking-wide">
          {visitOrder.length > 0 ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-2)]/70 rounded-full border border-[var(--border)]">
              <span className="text-[var(--text-muted)] text-xs uppercase font-sans font-semibold mr-1">Visited Path:</span>
              {visitOrder.map((id, idx) => (
                <span key={`path-item-${idx}`} className="flex items-center gap-1.5">
                  <span className="font-bold text-[#1e293b]">{Number(id) + 1}</span>
                  {idx < visitOrder.length - 1 && (
                    <span className="text-[var(--text-muted)] text-xs select-none">→</span>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[var(--text-muted)] font-sans italic">
              Press Play or Step to begin traversal
            </div>
          )}
        </div>

        <svg
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          className="overflow-visible"
        >
          <defs>
            <marker
              id="graph-arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 Z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Graph Edges */}
          {edges.map((edge, i) => {
            const from = positions[edge.from];
            const to = positions[edge.to];
            if (!from || !to) return null;

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist === 0) return null;

            const offsetX = (dx / dist) * NODE_RADIUS;
            const offsetY = (dy / dist) * NODE_RADIUS;

            const edgeKey = `${edge.from}-${edge.to}`;
            const revKey = `${edge.to}-${edge.from}`;
            const isTraversed = pathEdges.includes(edgeKey) || pathEdges.includes(revKey);
            const isActive = activeEdge === edgeKey || activeEdge === revKey;

            let strokeColor = '#cbd5e1'; // neutral slate
            let strokeWidth = 2;

            if (isActive) {
              strokeColor = '#1e293b'; // active edge
              strokeWidth = 3;
            } else if (isTraversed) {
              strokeColor = '#334155'; // visited tree edge
              strokeWidth = 2.5;
            }

            return (
              <g key={`edge-${i}`}>
                <line
                  x1={from.x + offsetX}
                  y1={from.y + offsetY}
                  x2={to.x - offsetX}
                  y2={to.y - offsetY}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className="transition-colors duration-200"
                />
                {edge.weight !== undefined && (
                  <g transform={`translate(${(from.x + to.x) / 2}, ${(from.y + to.y) / 2})`}>
                    <rect
                      x="-12"
                      y="-9"
                      width="24"
                      height="18"
                      rx="3"
                      fill="var(--bg-1)"
                      stroke="var(--border)"
                      strokeWidth="1"
                    />
                    <text
                      y="3"
                      fill="var(--text-0)"
                      fontSize="11"
                      fontWeight="600"
                      fontFamily="'JetBrains Mono', monospace"
                      textAnchor="middle"
                    >
                      {edge.weight}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Circular Nodes */}
          {Object.entries(nodes).map(([id, node]) => {
            const pos = positions[id];
            if (!pos) return null;

            const isVisited = visited.some(nid => String(nid) === String(id)) ||
              highlights.done?.some(nid => String(nid) === String(id));
            const isCurrent = highlights.visit?.some(nid => String(nid) === String(id));
            const isDiscovered = highlights.compare?.some(nid => String(nid) === String(id));

            let fillColor = '#f97316'; // orange frontier
            let strokeColor = '#ea580c';
            let textColor = '#ffffff';

            if (isCurrent) {
              fillColor = '#0f172a'; // active current node
              strokeColor = '#334155';
              textColor = '#ffffff';
            } else if (isVisited) {
              fillColor = '#1e293b'; // visited navy
              strokeColor = '#0f172a';
              textColor = '#ffffff';
            } else if (!isDiscovered && visited.length === 0) {
              fillColor = '#fb923c';
              strokeColor = '#f97316';
              textColor = '#ffffff';
            }

            const displayLabel = Number(node.id) + 1;

            return (
              <g
                key={`node-${id}`}
                transform={`translate(${pos.x}, ${pos.y})`}
              >
                <circle
                  r={NODE_RADIUS}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={2}
                  className="transition-colors duration-250 ease-out"
                />

                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={textColor}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {displayLabel}
                </text>

                {node.distance !== undefined && node.distance !== Infinity && (
                  <g transform={`translate(0, ${NODE_RADIUS + 13})`}>
                    <rect
                      x="-18"
                      y="-8"
                      width="36"
                      height="16"
                      rx="3"
                      fill="var(--bg-1)"
                      stroke="var(--border)"
                      strokeWidth="1"
                    />
                    <text
                      y="3"
                      textAnchor="middle"
                      fill="var(--text-0)"
                      fontSize="10"
                      fontWeight="600"
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      d:{node.distance}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Synchronized Live CODE Box (Matching Search Canvas layout) */}
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

export function GraphCanvasLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-2 text-xs font-sans text-[var(--text-muted)]">
      <span className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-full bg-[#1e293b]" />
        <span className="font-medium text-[var(--text-0)]">Visited / Processed</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-full bg-[#f97316]" />
        <span className="font-medium text-[var(--text-0)]">Unvisited / Frontier</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-6 h-0.5 bg-[#334155]" />
        <span className="font-medium text-[var(--text-0)]">Traversal Edge</span>
      </span>
    </div>
  );
}
