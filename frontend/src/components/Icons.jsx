export function IconMenu({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

export function IconClose({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export function IconSearch({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

export function IconChevronDown({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

export function IconChevronRight({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

export function IconArrowRight({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

export function IconGithub({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function IconPlay({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
}

export function IconPause({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  );
}

export function IconSkipBack({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="19 20 9 12 19 4 19 20"></polygon>
      <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2"></line>
    </svg>
  );
}

export function IconSkipForward({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="5 4 15 12 5 20 5 4"></polygon>
      <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"></line>
    </svg>
  );
}

export function IconReset({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="1 4 1 10 7 10"></polyline>
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
    </svg>
  );
}

export function IconCopy({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}

export function IconCheck({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export function IconSorting({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  );
}

export function IconBubbleSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="16" width="3" height="5" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="7.5" y="12" width="3" height="9" rx="0.5" fill="var(--accent)" />
      <rect x="12.5" y="8" width="3" height="13" rx="0.5" fill="currentColor" fillOpacity="0.7" />
      <rect x="17.5" y="4" width="3" height="17" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <path
        d="M 9 8.5 C 9.5 4, 13.5 4, 14 8.5"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 7.5 7 L 9 8.5 L 10.5 7"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 12.5 7 L 14 8.5 L 15.5 7"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSelectionSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="15" width="3" height="6" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="7.5" y="11" width="3" height="10" rx="0.5" fill="var(--accent)" />
      <rect x="12.5" y="7" width="3" height="14" rx="0.5" fill="currentColor" fillOpacity="0.7" />
      <rect x="17.5" y="4" width="3" height="17" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <line x1="9" y1="2" x2="9" y2="7.5" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" />
      <polyline points="6.75 5.5, 9 7.75, 11.25 5.5" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconInsertionSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="16" width="3" height="5" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="7.5" y="9" width="3" height="12" rx="0.5" fill="var(--accent)" />
      <rect x="12.5" y="6" width="3" height="15" rx="0.5" fill="currentColor" fillOpacity="0.7" />
      <rect x="17.5" y="4" width="3" height="17" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <path
        d="M 17.5 2.5 C 14.5 1, 9 2, 9 6"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polyline
        points="7.25 4.25, 9 6.25, 10.75 4.5"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMergeSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="3" width="8" height="5" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="13.5" y="3" width="8" height="5" rx="1" fill="currentColor" fillOpacity="0.35" />
      <path d="M 6.5 10 L 9.5 13" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="7.5 13, 9.5 13, 9.5 11" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 17.5 10 L 14.5 13" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="14.5 11, 14.5 13, 16.5 13" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2.5" y="16" width="3.75" height="5" rx="0.5" fill="var(--accent)" />
      <rect x="7.25" y="16" width="3.75" height="5" rx="0.5" fill="var(--accent)" />
      <rect x="13" y="16" width="3.75" height="5" rx="0.5" fill="var(--accent)" />
      <rect x="17.75" y="16" width="3.75" height="5" rx="0.5" fill="var(--accent)" />
    </svg>
  );
}

export function IconQuickSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="2.5" x2="12" y2="21.5" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" />
      <rect x="3" y="14" width="3" height="7" rx="0.5" fill="currentColor" fillOpacity="0.35" />
      <rect x="7.5" y="9" width="3" height="12" rx="0.5" fill="currentColor" fillOpacity="0.7" />
      <rect x="13.5" y="7" width="3" height="14" rx="0.5" fill="currentColor" fillOpacity="0.7" />
      <rect x="18" y="11" width="3" height="10" rx="0.5" fill="currentColor" fillOpacity="0.35" />
      <path d="M 5.5 6 L 2 6 M 3.5 4.5 L 2 6 L 3.5 7.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 18.5 6 L 22 6 M 20.5 4.5 L 22 6 L 20.5 7.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHeapSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="6" x2="6.5" y2="12.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <line x1="12" y1="6" x2="17.5" y2="12.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <line x1="6.5" y1="12.5" x2="3.5" y2="18.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <line x1="6.5" y1="12.5" x2="9.5" y2="18.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <line x1="17.5" y1="12.5" x2="14.5" y2="18.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <line x1="17.5" y1="12.5" x2="20.5" y2="18.5" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <circle cx="3.5" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
      <circle cx="9.5" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
      <circle cx="14.5" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
      <circle cx="20.5" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
      <circle cx="6.5" cy="12.5" r="2.25" fill="currentColor" fillOpacity="0.7" />
      <circle cx="17.5" cy="12.5" r="2.25" fill="currentColor" fillOpacity="0.7" />
      <circle cx="12" cy="5" r="2.75" fill="var(--accent)" />
    </svg>
  );
}

export function IconRadixSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="2.5" width="5.5" height="6.5" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <text x="5.25" y="7.2" textAnchor="middle" fontSize="5" fontWeight="600" fill="currentColor" fontFamily="monospace">3</text>
      <rect x="9.25" y="2.5" width="5.5" height="6.5" rx="1" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.25" />
      <text x="12" y="7.2" textAnchor="middle" fontSize="5" fontWeight="700" fill="var(--accent)" fontFamily="monospace">1</text>
      <rect x="16" y="2.5" width="5.5" height="6.5" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <text x="18.75" y="7.2" textAnchor="middle" fontSize="5" fontWeight="600" fill="currentColor" fontFamily="monospace">2</text>
      <path d="M 5.25 10.5 L 5.25 14 M 4 12.75 L 5.25 14 L 6.5 12.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
      <path d="M 12 10.5 L 12 14 M 10.5 12.5 L 12 14 L 13.5 12.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 18.75 10.5 L 18.75 14 M 17.5 12.75 L 18.75 14 L 20 12.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
      <rect x="2.5" y="16" width="5.5" height="5" rx="0.75" fill="currentColor" fillOpacity="0.3" />
      <rect x="9.25" y="16" width="5.5" height="5" rx="0.75" fill="var(--accent)" />
      <rect x="16" y="16" width="5.5" height="5" rx="0.75" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export function IconCountingSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="14" width="3" height="7" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="6.5" y="9" width="3" height="12" rx="0.5" fill="currentColor" fillOpacity="0.6" />
      <rect x="10.5" y="4" width="3" height="17" rx="0.5" fill="var(--accent)" />
      <rect x="14.5" y="9" width="3" height="12" rx="0.5" fill="currentColor" fillOpacity="0.6" />
      <rect x="18.5" y="12" width="3" height="9" rx="0.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

/* --- Data Structures Icons (Mechanism Matched) --- */

export function IconStack({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4.5" width="16" height="4" rx="1.5" fill="var(--accent)" />
      <rect x="4" y="10" width="16" height="4" rx="1.5" fill="currentColor" fillOpacity="0.65" />
      <rect x="4" y="15.5" width="16" height="4" rx="1.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export function IconQueue({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Enqueue arrow */}
      <path d="M 1.5 12 L 4.5 12 M 3 10.5 L 4.5 12 L 3 13.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Queue slots */}
      <rect x="6.5" y="6" width="3.2" height="12" rx="0.75" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
      <rect x="10.4" y="6" width="3.2" height="12" rx="0.75" fill="currentColor" fillOpacity="0.65" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
      <rect x="14.3" y="6" width="3.2" height="12" rx="0.75" fill="var(--accent)" stroke="var(--accent)" strokeWidth="0.75" />
      {/* Dequeue arrow */}
      <path d="M 19.5 12 L 22.5 12 M 21 10.5 L 22.5 12 L 21 13.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLinkedList({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="4.5" cy="12" r="2.75" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7.25" y1="12" x2="9.25" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.75" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14.75" y1="12" x2="16.75" y2="12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19.5" cy="12" r="2.75" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}

export function IconDoublyLinkedList({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="4.5" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.25" />
      {/* Bidirectional arrows 1 <-> 2 */}
      <path d="M 7.2 10.5 L 9.3 10.5 M 8.5 9.5 L 9.3 10.5 L 8.5 11.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
      <path d="M 9.3 13.5 L 7.2 13.5 M 8 12.5 L 7.2 13.5 L 8 14.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1.25" />
      {/* Bidirectional arrows 2 <-> 3 */}
      <path d="M 14.7 10.5 L 16.8 10.5 M 16 9.5 L 16.8 10.5 L 16 11.5" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16.8 13.5 L 14.7 13.5 M 15.5 12.5 L 14.7 13.5 L 15.5 14.5" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19.5" cy="12" r="2.5" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.25" />
    </svg>
  );
}

export function IconHashTable({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 10 5.5 L 10 7.5 M 14 5.5 L 14 7.5 M 9 6.5 L 15 6.5" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="9" y1="9" x2="9" y2="21" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="15" y1="9" x2="15" y2="21" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}

export function IconHashMap({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Key box [k] */}
      <rect x="2.5" y="6.5" width="7" height="11" rx="1.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.25" />
      <text x="6" y="14" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="currentColor" fontFamily="monospace">k</text>
      {/* Mapping Arrow */}
      <path d="M 10.5 12 L 13.5 12 M 12.5 10.5 L 13.5 12 L 12.5 13.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Value box [v] */}
      <rect x="14.5" y="6.5" width="7" height="11" rx="1.5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.25" />
      <text x="18" y="14" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="var(--accent)" fontFamily="monospace">v</text>
    </svg>
  );
}

export function IconBinaryTree({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="6" x2="6.5" y2="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="12" y1="6" x2="17.5" y2="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="12" cy="6" r="3" fill="var(--accent)" />
      <circle cx="6.5" cy="14" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.5" cy="14" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4" cy="19.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="9" cy="19.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <line x1="6.5" y1="14" x2="4" y2="19.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="6.5" y1="14" x2="9" y2="19.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}

export function IconBST({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="6" x2="6" y2="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="12" y1="6" x2="18" y2="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="12" cy="6" r="3" fill="var(--accent)" />
      <circle cx="6" cy="15" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="18" cy="15" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      {/* Branch comparison indicators */}
      <path d="M 7.5 9.5 L 6.5 10.5 L 7.5 11.5" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16.5 9.5 L 17.5 10.5 L 16.5 11.5" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAVLTree({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="6" x2="6" y2="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="12" y1="6" x2="18" y2="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="12" cy="6" r="3" fill="var(--accent)" />
      <circle cx="6" cy="15" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="18" cy="15" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      {/* Balance scale marker T at junction */}
      <path d="M 10.5 10.5 L 13.5 10.5 M 12 10.5 L 12 13" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconHeapTree({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="5.5" x2="7" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="12" y1="5.5" x2="17" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="7" y1="12.5" x2="4.5" y2="18.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="7" y1="12.5" x2="9.5" y2="18.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="17" y1="12.5" x2="14.5" y2="18.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="17" y1="12.5" x2="19.5" y2="18.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="4.5" cy="18.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="9.5" cy="18.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="14.5" cy="18.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="19.5" cy="18.5" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="7" cy="12.5" r="2.25" fill="currentColor" fillOpacity="0.65" />
      <circle cx="17" cy="12.5" r="2.25" fill="currentColor" fillOpacity="0.65" />
      <circle cx="12" cy="5.5" r="2.75" fill="var(--accent)" />
    </svg>
  );
}

export function IconTrie({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="4.5" r="2.5" fill="var(--accent)" />
      <line x1="12" y1="7" x2="5.5" y2="14" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <line x1="12" y1="7" x2="12" y2="14" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <line x1="12" y1="7" x2="18.5" y2="14" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
      <rect x="3.25" y="14" width="4.5" height="5.5" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <text x="5.5" y="18.2" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="currentColor" fontFamily="monospace">a</text>
      <rect x="9.75" y="14" width="4.5" height="5.5" rx="1" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.25" />
      <text x="12" y="18.2" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="var(--accent)" fontFamily="monospace">b</text>
      <rect x="16.25" y="14" width="4.5" height="5.5" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <text x="18.5" y="18.2" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="currentColor" fontFamily="monospace">c</text>
    </svg>
  );
}

/* --- Graph Algorithms Icons (Mechanism Matched) --- */

export function IconDFS({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="4.5" x2="19.5" y2="12" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="19.5" y1="12" x2="12" y2="19.5" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="12" y1="19.5" x2="4.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="4.5" y1="12" x2="12" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Arrow on visited path */}
      <path d="M 16.5 7.5 L 17 9.5 L 15 9" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 17 15 L 15 16.5 L 16.5 17" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="4.5" r="2.5" fill="var(--accent)" />
      <circle cx="19.5" cy="12" r="2.5" fill="var(--accent)" />
      <circle cx="12" cy="19.5" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.5" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconBFS({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="4.5" x2="6.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="12" y1="4.5" x2="17.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="6.5" y1="12.5" x2="6.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="17.5" y1="12.5" x2="17.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Concentric wavefront arc in var(--accent) */}
      <path d="M 3.5 12.5 A 10 10 0 0 1 20.5 12.5" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="12" cy="4.5" r="2.5" fill="var(--accent)" />
      <circle cx="6.5" cy="12.5" r="2.5" fill="var(--accent)" />
      <circle cx="17.5" cy="12.5" r="2.5" fill="var(--accent)" />
      <circle cx="6.5" cy="19.5" r="2.2" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1" />
      <circle cx="17.5" cy="19.5" r="2.2" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function IconTopologicalSort({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="6.5" r="2.75" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.2" />
      <text x="5" y="8.5" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="currentColor" fontFamily="monospace">A</text>
      <circle cx="5" cy="17.5" r="2.75" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.2" />
      <text x="5" y="19.5" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="currentColor" fontFamily="monospace">C</text>
      {/* Directed edges pointing into B */}
      <path d="M 8 8 L 15 11 M 13.5 9.5 L 15 11 L 13.5 12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 8 16 L 15 13 M 13.5 12 L 15 13 L 13.5 14.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18.5" cy="12" r="3.25" fill="var(--accent)" />
      <text x="18.5" y="14.2" textAnchor="middle" fontSize="5" fontWeight="700" fill="var(--bg-0)" fontFamily="monospace">B</text>
    </svg>
  );
}

export function IconDijkstra({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="6.5" r="2.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="5" cy="17.5" r="2.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="9" x2="5" y2="15" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" />
      {/* Shortest path edge with distance badge 9 */}
      <path d="M 7.5 7.5 L 15.5 12 M 13.5 11 L 15.5 12 L 14 13" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 7.5 16.5 L 15.5 12" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="1.5 1.5" />
      <circle cx="17.5" cy="12" r="3" fill="var(--accent)" />
      {/* Distance indicator */}
      <text x="19" y="7.5" fontSize="6.5" fontWeight="700" fill="var(--accent)" fontFamily="monospace">9</text>
    </svg>
  );
}

export function IconBellmanFord({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="7" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="5" cy="18" r="2.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="15" cy="12.5" r="2.5" fill="var(--accent)" />
      <line x1="5" y1="9.5" x2="5" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="7.5" y1="17" x2="13" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Negative weight edge with [-1] badge */}
      <line x1="7" y1="8" x2="13" y2="11.5" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 2" />
      <rect x="14.5" y="4" width="7.5" height="5.5" rx="1" fill="var(--accent)" />
      <text x="18.25" y="8.2" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="var(--bg-0)" fontFamily="monospace">-1</text>
    </svg>
  );
}

export function IconKruskal({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="5" y1="16.5" x2="12" y2="7.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="7.5" x2="19" y2="16.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="5" cy="16.5" r="3" fill="var(--accent)" />
      <circle cx="12" cy="7.5" r="3" fill="var(--accent)" />
      <circle cx="19" cy="16.5" r="3" fill="var(--accent)" />
    </svg>
  );
}

export function IconPrim({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="5.5" y1="16.5" x2="12" y2="8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="8" x2="18.5" y2="16.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
      <circle cx="5.5" cy="16.5" r="3" fill="var(--accent)" />
      <circle cx="12" cy="8" r="3" fill="var(--accent)" />
      <circle cx="18.5" cy="16.5" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* --- Searching Algorithms Icons --- */

export function IconLinearSearch({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* 5 array cells */}
      <rect x="2" y="8" width="3.5" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="6" y="8" width="3.5" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="10" y="8" width="3.5" height="8" rx="0.5" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.25" />
      <rect x="14" y="8" width="3.5" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="18" y="8" width="3.5" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      {/* Magnifying glass over cell 3 */}
      <circle cx="12.5" cy="15.5" r="3.25" stroke="var(--accent)" strokeWidth="1.5" fill="var(--bg-1)" />
      <line x1="15" y1="18" x2="17.5" y2="20.5" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconBinarySearch({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Midpoint split indicator (o) ↙ ↘ */}
      <circle cx="12" cy="4.5" r="2.25" fill="var(--accent)" />
      <path d="M 10.5 6.5 L 6.5 10.5 M 8 10.5 L 6.5 10.5 L 6.5 9" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 13.5 6.5 L 17.5 10.5 M 16 10.5 L 17.5 10.5 L 17.5 9" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      {/* Array cells */}
      <rect x="2" y="12.5" width="3.5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="6" y="12.5" width="3.5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="10" y="12.5" width="4" height="7" rx="0.5" fill="var(--accent)" />
      <rect x="14.5" y="12.5" width="3.5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="18.5" y="12.5" width="3.5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}

/* --- Concepts Icons --- */

export function IconRecursion({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="5" x2="6.5" y2="12" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="12" y1="5" x2="17.5" y2="12" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="6.5" y1="12" x2="4" y2="18.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="6.5" y1="12" x2="9" y2="18.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="17.5" y1="12" x2="15" y2="18.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="17.5" y1="12" x2="20" y2="18.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="12" cy="5" r="3" fill="var(--accent)" />
      <circle cx="6.5" cy="12" r="2.5" fill="var(--accent)" fillOpacity="0.75" />
      <circle cx="17.5" cy="12" r="2.5" fill="var(--accent)" fillOpacity="0.75" />
      <circle cx="4" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
      <circle cx="9" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
      <circle cx="15" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
      <circle cx="20" cy="18.5" r="1.75" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

export function IconDataStructures({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="5" rx="1"></rect>
      <rect x="3" y="10" width="18" height="5" rx="1"></rect>
      <rect x="3" y="17" width="18" height="5" rx="1"></rect>
    </svg>
  );
}

export function IconGraphs({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="6" height="6" rx="1"></rect>
      <rect x="15" y="3" width="6" height="6" rx="1"></rect>
      <rect x="9" y="15" width="6" height="6" rx="1"></rect>
      <line x1="6" y1="9" x2="12" y2="15"></line>
      <line x1="18" y1="9" x2="12" y2="15"></line>
    </svg>
  );
}

export function IconSearching({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="10" cy="10" r="6"></circle>
      <line x1="21" y1="21" x2="14.5" y2="14.5"></line>
    </svg>
  );
}

export function IconConcepts({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>
  );
}

export function IconShuffle({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 3 21 3 21 8"></polyline>
      <line x1="4" y1="20" x2="21" y2="3"></line>
      <polyline points="21 16 21 21 16 21"></polyline>
      <line x1="15" y1="15" x2="21" y2="21"></line>
      <line x1="4" y1="4" x2="9" y2="9"></line>
    </svg>
  );
}

