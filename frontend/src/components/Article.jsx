import { Link } from 'react-router-dom';
import { CodeTabs } from './CodeTabs.jsx';

const SECTION_LABELS = {
  introduction: 'Introduction',
  complexity: 'Complexity',
  'step-by-step': 'Step-by-Step Execution',
  'worked-example': 'Worked Example',
  tradeoffs: 'When to Use & When to Avoid',
  code: 'Code Implementations',
  faq: 'Frequently Asked Questions',
  navigation: 'Related Algorithms',
};

export function Article({ article, siblingAlgorithms }) {
  if (!article) return null;

  return (
    <article className="prose prose-invert max-w-none xl:prose-xl">
      <style>{`
        .prose-invert {
          --tw-prose-body: var(--text-1);
          --tw-prose-headings: var(--text-0);
          --tw-prose-lead: var(--text-1);
          --tw-prose-links: var(--accent);
          --tw-prose-bold: var(--text-0);
          --tw-prose-counters: var(--text-muted);
          --tw-prose-bullets: var(--border);
          --tw-prose-hr: var(--border);
          --tw-prose-quotes: var(--text-0);
          --tw-prose-quote-borders: var(--accent);
          --tw-prose-captions: var(--text-muted);
          --tw-prose-code: var(--accent);
          --tw-prose-pre-code: var(--text-0);
          --tw-prose-pre-bg: var(--bg-0);
          --tw-prose-th-borders: var(--border);
          --tw-prose-td-borders: var(--border);
        }
        .prose-invert table {
          font-size: 0.875rem;
        }
        .prose-invert th {
          background-color: var(--bg-1);
        }
        .prose-invert td, .prose-invert th {
          padding: 0.5rem 0.75rem;
        }
      `}</style>
      {article.introduction && (
        <section id="introduction" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS.introduction}
          </h2>
          <div className="space-y-4 text-[var(--text-1)] leading-relaxed">
            {article.introduction.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      )}

      {article.complexity && (
        <section id="complexity" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS.complexity}
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3 font-semibold text-[var(--text-0)] bg-[var(--bg-1)]">Case</th>
                <th className="text-left p-3 font-semibold text-[var(--text-0)] bg-[var(--bg-1)]">Time</th>
                <th className="text-left p-3 font-semibold text-[var(--text-0)] bg-[var(--bg-1)]">Space</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(article.complexity).map(([key, value]) => (
                <tr key={key} className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-[var(--text-0)] capitalize">{key}</td>
                  <td className="p-3 font-mono text-[var(--text-1)]">{value.time}</td>
                  <td className="p-3 font-mono text-[var(--text-1)]">{value.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {article.stepByStep && (
        <section id="step-by-step" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS['step-by-step']}
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3 font-semibold text-[var(--text-0)] bg-[var(--bg-1)] w-12">Step</th>
                <th className="text-left p-3 font-semibold text-[var(--text-0)] bg-[var(--bg-1)]">Action</th>
              </tr>
            </thead>
            <tbody>
              {article.stepByStep.map((step, i) => (
                <tr key={i} className="border-b border-[var(--border)]">
                  <td className="p-3 font-mono text-[var(--text-muted)]">{i + 1}</td>
                  <td className="p-3 text-[var(--text-1)]">{step}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {article.workedExample && (
        <section id="worked-example" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS['worked-example']}
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {article.workedExample.headers.map((h, i) => (
                  <th key={i} className="text-left p-3 font-semibold text-[var(--text-0)] bg-[var(--bg-1)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {article.workedExample.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[var(--border)]">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`p-3 ${ci === 0 ? 'font-medium text-[var(--text-0)]' : 'text-[var(--text-1)] font-mono'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {article.tradeoffs && (
        <section id="tradeoffs" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS.tradeoffs}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[var(--bg-1)] border border-[var(--border)] rounded p-4">
              <h3 className="font-semibold text-sm text-[var(--done)] mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-[var(--done)]" />
                When to Use
              </h3>
              <ul className="space-y-1.5 text-xs text-[var(--text-1)]">
                {article.tradeoffs.use.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[var(--done)] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--bg-1)] border border-[var(--border)] rounded p-4">
              <h3 className="font-semibold text-sm text-[var(--swap)] mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-[var(--swap)]" />
                When to Avoid
              </h3>
              <ul className="space-y-1.5 text-xs text-[var(--text-1)]">
                {article.tradeoffs.avoid.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[var(--swap)] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {article.code && (
        <section id="code" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS.code}
          </h2>
          <CodeTabs code={article.code} />
        </section>
      )}

      {article.faq && (
        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS.faq}
          </h2>
          <dl className="space-y-4">
            {article.faq.map((item, i) => (
              <div key={i} className="bg-[var(--bg-1)] border border-[var(--border)] rounded p-4">
                <dt className="font-semibold text-sm text-[var(--text-0)] mb-1.5">{item.q}</dt>
                <dd className="text-xs text-[var(--text-1)] leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {siblingAlgorithms && (
        <section id="navigation" className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--text-0)] mb-4">
            {SECTION_LABELS.navigation}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {siblingAlgorithms.prev && (
              <Link
                to={`/visualize/${siblingAlgorithms.prev.section}/${siblingAlgorithms.prev.id}`}
                className="px-3 py-1.5 bg-[var(--bg-1)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text-1)] hover:text-[var(--text-0)] hover:bg-[var(--bg-2)] transition-colors no-underline"
              >
                ← {siblingAlgorithms.prev.name}
              </Link>
            )}
            {siblingAlgorithms.next && (
              <Link
                to={`/visualize/${siblingAlgorithms.next.section}/${siblingAlgorithms.next.id}`}
                className="px-3 py-1.5 bg-[var(--bg-1)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text-1)] hover:text-[var(--text-0)] hover:bg-[var(--bg-2)] transition-colors no-underline"
              >
                {siblingAlgorithms.next.name} →
              </Link>
            )}
          </div>
        </section>
      )}
    </article>
  );
}