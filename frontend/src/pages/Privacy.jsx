export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-semibold text-[var(--text-0)] mb-4">Privacy Policy</h1>
      <p className="text-xs font-mono text-[var(--text-muted)] mb-8">Effective Date: October 31, 2026</p>

      <div className="space-y-6 text-sm text-[var(--text-1)] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">1. Zero User Tracking</h2>
          <p>
            DevTrace is a fully static client-side web application. We do not require user accounts, passwords, or authentication. We do not track personal identifying information, browsing history, or behavioral metrics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">2. Client-Side State Only</h2>
          <p>
            All player configuration parameters (such as visualization view mode, playback speed, and array size) are stored strictly within URL query parameters on your own device. No data is transmitted to or stored on external servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">3. Cookies and Storage</h2>
          <p>
            DevTrace does not use tracking cookies, marketing beacons, or third-party advertising scripts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-0)] mb-2">4. Changes to This Policy</h2>
          <p>
            Any future revisions to this Privacy Policy will be reflected directly on this page with an updated revision date.
          </p>
        </section>
      </div>
    </div>
  );
}

