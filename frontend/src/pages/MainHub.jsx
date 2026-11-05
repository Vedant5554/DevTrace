import { Link } from 'react-router-dom';
import {
  IconArrowRight,
  IconSorting,
  IconDataStructures,
  IconGraphs,
  IconSearching,
  IconConcepts
} from '../components/Icons.jsx';
import { SECTIONS } from '../core/registry.js';

const sectionDetails = {
  sorting: {
    icon: IconSorting,
    description: 'Compare and sort elements with 8 classic algorithms including Bubble, Quick, Merge, and Heap Sort',
    count: 8,
  },
  'data-structures': {
    icon: IconDataStructures,
    description: 'Explore 9 fundamental data structures: trees, lists, hash tables, and more with interactive operations',
    count: 9,
  },
  graphs: {
    icon: IconGraphs,
    description: 'Traverse and analyze graph structures with 7 algorithms: DFS, BFS, Dijkstra, and MST algorithms',
    count: 7,
  },
  searching: {
    icon: IconSearching,
    description: 'Find elements efficiently in sorted and unsorted data with Linear and Binary Search',
    count: 2,
  },
  concepts: {
    icon: IconConcepts,
    description: 'Understand core algorithmic concepts like recursion with interactive call stack visualization',
    count: 1,
  },
};

export default function MainHub() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl text-[var(--text-0)] mb-3 tracking-tight">Algorithm Visualizer</h1>
        <p className="text-[var(--text-1)] text-sm max-w-2xl leading-relaxed font-sans">
          Step-by-step execution tracer with memory state playback, complexity references, and syntax-highlighted source code across 5 programming languages.
        </p>
      </header>

      <section aria-label="Algorithm sections">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((section, idx) => {
            const details = sectionDetails[section.id];
            const Icon = details.icon;
            const isLast = idx === SECTIONS.length - 1; // Concepts is the 5th item

            return (
              <Link
                key={section.id}
                to={`/visualize/${section.id}`}
                className={`group flex flex-col justify-between p-6 bg-[var(--bg-1)] border border-[var(--border)] rounded-md hover:bg-[var(--bg-2)] transition-colors duration-150 ${isLast ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded bg-[var(--bg-2)] text-[var(--text-0)]">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] font-medium">
                      {details.count} {details.count === 1 ? 'algorithm' : 'algorithms'}
                    </span>
                  </div>
                  <h2 className="font-serif text-[var(--text-0)] text-xl font-medium mb-2 tracking-tight">
                    {section.name}
                  </h2>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed font-sans">
                    {details.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-sans font-medium text-[var(--text-1)] group-hover:text-[var(--text-0)]">
                  <span>Explore section</span>
                  <IconArrowRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--text-0)] transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
