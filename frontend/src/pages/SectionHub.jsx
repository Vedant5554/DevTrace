import { useParams } from 'react-router-dom';
import { AlgorithmCard } from '../components/AlgorithmCard.jsx';
import { ComparisonTable } from '../components/ComparisonTable.jsx';
import { Breadcrumbs } from '../components/Breadcrumbs.jsx';
import { getSectionAlgorithms } from '../core/registry.js';

const sectionInfo = {
  sorting: { name: 'Sorting Algorithms', description: 'Explore 8 sorting algorithms with interactive visualizations and detailed complexity analysis.' },
  'data-structures': { name: 'Data Structures', description: 'Visualize 9 fundamental data structures and their core operations.' },
  graphs: { name: 'Graph Algorithms', description: 'Traverse and analyze graphs with 7 classic algorithms.' },
  searching: { name: 'Searching Algorithms', description: 'Find elements efficiently in sorted and unsorted data.' },
  concepts: { name: 'Algorithmic Concepts', description: 'Understand core concepts like recursion with interactive call stack.' },
};

export default function SectionHub() {
  const { section } = useParams();
  const algorithms = getSectionAlgorithms(section);
  const info = sectionInfo[section] || { name: section, description: '' };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Breadcrumbs section={section} />

      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--text-0)] mb-1.5">{info.name}</h1>
        <p className="text-[var(--text-1)] text-xs leading-relaxed">{info.description}</p>
      </header>

      <section aria-label={`${info.name} grid`} className="mb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {algorithms.map((algo) => (
            <AlgorithmCard key={algo.id} algorithm={algo} section={section} />
          ))}
        </div>
      </section>

      <ComparisonTable section={section} />
    </div>
  );
}
