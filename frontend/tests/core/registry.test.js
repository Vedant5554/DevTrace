import { describe, it, expect } from 'vitest';
import {
  SECTIONS,
  ALGORITHMS,
  getAlgorithm,
  getSectionAlgorithms,
  getComparisonTable,
  getSiblingAlgorithms,
} from '../../src/core/registry.js';

describe('registry module', () => {
  it('contains exactly 5 main curriculum sections', () => {
    expect(SECTIONS.length).toBe(5);
    const ids = SECTIONS.map(s => s.id);
    expect(ids).toEqual(['sorting', 'data-structures', 'graphs', 'searching', 'concepts']);
  });

  it('contains exactly 29 total algorithms across sections', () => {
    const totalCount = Object.values(ALGORITHMS).reduce((sum, list) => sum + list.length, 0);
    expect(totalCount).toBe(29);
    expect(ALGORITHMS.sorting.length).toBe(8);
    expect(ALGORITHMS['data-structures'].length).toBe(11);
    expect(ALGORITHMS.graphs.length).toBe(7);
    expect(ALGORITHMS.searching.length).toBe(2);
    expect(ALGORITHMS.concepts.length).toBe(1);
  });

  it('retrieves an algorithm by section and id', () => {
    const algo = getAlgorithm('sorting', 'bubble-sort');
    expect(algo).toBeDefined();
    expect(algo.name).toBe('Bubble Sort');
    expect(algo.blurb).toBeDefined();
  });

  it('returns null for nonexistent algorithm or section', () => {
    expect(getAlgorithm('sorting', 'unknown-id')).toBeNull();
    expect(getAlgorithm('invalid-section', 'bubble-sort')).toBeNull();
  });

  it('returns list of algorithms for a given section', () => {
    const sortingList = getSectionAlgorithms('sorting');
    expect(sortingList.length).toBe(8);
    expect(getSectionAlgorithms('invalid-section')).toEqual([]);
  });

  it('returns comparison tables with headers and rows for sections', () => {
    const table = getComparisonTable('sorting');
    expect(table).toBeDefined();
    expect(table.columns.length).toBeGreaterThan(0);
    expect(table.rows.length).toBe(8);

    expect(getComparisonTable('nonexistent')).toBeNull();
  });

  it('computes sibling algorithms for navigation correctly', () => {
    // First algorithm in sorting
    const firstSiblings = getSiblingAlgorithms('sorting', 'bubble-sort');
    expect(firstSiblings.prev).toBeNull();
    expect(firstSiblings.next).toBeDefined();
    expect(firstSiblings.next.id).toBe('selection-sort');

    // Middle algorithm in sorting
    const midSiblings = getSiblingAlgorithms('sorting', 'selection-sort');
    expect(midSiblings.prev.id).toBe('bubble-sort');
    expect(midSiblings.next.id).toBe('insertion-sort');

    // Last algorithm in sorting
    const lastSiblings = getSiblingAlgorithms('sorting', 'counting-sort');
    expect(lastSiblings.prev.id).toBe('radix-sort');
    expect(lastSiblings.next).toBeNull();

    // Invalid algorithm
    const invalidSiblings = getSiblingAlgorithms('sorting', 'missing');
    expect(invalidSiblings).toEqual({ prev: null, next: null });
  });
});

