import { useState } from 'react';
import { IconCopy, IconCheck } from './Icons.jsx';

const LANGUAGES = [
  { id: 'python', label: 'Python', ext: 'py' },
  { id: 'javascript', label: 'JavaScript', ext: 'js' },
  { id: 'java', label: 'Java', ext: 'java' },
  { id: 'cpp', label: 'C++', ext: 'cpp' },
  { id: 'c', label: 'C', ext: 'c' },
];

export function CodeTabs({ code }) {
  const [activeTab, setActiveTab] = useState('python');
  const [copied, setCopied] = useState(null);

  const handleCopy = async (lang) => {
    try {
      await navigator.clipboard.writeText(code[lang] || '');
      setCopied(lang);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const currentCode = code[activeTab] || '// No implementation available';

  return (
    <div className="bg-[var(--bg-1)] border border-[var(--border)] rounded overflow-hidden">
      <div className="flex gap-1 p-2 bg-[var(--bg-2)] border-b border-[var(--border)] overflow-x-auto">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActiveTab(lang.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono font-medium whitespace-nowrap transition-colors ${activeTab === lang.id
                ? 'bg-[var(--bg-0)] text-[var(--accent)] border border-[var(--border)]'
                : 'text-[var(--text-1)] hover:text-[var(--text-0)] hover:bg-[var(--bg-0)]'
              }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <div className="relative p-4">
        <pre className="text-xs font-mono text-[var(--text-0)] overflow-x-auto max-h-[420px] leading-relaxed">
          <code>{currentCode}</code>
        </pre>
        <button
          onClick={() => handleCopy(activeTab)}
          className="absolute top-4 right-4 p-1.5 rounded bg-[var(--bg-2)] border border-[var(--border)] text-[var(--text-1)] hover:text-[var(--text-0)] hover:bg-[var(--bg-1)] transition-colors"
          aria-label={`Copy ${LANGUAGES.find(l => l.id === activeTab)?.label} code`}
        >
          {copied === activeTab ? <IconCheck size={14} className="text-[var(--done)]" /> : <IconCopy size={14} />}
        </button>
      </div>
    </div>
  );
}
