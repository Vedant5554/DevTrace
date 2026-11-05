import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconMenu, IconClose, IconSearch, IconChevronDown, IconGithub } from './Icons.jsx';
import { ALGORITHMS } from '../core/registry.js';

const SECTIONS = [
  { id: 'sorting', name: 'Sorting' },
  { id: 'data-structures', name: 'Data Structures' },
  { id: 'graphs', name: 'Graphs' },
  { id: 'searching', name: 'Searching' },
  { id: 'concepts', name: 'Concepts' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSectionOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSectionOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.toLowerCase().trim();
      if (query) {
        const allAlgorithms = SECTIONS.flatMap((s) =>
          (ALGORITHMS[s.id] || []).map((a) => ({
            ...a,
            section: s.id,
            sectionName: s.name,
          }))
        );
        const match = allAlgorithms.find(
          (a) => a.name.toLowerCase().includes(query) || a.id.includes(query)
        );
        if (match) {
          window.location.href = `/visualize/${match.section}/${match.id}`;
          e.target.value = '';
        }
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[var(--bg-0)] border-b border-[var(--border)] flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-1.5 -ml-1 text-[var(--text-1)] hover:text-[var(--text-0)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
        </button>
        <Link to="/visualize" className="flex items-center gap-2.5" aria-label="DevTrace Home">
          <img src="/favicon.svg" alt="DevTrace" className="w-7 h-7 object-contain" />
          <span className="font-sans text-[15px] font-semibold tracking-tight text-[var(--text-0)] hidden sm:block">devtrace</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-1.5" aria-label="Section navigation">
        {SECTIONS.map((section) => {
          const isActive = location.pathname.startsWith(`/visualize/${section.id}`);
          return (
            <Link
              key={section.id}
              to={`/visualize/${section.id}`}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase font-sans rounded-md transition-colors ${isActive
                ? 'text-[var(--text-0)] bg-[var(--bg-2)]'
                : 'text-[var(--text-1)] hover:text-[var(--text-0)] hover:bg-[var(--bg-2)]/60'
                }`}
            >
              {section.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 flex-1 max-w-sm mx-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={15} />
          <input
            ref={searchRef}
            type="search"
            placeholder="Search algorithms... (Cmd+K)"
            onKeyDown={handleSearch}
            className="w-full pl-8 pr-3 py-1.5 bg-[var(--bg-1)] border border-[var(--border)] text-[var(--text-0)] placeholder-[var(--text-muted)] text-xs font-sans focus:outline-none focus:border-[var(--accent)] tracking-wide"
            aria-label="Search algorithms"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            className="md:hidden p-1.5 text-[var(--text-1)] hover:text-[var(--text-0)]"
            onClick={() => setSectionOpen(!sectionOpen)}
            aria-label="Sections menu"
          >
            <IconChevronDown size={18} />
          </button>
          {sectionOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-[var(--bg-1)] border border-[var(--border)] rounded py-1">
              {SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  to={`/visualize/${section.id}`}
                  className="block px-3 py-1.5 text-xs text-[var(--text-1)] hover:text-[var(--text-0)] hover:bg-[var(--bg-2)]"
                >
                  {section.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <a
          href="https://github.com/Vedant5554/DevTrace.git"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-[var(--text-1)] hover:text-[var(--accent)] transition-colors"
          aria-label="GitHub Repository"
        >
          <IconGithub size={18} />
        </a>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[var(--bg-0)] flex flex-col p-6 pt-20">
          <nav className="flex flex-col gap-3">
            {SECTIONS.map((section) => (
              <Link
                key={section.id}
                to={`/visualize/${section.id}`}
                className={`px-4 py-2.5 text-sm tracking-widest uppercase font-sans border-b border-[var(--border)] ${location.pathname.startsWith(`/visualize/${section.id}`)
                  ? 'text-[var(--text-0)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-1)]'
                  }`}
              >
                {section.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
