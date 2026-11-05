import { getComparisonTable } from '../core/registry.js';

export function ComparisonTable({ section }) {
  const { columns, rows } = getComparisonTable(section) || {
    columns: [],
    rows: [],
  };

  if (!columns.length) return null;

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {columns.map((col, i) => (
              <th
                key={i}
                className="text-left p-3 font-semibold text-[var(--text-0)] bg-[var(--bg-1)] border-b border-[var(--border)]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[var(--border)] hover:bg-[var(--bg-2)]">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`p-3 ${ci === 0 ? 'font-medium text-[var(--text-0)]' : 'text-[var(--text-1)] font-mono'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}