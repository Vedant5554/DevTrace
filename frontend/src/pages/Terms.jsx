export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-semibold text-[var(--text-0)] mb-4">Terms of Service</h1>
      <p className="text-xs font-mono text-[var(--text-muted)] mb-8">Effective Date: October 31, 2026</p>

      <div className="space-y-6 text-sm text-[var(--text-1)] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DevTrace, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">2. Educational Use Only</h2>
          <p>
            DevTrace is provided exclusively for educational and informational purposes. The algorithm visualizations, code snippets, and reference materials are provided "as is" without warranty of any kind, either express or implied.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">3. Intellectual Property and Open Source</h2>
          <p>
            The software, layout, and visualizer engines are open-source and subject to their respective project licenses. The educational articles and worked examples are provided for personal study, curriculum reference, and technical interview preparation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">4. Limitation of Liability</h2>
          <p>
            In no event shall DevTrace or its contributors be liable for any damages arising out of the use or inability to use the visualizer engine or documentation.
          </p>
        </section>
      </div>
    </div>
  );
}

