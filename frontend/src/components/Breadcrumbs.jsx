import { Link } from 'react-router-dom';
import { IconChevronRight } from './Icons.jsx';

const SECTION_LABELS = {
  sorting: 'Sorting',
  'data-structures': 'Data Structures',
  graphs: 'Graphs',
  searching: 'Searching',
  concepts: 'Concepts',
};

export function Breadcrumbs({ section, algorithm }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] py-3" aria-label="Breadcrumb">
      <Link to="/visualize" className="hover:text-[var(--text-0)] transition-colors">
        Visualizations
      </Link>
      {section && (
        <>
          <IconChevronRight size={14} className="text-[var(--text-muted)]" aria-hidden="true" />
          <Link
            to={`/visualize/${section}`}
            className="hover:text-[var(--text-0)] transition-colors capitalize"
          >
            {SECTION_LABELS[section] || section}
          </Link>
        </>
      )}
      {algorithm && (
        <>
          <IconChevronRight size={14} className="text-[var(--text-muted)]" aria-hidden="true" />
          <span className="text-[var(--text-0)] font-medium capitalize">{algorithm.replace(/-/g, ' ')}</span>
        </>
      )}
    </nav>
  );
}
