import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getAlgorithm } from '../../src/core/registry.js';
import { generateRandomInput } from '../../src/core/inputs.js';
import { bubbleSort } from '../../src/algorithms/sorting/bubbleSort.js';
import { bfs } from '../../src/algorithms/graphs/bfs.js';
import { stack } from '../../src/algorithms/data-structures/stack.js';
import { playerReducer, initialPlayer } from '../../src/core/player.js';
import { BarsCanvas } from '../../src/canvases/bars/index.js';
import { GraphCanvas } from '../../src/canvases/graph/index.js';
import { StackQueueCanvas } from '../../src/canvases/data-structures/index.js';

describe('Integration Pipeline Tests', () => {
  it('executes full pipeline: Registry -> Inputs -> Sorting Algorithm -> Player -> BarsCanvas', () => {
    // 1. Registry lookup
    const meta = getAlgorithm('sorting', 'bubble-sort');
    expect(meta).toBeDefined();

    // 2. Input generation
    const input = generateRandomInput(meta.id, 6);
    expect(input.length).toBe(6);

    // 3. Algorithm step generation
    const steps = bubbleSort(input);
    expect(steps.length).toBeGreaterThan(0);

    // 4. Player reducer lifecycle
    let player = playerReducer(initialPlayer, { type: 'load', stepCount: steps.length });
    expect(player.status).toBe('idle');
    expect(player.index).toBe(0);

    player = playerReducer(player, { type: 'play' });
    expect(player.status).toBe('playing');

    player = playerReducer(player, { type: 'step' });
    expect(player.index).toBe(1);

    player = playerReducer(player, { type: 'seek', index: steps.length - 1 });
    expect(player.index).toBe(steps.length - 1);

    // 5. Canvas rendering with current step
    const currentStep = steps[player.index];
    const { container } = render(
      <BarsCanvas currentStep={currentStep} delayMs={player.delayMs} />
    );
    expect(container.querySelector('[role="img"]')).toBeInTheDocument();
  });

  it('executes full pipeline: Graph Algorithm (BFS) -> Player -> GraphCanvas', () => {
    const meta = getAlgorithm('graphs', 'bfs');
    const input = generateRandomInput(meta.id, 5);
    const steps = bfs(input);
    expect(steps.length).toBeGreaterThan(0);

    let player = playerReducer(initialPlayer, { type: 'load', stepCount: steps.length });
    player = playerReducer(player, { type: 'step' });

    const currentStep = steps[player.index];
    const { container } = render(
      <GraphCanvas currentStep={currentStep} algorithmId="bfs" delayMs={player.delayMs} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('executes full pipeline: Data Structure (Stack) -> Player -> StackQueueCanvas', () => {
    const meta = getAlgorithm('data-structures', 'stack');
    const input = generateRandomInput(meta.id, 6);
    const steps = stack(input);
    expect(steps.length).toBeGreaterThan(0);

    let player = playerReducer(initialPlayer, { type: 'load', stepCount: steps.length });
    player = playerReducer(player, { type: 'step' });

    const currentStep = steps[player.index];
    const { container } = render(
      <StackQueueCanvas currentStep={currentStep} algorithmId="stack" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

