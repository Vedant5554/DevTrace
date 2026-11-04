import { createStep, cloneState, createMetrics, EVENT_TYPES, TRACE_LIMIT, TraceLimitError } from '../../../core/events.js';

function trie(input) {
  const nodes = { 0: { id: 0, children: {}, isEnd: false, char: '' } };
  let nextId = 1;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function addStep(type, line, note, extra = {}) {
    if (steps.length >= TRACE_LIMIT) throw new TraceLimitError();
    steps.push(createStep(type, line, note, { nodes: cloneState(nodes), highlights: {}, ...extra }, { metrics: createMetrics(comparisons, swaps, steps.length) }));
  }

  addStep(EVENT_TYPES.MARK, 0, 'Initialize empty Trie', {});

  input.forEach((word) => {
    addStep(EVENT_TYPES.MARK, 1, `Insert "${word}" into Trie`, { target: word });

    let current = 0;
    word.split('').forEach((char, charIdx) => {
      comparisons++;
      addStep(EVENT_TYPES.COMPARE, 2, `Process character '${char}' at depth ${charIdx + 1}`, {
        highlights: { visit: [current] },
        target: current,
      });

      if (!nodes[current].children[char]) {
        nodes[current].children[char] = nextId;
        nodes[nextId] = { id: nextId, children: {}, isEnd: false, char };
        addStep(EVENT_TYPES.LINK, 3, `Create new node for '${char}' (node ${nextId})`, {
          highlights: { visit: [nextId] },
          target: nextId,
        });
        nextId++;
      }

      current = nodes[current].children[char];
    });

    nodes[current].isEnd = true;
    addStep(EVENT_TYPES.MARK, 4, `Mark end of word "${word}" at node ${current}`, {
      highlights: { done: [current] },
      target: current,
    });
  });

  const searchWord = input[Math.floor(input.length / 2)];
  addStep(EVENT_TYPES.MARK, 5, `Search for "${searchWord}"`, { target: searchWord });

  let current = 0;
  let found = true;
  searchWord.split('').forEach((char, charIdx) => {
    comparisons++;
    addStep(EVENT_TYPES.COMPARE, 6, `Check for character '${char}' at depth ${charIdx + 1}`, {
      highlights: { visit: [current] },
      target: current,
    });

    if (!nodes[current].children[char]) {
      found = false;
      return;
    }
    current = nodes[current].children[char];
  });

  if (found && nodes[current].isEnd) {
    addStep(EVENT_TYPES.VISIT, 7, `Found "${searchWord}" in Trie`, {
      highlights: { done: [current] },
      target: current,
    });
  } else {
    addStep(EVENT_TYPES.MARK, 8, `"${searchWord}" not found in Trie`, {
      highlights: { visit: [current] },
      target: current,
    });
  }

  addStep(EVENT_TYPES.MARK, 9, 'Trie operations complete', {
    highlights: { done: Object.keys(nodes).map(Number) },
  });

  return steps;
}

export { trie };