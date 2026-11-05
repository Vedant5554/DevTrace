import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AlgorithmCard } from '../../src/components/AlgorithmCard.jsx';
import { Breadcrumbs } from '../../src/components/Breadcrumbs.jsx';
import { CodeTabs } from '../../src/components/CodeTabs.jsx';
import { ComparisonTable } from '../../src/components/ComparisonTable.jsx';
import { PlayerToolbar } from '../../src/components/PlayerToolbar.jsx';
import { Navigation } from '../../src/components/Navigation.jsx';
import { Article } from '../../src/components/Article.jsx';

describe('UI Components', () => {
  describe('AlgorithmCard', () => {
    it('renders algorithm name, blurb, and link correctly', () => {
      const algo = { id: 'bubble-sort', name: 'Bubble Sort', blurb: 'Compare adjacent pairs' };
      render(
        <MemoryRouter>
          <AlgorithmCard algorithm={algo} section="sorting" />
        </MemoryRouter>
      );

      expect(screen.getByText('Bubble Sort')).toBeInTheDocument();
      expect(screen.getByText('Compare adjacent pairs')).toBeInTheDocument();
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/visualize/sorting/bubble-sort');
    });
  });

  describe('Breadcrumbs', () => {
    it('renders navigation links and titles for section and algorithm', () => {
      render(
        <MemoryRouter>
          <Breadcrumbs section="sorting" algorithm="bubble-sort" />
        </MemoryRouter>
      );

      expect(screen.getByText('Visualizations')).toHaveAttribute('href', '/visualize');
      expect(screen.getByText('Sorting')).toHaveAttribute('href', '/visualize/sorting');
      expect(screen.getByText('bubble sort')).toBeInTheDocument();
    });
  });

  describe('CodeTabs', () => {
    const sampleCode = {
      python: 'def sort(arr): pass',
      javascript: 'function sort(arr) {}',
      java: 'class Sorter {}',
      cpp: 'void sort() {}',
      c: 'void sort() {}',
    };

    it('renders all language tabs and defaults to Python', () => {
      render(<CodeTabs code={sampleCode} />);
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('def sort(arr): pass')).toBeInTheDocument();
    });

    it('switches displayed code on tab click', () => {
      render(<CodeTabs code={sampleCode} />);
      fireEvent.click(screen.getByText('JavaScript'));
      expect(screen.getByText('function sort(arr) {}')).toBeInTheDocument();
    });

    it('handles clipboard copy button click', async () => {
      const writeTextMock = vi.fn().mockResolvedValue();
      Object.assign(navigator, {
        clipboard: { writeText: writeTextMock },
      });

      render(<CodeTabs code={sampleCode} />);
      const copyButton = screen.getByRole('button', { name: /Copy Python code/i });
      fireEvent.click(copyButton);
      expect(writeTextMock).toHaveBeenCalledWith('def sort(arr): pass');
    });
  });

  describe('ComparisonTable', () => {
    it('renders table headers and rows for valid curriculum section', () => {
      render(<ComparisonTable section="sorting" />);
      expect(screen.getByText('Algorithm')).toBeInTheDocument();
      expect(screen.getByText('Bubble Sort')).toBeInTheDocument();
      expect(screen.getByText('Quick Sort')).toBeInTheDocument();
    });

    it('returns null when given an invalid section', () => {
      const { container } = render(<ComparisonTable section="nonexistent-section" />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('PlayerToolbar', () => {
    it('triggers playback callbacks on user interactions', () => {
      const onPlayPause = vi.fn();
      const onStep = vi.fn();
      const onBack = vi.fn();
      const onReset = vi.fn();
      const onSpeedChange = vi.fn();

      render(
        <PlayerToolbar
          status="paused"
          index={2}
          stepCount={10}
          _delayMs={250}
          speedPreset={2}
          view="bars"
          onPlayPause={onPlayPause}
          onStep={onStep}
          onBack={onBack}
          onReset={onReset}
          onSpeedChange={onSpeedChange}
          onViewChange={vi.fn()}
          onSizeChange={vi.fn()}
          size={10}
          minSize={3}
          maxSize={40}
        />
      );

      // Play button
      fireEvent.click(screen.getByTitle('Play (Space)'));
      expect(onPlayPause).toHaveBeenCalled();

      // Step button
      fireEvent.click(screen.getByTitle('Step Forward (Right Arrow)'));
      expect(onStep).toHaveBeenCalled();

      // Back button
      fireEvent.click(screen.getByTitle('Step Back (Left Arrow)'));
      expect(onBack).toHaveBeenCalled();

      // Reset button
      fireEvent.click(screen.getByTitle('Reset (R)'));
      expect(onReset).toHaveBeenCalled();

      // Step indicator
      expect(screen.getByText('Step 3 / 10')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('renders brand home link and curriculum navigation links', () => {
      render(
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      );

      expect(screen.getByLabelText('DevTrace Home')).toBeInTheDocument();
      expect(screen.getAllByText('Sorting')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Data Structures')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Graphs')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Searching')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Concepts')[0]).toBeInTheDocument();
    });

    it('toggles mobile menu on button click', () => {
      render(
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      );

      const menuBtn = screen.getByLabelText('Toggle menu');
      fireEvent.click(menuBtn);
      // Mobile drawer links should now be present
      expect(screen.getAllByText('Sorting').length).toBeGreaterThan(1);
    });
  });

  describe('Article', () => {
    const mockArticle = {
      title: 'Bubble Sort',
      introduction: ['Intro paragraph 1', 'Intro paragraph 2'],
      complexity: { time: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' }, space: 'O(1)' },
      faq: [{ q: 'Is it stable?', a: 'Yes it is stable.' }],
    };

    it('renders introduction, complexity, and FAQ content', () => {
      render(
        <MemoryRouter>
          <Article article={mockArticle} siblingAlgorithms={{ prev: null, next: null }} />
        </MemoryRouter>
      );

      expect(screen.getByText('Intro paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Is it stable?')).toBeInTheDocument();
      expect(screen.getByText('Yes it is stable.')).toBeInTheDocument();
    });

    it('returns null when article is not provided', () => {
      const { container } = render(<Article article={null} />);
      expect(container.firstChild).toBeNull();
    });
  });
});

