import { LinkedListCanvas } from '../data-structures/LinkedListCanvas.jsx';
import { HashCanvas } from '../data-structures/HashCanvas.jsx';
import { HeapCanvas } from '../data-structures/HeapCanvas.jsx';
import { RecursionCanvas } from '../data-structures/RecursionCanvas.jsx';

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


function TreeHierarchyView({ state, highlights }) {
  const { nodes = {}, root = 0 } = state;
  const rootNode = nodes[root] || Object.values(nodes)[0];
  if (!rootNode) return null;

  const rootId = rootNode.id !== undefined ? rootNode.id : root;
  const positions = {};

  const isBinaryTree = Object.values(nodes).some(
    n => n.left !== undefined || n.right !== undefined
  );

  if (isBinaryTree) {
    let inOrderIndex = 0;
    function computeInOrder(nodeId, depth) {
      const node = nodes[nodeId];
      if (!node) return;
      if (node.left !== null && node.left !== undefined) {
        computeInOrder(node.left, depth + 1);
      }
      positions[nodeId] = { x: inOrderIndex * HORIZONTAL_SPACING, y: depth * LEVEL_HEIGHT };
      inOrderIndex++;
      if (node.right !== null && node.right !== undefined) {
        computeInOrder(node.right, depth + 1);
      }
    }
    computeInOrder(rootId, 0);

    const allX = Object.values(positions).map(p => p.x);
    const centerX = (Math.min(...allX) + Math.max(...allX)) / 2;
    Object.values(positions).forEach(p => { p.x -= centerX; });
  } else {
    function subtreeWidth(nodeId) {
      const node = nodes[nodeId];
      if (!node) return 1;
      let childIds = [];
      if (node.children) {
        childIds = Array.isArray(node.children)
          ? node.children.filter(id => id !== null && id !== undefined)
          : Object.values(node.children).filter(id => id !== null && id !== undefined);
      }
      if (childIds.length === 0) return 1;
      return childIds.reduce((sum, cid) => sum + subtreeWidth(cid), 0);
    }

    function layoutGeneral(nodeId, offsetX, depth) {
      const node = nodes[nodeId];
      if (!node) return;
      let childIds = [];
      if (node.children) {
        childIds = Array.isArray(node.children)
          ? node.children.filter(id => id !== null && id !== undefined)
          : Object.values(node.children).filter(id => id !== null && id !== undefined);
      }
      const myWidth = subtreeWidth(nodeId);
      positions[nodeId] = {
        x: (offsetX + myWidth / 2 - 0.5) * HORIZONTAL_SPACING,
        y: depth * LEVEL_HEIGHT,
      };
      let cursor = offsetX;
      childIds.forEach(cid => {
        const w = subtreeWidth(cid);
        layoutGeneral(cid, cursor, depth + 1);
        cursor += w;
      });
    }
    layoutGeneral(rootId, 0, 0);

    const allX = Object.values(positions).map(p => p.x);
    const centerX = (Math.min(...allX) + Math.max(...allX)) / 2;
    Object.values(positions).forEach(p => { p.x -= centerX; });
  }

  const allPositions = Object.values(positions);
  if (allPositions.length === 0) return null;

  const minX = Math.min(...allPositions.map(p => p.x)) - NODE_WIDTH;
  const maxX = Math.max(...allPositions.map(p => p.x)) + NODE_WIDTH;
  const maxY = Math.max(...allPositions.map(p => p.y)) + NODE_HEIGHT;
  const width = Math.max(620, maxX - minX + 80);
  const height = Math.max(320, maxY + 70);

  const edges = [];
  Object.entries(nodes).forEach(([id, node]) => {
    if (node.left !== undefined && node.left !== null) edges.push({ from: id, to: node.left });
    if (node.right !== undefined && node.right !== null) edges.push({ from: id, to: node.right });
    if (node.children) {
      if (Array.isArray(node.children)) {
        node.children.forEach(cid => edges.push({ from: id, to: cid }));
      } else {
        Object.entries(node.children).forEach(([char, cid]) => {
          edges.push({ from: id, to: cid, label: char });
        });
      }
    }
  });

  return (
    <div className="flex justify-center" role="img" aria-label="Tree visualization">
      <svg
        width={width}
        height={height}
        viewBox={`${minX - 40} -30 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = positions[edge.from];
          const to = positions[edge.to];
          if (!from || !to) return null;

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y + NODE_HEIGHT / 2}
                x2={to.x}
                y2={to.y - NODE_HEIGHT / 2}
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              {edge.label && (
                <text
                  x={(from.x + to.x) / 2 - 8}
                  y={(from.y + to.y) / 2}
                  fill="var(--accent)"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Rectangular Node Blocks (No Rings) */}
        {Object.entries(nodes).map(([id, node]) => {
          const pos = positions[id];
          if (!pos) return null;

          const color = getNodeStateColor(id, highlights);
          const isHighlighted = highlights.compare?.includes(id) ||
            highlights.visit?.includes(id) ||
            highlights.swap?.includes(id) ||
            highlights.pivot === id ||
            highlights.done?.includes(id);

          const displayValue = node.value !== undefined
            ? node.value
            : node.char !== undefined
              ? (node.char || 'root')
              : id;

          return (
            <g
              key={id}
              transform={`translate(${pos.x - NODE_WIDTH / 2}, ${pos.y - NODE_HEIGHT / 2})`}
            >
              <rect
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx="4"
                ry="4"
                fill={color !== STATE_COLORS.idle ? color : 'var(--bg-1)'}
                stroke={node.isEnd ? 'var(--done)' : isHighlighted ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={node.isEnd ? 2 : isHighlighted ? 2 : 1}
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
                {displayValue}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}


export function TreeCanvas({ currentStep }) {
  if (!currentStep || !currentStep.state) return null;
  const state = currentStep.state;
  const highlights = state.highlights || {};
  if (state.head !== undefined && state.nodes) {
    return <LinkedListCanvas state={state} highlights={highlights} />;
  }
  if (state.buckets) {
    return <HashCanvas state={state} highlights={highlights} />;
  }
  if (state.array && state.heapSize !== undefined) {
    return <HeapCanvas state={state} highlights={highlights} />;
  }
  if (state.callStack) {
    return <RecursionCanvas state={state} highlights={highlights} />;
  }
  if (state.nodes) {
    return <TreeHierarchyView state={state} highlights={highlights} />;
  }
  return null;
}


export function TreeCanvasLegend({ currentStep }) {
  if (currentStep?.state?.callStack !== undefined) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-[var(--text-muted)] font-mono">
        <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm" style={{ backgroundColor: 'var(--accent)' }} /> Active Call / Push</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm" style={{ backgroundColor: 'var(--done)' }} /> Base Case</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm" style={{ backgroundColor: 'var(--swap)' }} /> Return / Pop</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm border border-[var(--border)]" style={{ backgroundColor: 'var(--bg-0)' }} /> In Stack</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-[var(--text-muted)] font-mono">
      <span className="flex items-center gap-1.5"><span className="w-3.5 h-2 rounded-sm" style={{ backgroundColor: 'var(--idle)', border: '1px solid var(--border)' }} /> Idle</span>
      <span className="flex items-center gap-1.5"><span className="w-3.5 h-2 rounded-sm" style={{ backgroundColor: 'var(--compare)' }} /> Compare / Visit</span>
      <span className="flex items-center gap-1.5"><span className="w-3.5 h-2 rounded-sm" style={{ backgroundColor: 'var(--swap)' }} /> Modify / Relink</span>
      <span className="flex items-center gap-1.5"><span className="w-3.5 h-2 rounded-sm" style={{ backgroundColor: 'var(--pivot)' }} /> Target / Pivot</span>
      <span className="flex items-center gap-1.5"><span className="w-3.5 h-2 rounded-sm" style={{ backgroundColor: 'var(--done)' }} /> Complete</span>
    </div>
  );
}