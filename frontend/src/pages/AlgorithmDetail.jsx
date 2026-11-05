import { useEffect, useState, useCallback, useMemo, useReducer } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs.jsx';
import { PlayerToolbar } from '../components/PlayerToolbar.jsx';
import { Article } from '../components/Article.jsx';
import { getAlgorithm, getSiblingAlgorithms } from '../core/registry.js';
import { playerReducer, initialPlayer, getDelayFromPreset } from '../core/player.js';
import { useTicker } from '../core/useTicker.js';
import { BarsCanvas, BarsCanvasLegend } from '../canvases/bars/index.js';
import { TreeCanvas, TreeCanvasLegend } from '../canvases/tree/index.js';
import { StackQueueCanvas } from '../canvases/data-structures/index.js';
import { GraphCanvas, GraphCanvasLegend } from '../canvases/graph/index.js';
import { SearchCanvas, SearchCanvasLegend } from '../canvases/search/index.js';
import {
  SIZE_LIMITS,
  DEFAULT_INPUTS,
  generateRandomInput,
  formatInputToString,
  parseInputFromString,
  resizeInput
} from '../core/inputs.js';
import { IconShuffle } from '../components/Icons.jsx';

const ALGORITHM_GENERATORS = {
  'bubble-sort': () => import('../algorithms/sorting/bubbleSort.js').then(m => m.bubbleSort),
  'selection-sort': () => import('../algorithms/sorting/selectionSort.js').then(m => m.selectionSort),
  'insertion-sort': () => import('../algorithms/sorting/insertionSort.js').then(m => m.insertionSort),
  'merge-sort': () => import('../algorithms/sorting/mergeSort.js').then(m => m.mergeSort),
  'quick-sort': () => import('../algorithms/sorting/quickSort.js').then(m => m.quickSort),
  'heap-sort': () => import('../algorithms/sorting/heapSort.js').then(m => m.heapSort),
  'radix-sort': () => import('../algorithms/sorting/radixSort.js').then(m => m.radixSort),
  'counting-sort': () => import('../algorithms/sorting/countingSort.js').then(m => m.countingSort),
  'stack': () => import('../algorithms/data-structures/stack.js').then(m => m.stack),
  'queue': () => import('../algorithms/data-structures/queue.js').then(m => m.queue),
  'linked-list': () => import('../algorithms/data-structures/linkedList.js').then(m => m.linkedList),
  'doubly-linked-list': () => import('../algorithms/data-structures/doublyLinkedList.js').then(m => m.doublyLinkedList),
  'hash-table': () => import('../algorithms/data-structures/hashTable.js').then(m => m.hashTable),
  'hash-map': () => import('../algorithms/data-structures/hashMap.js').then(m => m.hashMap),
  'binary-tree': () => import('../algorithms/data-structures/trees/binaryTree.js').then(m => m.binaryTree),
  'bst': () => import('../algorithms/data-structures/trees/bst.js').then(m => m.bst),
  'avl-tree': () => import('../algorithms/data-structures/trees/avlTree.js').then(m => m.avlTree),
  'heap': () => import('../algorithms/data-structures/trees/heap.js').then(m => m.heap),
  'trie': () => import('../algorithms/data-structures/trees/trie.js').then(m => m.trie),
  'dfs': () => import('../algorithms/graphs/dfs.js').then(m => m.dfs),
  'bfs': () => import('../algorithms/graphs/bfs.js').then(m => m.bfs),
  'topological-sort': () => import('../algorithms/graphs/topologicalSort.js').then(m => m.topologicalSort),
  'dijkstra': () => import('../algorithms/graphs/dijkstra.js').then(m => m.dijkstra),
  'bellman-ford': () => import('../algorithms/graphs/bellmanFord.js').then(m => m.bellmanFord),
  'kruskal': () => import('../algorithms/graphs/kruskal.js').then(m => m.kruskal),
  'prim': () => import('../algorithms/graphs/prim.js').then(m => m.prim),
  'linear-search': () => import('../algorithms/searching/linearSearch.js').then(m => m.linearSearch),
  'binary-search': () => import('../algorithms/searching/binarySearch.js').then(m => m.binarySearch),
  'recursion': () => import('../algorithms/concepts/recursion.js').then(m => m.recursion),
};

const ALGORITHM_ARTICLES = {
  'bubble-sort': () => import('../content/sorting/bubbleSort.js').then(m => m.bubbleSortArticle),
  'selection-sort': () => import('../content/sorting/selectionSort.js').then(m => m.selectionSortArticle),
  'insertion-sort': () => import('../content/sorting/insertionSort.js').then(m => m.insertionSortArticle),
  'merge-sort': () => import('../content/sorting/mergeSort.js').then(m => m.mergeSortArticle),
  'quick-sort': () => import('../content/sorting/quickSort.js').then(m => m.quickSortArticle),
  'heap-sort': () => import('../content/sorting/heapSort.js').then(m => m.heapSortArticle),
  'radix-sort': () => import('../content/sorting/radixSort.js').then(m => m.radixSortArticle),
  'counting-sort': () => import('../content/sorting/countingSort.js').then(m => m.countingSortArticle),
  'linear-search': () => import('../content/searching/linearSearch.js').then(m => m.linearSearchArticle),
  'binary-search': () => import('../content/searching/binarySearch.js').then(m => m.binarySearchArticle),
  'recursion': () => import('../content/concepts/recursion.js').then(m => m.recursionArticle),
  'dfs': () => import('../content/graphs/dfs.js').then(m => m.dfsArticle),
  'bfs': () => import('../content/graphs/bfs.js').then(m => m.bfsArticle),
  'topological-sort': () => import('../content/graphs/topologicalSort.js').then(m => m.topologicalSortArticle),
  'dijkstra': () => import('../content/graphs/dijkstra.js').then(m => m.dijkstraArticle),
  'bellman-ford': () => import('../content/graphs/bellmanFord.js').then(m => m.bellmanFordArticle),
  'kruskal': () => import('../content/graphs/kruskal.js').then(m => m.kruskalArticle),
  'prim': () => import('../content/graphs/prim.js').then(m => m.primArticle),
  'stack': () => import('../content/data-structures/stack.js').then(m => m.stackArticle),
  'queue': () => import('../content/data-structures/queue.js').then(m => m.queueArticle),
  'linked-list': () => import('../content/data-structures/linkedList.js').then(m => m.linkedListArticle),
  'doubly-linked-list': () => import('../content/data-structures/doublyLinkedList.js').then(m => m.doublyLinkedListArticle),
  'hash-table': () => import('../content/data-structures/hashTable.js').then(m => m.hashTableArticle),
  'hash-map': () => import('../content/data-structures/hashMap.js').then(m => m.hashMapArticle),
  'binary-tree': () => import('../content/data-structures/trees/binaryTree.js').then(m => m.binaryTreeArticle),
  'bst': () => import('../content/data-structures/trees/bst.js').then(m => m.bstArticle),
  'avl-tree': () => import('../content/data-structures/trees/avlTree.js').then(m => m.avlTreeArticle),
  'heap': () => import('../content/data-structures/trees/heap.js').then(m => m.heapArticle),
  'trie': () => import('../content/data-structures/trees/trie.js').then(m => m.trieArticle),
};

const VIEW_MODES = {
  sorting: 'bars',
  'data-structures': 'tree',
  graphs: 'graph',
  searching: 'search',
  concepts: 'tree',
};

function getPlaceholder(algorithmId) {
  if (algorithmId === 'recursion') return 'Single integer n (1 to 7), e.g. 5';
  if (algorithmId === 'trie') return 'Words e.g. cat, car, card, dog';
  if (['dfs', 'bfs', 'topological-sort', 'dijkstra', 'bellman-ford', 'kruskal', 'prim'].includes(algorithmId)) {
    return 'Edges e.g. 0-1, 0-2, 1-3, 2-4';
  }
  return 'e.g. 35, 12, 48, 20, 9, 27';
}

function calculateInputSize(algorithmId, input) {
  if (!input) return 5;
  if (algorithmId === 'recursion') {
    return Array.isArray(input) ? input[0] : 5;
  }
  if (Array.isArray(input)) {
    return input.length;
  }
  if (typeof input === 'object' && input.nodeCount) {
    return input.nodeCount;
  }
  return 5;
}

export default function AlgorithmDetail() {
  const { section, algorithm: algorithmId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const algorithmMeta = getAlgorithm(section, algorithmId);
  const siblings = getSiblingAlgorithms(section, algorithmId);
  const limits = useMemo(() => SIZE_LIMITS[section] || { min: 3, max: 40, default: 10 }, [section]);
  const defaultView = VIEW_MODES[section] || 'bars';

  const urlSpeed = parseInt(searchParams.get('speed')) || 2;
  const rawSize = parseInt(searchParams.get('size'));
  const urlSize = !isNaN(rawSize)
    ? Math.max(limits.min, Math.min(limits.max, rawSize))
    : limits.default || 10;
  const urlView = searchParams.get('view') || defaultView;

  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [articleContent, setArticleContent] = useState(null);

  const [currentInput, setCurrentInput] = useState(() => {
    return DEFAULT_INPUTS[algorithmId] || generateRandomInput(algorithmId, urlSize);
  });

  const [inputText, setInputText] = useState(() => {
    const initial = DEFAULT_INPUTS[algorithmId] || generateRandomInput(algorithmId, urlSize);
    return formatInputToString(algorithmId, initial);
  });

  const currentSize = calculateInputSize(algorithmId, currentInput);

  const [player, dispatch] = useReducer(playerReducer, {
    ...initialPlayer,
    delayMs: getDelayFromPreset(urlSpeed),
  });

  useEffect(() => {
    const limitsForSection = SIZE_LIMITS[section] || { min: 3, max: 40, default: 10 };
    const querySize = parseInt(searchParams.get('size'));
    const sizeToUse = !isNaN(querySize)
      ? Math.max(limitsForSection.min, Math.min(limitsForSection.max, querySize))
      : limitsForSection.default || 10;

    const initial = DEFAULT_INPUTS[algorithmId] || generateRandomInput(algorithmId, sizeToUse);
    setCurrentInput(initial);
    setInputText(formatInputToString(algorithmId, initial));
    setInputError(null);
    dispatch({ type: 'reset' });
  }, [algorithmId, section, searchParams]);

  const generateSteps = useCallback(async (input) => {
    setLoading(true);
    setError(null);
    try {
      const generatorModule = await ALGORITHM_GENERATORS[algorithmId]();
      const newSteps = generatorModule(input);
      setSteps(newSteps);
      dispatch({ type: 'load', stepCount: newSteps.length });
    } catch (err) {
      setError(err.message);
      console.error('Algorithm error:', err);
    } finally {
      setLoading(false);
    }
  }, [algorithmId]);

  useEffect(() => {
    generateSteps(currentInput);
  }, [generateSteps, currentInput]);

  useEffect(() => {
    if (ALGORITHM_ARTICLES[algorithmId]) {
      ALGORITHM_ARTICLES[algorithmId]()
        .then((art) => setArticleContent(art))
        .catch(() => setArticleContent(null));
    } else {
      setArticleContent(null);
    }
  }, [algorithmId]);

  useEffect(() => {
    dispatch({ type: 'speed', delayMs: getDelayFromPreset(urlSpeed) });
  }, [urlSpeed]);

  const handlePlayPause = useCallback(() => {
    dispatch({ type: player.status === 'playing' ? 'pause' : 'play' });
  }, [player.status]);

  const handleStep = useCallback(() => {
    dispatch({ type: 'step' });
  }, []);

  const handleBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const handleSpeedChange = useCallback((preset) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('speed', preset);
      return next;
    }, { replace: true });
    dispatch({ type: 'speed', delayMs: getDelayFromPreset(preset) });
  }, [setSearchParams]);

  // Working Size Slider Change: dynamically resizes input and updates input box
  const handleSizeChange = useCallback((newSize) => {
    const clampedSize = Math.max(limits.min, Math.min(limits.max, newSize));
    const resized = resizeInput(algorithmId, currentInput, clampedSize);
    setCurrentInput(resized);
    setInputText(formatInputToString(algorithmId, resized));
    setInputError(null);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('size', clampedSize);
      return next;
    }, { replace: true });
    dispatch({ type: 'reset' });
  }, [algorithmId, currentInput, limits, setSearchParams]);

  // Apply custom typed input
  const handleApplyInput = useCallback(() => {
    const parsed = parseInputFromString(algorithmId, inputText);
    if (!parsed) {
      setInputError('Invalid format for this algorithm');
      return;
    }
    setInputError(null);
    setCurrentInput(parsed);
    const newSize = calculateInputSize(algorithmId, parsed);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('size', newSize);
      return next;
    }, { replace: true });
    dispatch({ type: 'reset' });
  }, [algorithmId, inputText, setSearchParams]);

  // Randomize button
  const handleRandomize = useCallback(() => {
    const targetSize = Math.max(limits.min, Math.min(limits.max, currentSize || limits.default));
    const randomized = generateRandomInput(algorithmId, targetSize);
    setCurrentInput(randomized);
    setInputText(formatInputToString(algorithmId, randomized));
    setInputError(null);
    dispatch({ type: 'reset' });
  }, [algorithmId, currentSize, limits]);

  const handleSetTargetPresent = useCallback(() => {
    const rawArr = Array.isArray(currentInput)
      ? currentInput
      : (currentInput?.array || []);
    if (rawArr.length === 0) return;
    const picked = rawArr[Math.floor(Math.random() * rawArr.length)];
    setCurrentInput({ array: rawArr, target: picked });
    dispatch({ type: 'reset' });
  }, [currentInput]);

  const handleSetTargetMissing = useCallback(() => {
    const rawArr = Array.isArray(currentInput)
      ? currentInput
      : (currentInput?.array || []);
    if (rawArr.length === 0) return;
    const maxVal = Math.max(...rawArr, 0);
    const missing = maxVal + 7;
    setCurrentInput({ array: rawArr, target: missing });
    dispatch({ type: 'reset' });
  }, [currentInput]);

  const handleViewChange = useCallback((view) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('view', view);
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  useTicker(player.status === 'playing', player.delayMs, player.index, () => {
    dispatch({ type: 'tick' });
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.key === ' ') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleBack();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (e.key === '[') {
        e.preventDefault();
        handleSpeedChange(Math.min(3, urlSpeed + 1));
      } else if (e.key === ']') {
        e.preventDefault();
        handleSpeedChange(Math.max(1, urlSpeed - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePlayPause, handleStep, handleBack, handleReset, handleSpeedChange, urlSpeed]);

  const currentStep = steps[player.index] || null;
  const canvasView = urlView;

  const renderCanvas = () => {
    if (canvasView === 'search' || section === 'searching') {
      return (
        <>
          <SearchCanvas currentStep={currentStep} algorithmId={algorithmId} />
          <SearchCanvasLegend />
        </>
      );
    }
    if (canvasView === 'bars' || section === 'sorting') {
      return (
        <>
          <BarsCanvas currentStep={currentStep} delayMs={player.delayMs} view={canvasView} />
          <BarsCanvasLegend />
        </>
      );
    }
    if (algorithmId === 'stack' || algorithmId === 'queue') {
      return <StackQueueCanvas currentStep={currentStep} algorithmId={algorithmId} />;
    }
    if (canvasView === 'tree' || section === 'data-structures' || section === 'concepts') {
      return (
        <>
          <TreeCanvas currentStep={currentStep} delayMs={player.delayMs} />
          <TreeCanvasLegend currentStep={currentStep} />
        </>
      );
    }
    if (canvasView === 'graph' || section === 'graphs') {
      return (
        <>
          <GraphCanvas currentStep={currentStep} algorithmId={algorithmId} delayMs={player.delayMs} />
          <GraphCanvasLegend />
        </>
      );
    }
    return <BarsCanvas currentStep={currentStep} delayMs={player.delayMs} view={canvasView} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Breadcrumbs section={section} algorithm={algorithmMeta?.name || algorithmId} />

      <header className="mb-6">
        <h1 className="font-serif text-3xl text-[var(--text-0)] mb-1 tracking-tight">{algorithmMeta?.name || algorithmId}</h1>
        <p className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed font-sans">{algorithmMeta?.blurb || ''}</p>
      </header>

      <div className="mb-6">
        <div className="bg-[var(--bg-1)] border border-[var(--border)] overflow-hidden">
          {/* Interactive Custom Input Bar */}
          <div className="px-4 py-2 bg-[var(--bg-0)] border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[11px] select-none">
                Input:
              </span>
              <input
                type="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setInputError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyInput();
                }}
                placeholder={getPlaceholder(algorithmId)}
                className={`flex-1 px-2.5 py-1 bg-[var(--bg-0)] border rounded text-xs font-mono text-[var(--text-0)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${inputError ? 'border-[var(--swap)]' : 'border-[var(--border)] focus:border-[var(--accent)]'
                  }`}
                aria-label="Custom algorithm input"
              />
              <button
                onClick={handleApplyInput}
                className="px-3 py-1 bg-[var(--accent)] text-[var(--bg-0)] font-semibold rounded text-xs font-mono hover:opacity-90 transition-opacity"
              >
                Set
              </button>
            </div>

            <div className="flex items-center gap-2">
              {inputError && (
                <span className="text-[var(--swap)] text-[11px] font-mono">{inputError}</span>
              )}
              {section === 'searching' && (
                <>
                  <button
                    onClick={handleSetTargetPresent}
                    className="px-2.5 py-1 rounded bg-[var(--bg-2)] border border-[var(--border)] text-[var(--done)] hover:border-[var(--done)] text-xs font-mono transition-colors"
                    title="Set target to a number present in the array"
                  >
                    Target present
                  </button>
                  <button
                    onClick={handleSetTargetMissing}
                    className="px-2.5 py-1 rounded bg-[var(--bg-2)] border border-[var(--border)] text-[var(--swap)] hover:border-[var(--swap)] text-xs font-mono transition-colors"
                    title="Set target to a number missing from the array"
                  >
                    Target missing
                  </button>
                </>
              )}
              <button
                onClick={handleRandomize}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bg-2)] border border-[var(--border)] text-[var(--text-1)] hover:text-[var(--text-0)] hover:bg-[var(--bg-1)] text-xs font-mono transition-colors"
                title="Generate random input"
              >
                <IconShuffle size={13} />
                <span>Random</span>
              </button>
            </div>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="h-[320px] flex flex-col justify-end gap-2 p-6 animate-pulse">
                <div className="flex items-end justify-center gap-3 h-48">
                  <div className="w-8 bg-[var(--bg-2)] rounded-sm h-24"></div>
                  <div className="w-8 bg-[var(--bg-2)] rounded-sm h-36"></div>
                  <div className="w-8 bg-[var(--bg-2)] rounded-sm h-16"></div>
                  <div className="w-8 bg-[var(--bg-2)] rounded-sm h-44"></div>
                  <div className="w-8 bg-[var(--bg-2)] rounded-sm h-28"></div>
                  <div className="w-8 bg-[var(--bg-2)] rounded-sm h-40"></div>
                </div>
                <div className="h-4 bg-[var(--bg-2)] rounded-sm w-48 mx-auto mt-4"></div>
              </div>
            ) : (
              renderCanvas()
            )}
          </div>

          {currentStep?.note && (
            <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg-0)]/70 text-xs font-mono text-[var(--text-1)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-bold select-none">&gt;</span>
              <span className="truncate">{currentStep.note}</span>
            </div>
          )}

          <PlayerToolbar
            status={player.status}
            index={player.index}
            stepCount={player.stepCount}
            delayMs={player.delayMs}
            speedPreset={urlSpeed}
            view={canvasView}
            onPlayPause={handlePlayPause}
            onStep={handleStep}
            onBack={handleBack}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
            onViewChange={handleViewChange}
            onSizeChange={handleSizeChange}
            onRandomize={handleRandomize}
            size={currentSize}
            minSize={limits.min}
            maxSize={limits.max}
          />
        </div>
      </div>

      {error && (
        <div className="bg-[var(--bg-1)] border border-[var(--swap)] rounded p-4 mb-6 text-[var(--swap)] text-xs font-mono">
          Error: {error}
        </div>
      )}

      <Article article={articleContent} siblingAlgorithms={siblings} />
    </div>
  );
}
