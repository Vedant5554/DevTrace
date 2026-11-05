import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/app/App.jsx';
import { BarsCanvas, BarsCanvasLegend } from '../../src/canvases/bars/index.js';
import {
  StackQueueCanvas,
  LinkedListCanvas,
  HashCanvas,
  HeapCanvas,
  RecursionCanvas,
} from '../../src/canvases/data-structures/index.js';
import { TreeCanvas, TreeCanvasLegend } from '../../src/canvases/tree/index.js';
import { GraphCanvas, GraphCanvasLegend } from '../../src/canvases/graph/index.js';
import { SearchCanvas, SearchCanvasLegend } from '../../src/canvases/search/index.js';

describe('Canvas rendering smoke tests', () => {
  it('renders BarsCanvas without crashing', () => {
    const step = {
      type: 'compare',
      state: {
        array: [5, 3, 8, 1],
        highlights: { compare: [0, 1] },
        sorted: [],
      },
    };
    const { container } = render(<BarsCanvas currentStep={step} delayMs={100} />);
    expect(container.querySelector('[role="img"]')).toBeInTheDocument();
    render(<BarsCanvasLegend />);
  });

  it('renders StackQueueCanvas without crashing', () => {
    const step = {
      type: 'push',
      state: {
        items: [1, 2, 3],
        highlights: { push: 2 },
      },
    };
    const { container } = render(<StackQueueCanvas currentStep={step} algorithmId="stack" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders LinkedListCanvas without crashing', () => {
    const state = {
      nodes: [{ id: 0, val: 10, next: 1 }, { id: 1, val: 20, next: null }],
    };
    const { container } = render(<LinkedListCanvas state={state} highlights={{}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders HashCanvas without crashing', () => {
    const state = {
      buckets: [[{ key: 'a', value: 1 }]],
      capacity: 16,
      size: 1,
      loadFactor: 0.06,
    };
    const { container } = render(<HashCanvas state={state} highlights={{}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders HeapCanvas without crashing', () => {
    const state = {
      array: [10, 5, 8],
    };
    const { container } = render(<HeapCanvas state={state} highlights={{}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders RecursionCanvas without crashing', () => {
    const state = {
      frames: [{ id: 1, name: 'fact(3)', args: { n: 3 }, ret: null, status: 'active' }],
      callTree: { id: 1, name: 'fact(3)', children: [] },
    };
    const { container } = render(<RecursionCanvas state={state} highlights={{}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders TreeCanvas without crashing', () => {
    const step = {
      type: 'visit',
      state: {
        nodes: { 0: { id: 0, val: 10, left: null, right: null } },
        root: 0,
      },
    };
    const { container } = render(<TreeCanvas currentStep={step} delayMs={100} />);
    expect(container.firstChild).toBeInTheDocument();
    render(<TreeCanvasLegend currentStep={step} />);
  });

  it('renders GraphCanvas without crashing', () => {
    const step = {
      type: 'visit',
      state: {
        nodes: [{ id: 0, label: '0' }, { id: 1, label: '1' }],
        edges: [{ from: 0, to: 1, weight: 1 }],
        highlights: {},
      },
    };
    const { container } = render(<GraphCanvas currentStep={step} algorithmId="bfs" delayMs={100} />);
    expect(container.firstChild).toBeInTheDocument();
    render(<GraphCanvasLegend />);
  });

  it('renders SearchCanvas without crashing', () => {
    const step = {
      type: 'compare',
      state: {
        array: [1, 2, 3, 4],
        target: 3,
        highlights: { compare: [2] },
      },
    };
    const { container } = render(<SearchCanvas currentStep={step} algorithmId="linear-search" />);
    expect(container.firstChild).toBeInTheDocument();
    render(<SearchCanvasLegend />);
  });
});

describe('App route smoke tests', () => {
  it('renders /visualize without crashing', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/visualize']}>
        <App />
      </MemoryRouter>
    );
    expect(getByRole('main')).toBeInTheDocument();
  });

  it('renders /visualize/sorting/bubble-sort without crashing', async () => {
    const { findByRole } = render(
      <MemoryRouter initialEntries={['/visualize/sorting/bubble-sort']}>
        <App />
      </MemoryRouter>
    );
    const heading = await findByRole('heading', { level: 1, name: /Bubble Sort/i });
    expect(heading).toBeInTheDocument();
  });
});
