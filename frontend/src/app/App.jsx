import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation.jsx';
import MainHub from '../pages/MainHub.jsx';
import SectionHub from '../pages/SectionHub.jsx';
import AlgorithmDetail from '../pages/AlgorithmDetail.jsx';
import Terms from '../pages/Terms.jsx';
import Privacy from '../pages/Privacy.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-0)] text-[var(--text-0)] flex flex-col">
      <Navigation />
      <main className="pt-14 flex-1">
        <Routes>
          <Route path="/visualize" element={<MainHub />} />
          <Route path="/visualize/:section" element={<SectionHub />} />
          <Route path="/visualize/:section/:algorithm" element={<AlgorithmDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/" element={<Navigate to="/visualize" replace />} />
          <Route path="*" element={<Navigate to="/visualize" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-[var(--border)] py-6 px-4 md:px-6 bg-[var(--bg-1)] mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono">
          <span>DevTrace - Algorithm Visualizer</span>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-[var(--text-0)] transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-[var(--text-0)] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
