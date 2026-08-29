import LazyMount from '../LazyMount';

export default function Dashboard() {
  return (
    <section id="dashboard" className="section">
      <div className="eyebrow">04 — OBSERVABILITY</div>
      <h2>Monitor Bay</h2>
      <p className="dashboard-intro">
        Consolidated bento grid monitoring real-time activity, skills coverage, developer telemetry, and academic credentials.
      </p>

      <div className="dashboard-grid">
        <LazyMount importer={() => import('./LeetCodeHeatmap')} minHeight={260} className="lazy-span-3" />
        <LazyMount importer={() => import('./VitalsPanel')} minHeight={220} className="lazy-span-1" />
        <LazyMount importer={() => import('./SkillsDashboardTile')} minHeight={220} className="lazy-span-1" />
        <LazyMount importer={() => import('./LatencyTelemetryTile')} minHeight={220} className="lazy-span-1" />
        <LazyMount importer={() => import('./AchievementsStrip')} minHeight={160} className="lazy-span-3" />
      </div>

      <style>{`
        .dashboard-intro { color: var(--ink-dim); font-size: 14px; max-width: 640px; margin-bottom: 28px; }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .dashboard-grid > div {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .dashboard-grid > div > .panel {
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .lazy-span-3 { grid-column: span 3; }
        .lazy-span-2 { grid-column: span 2; }
        .lazy-span-1 { grid-column: span 1; }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr 1fr;
          }
          .lazy-span-3 { grid-column: span 2; }
          .lazy-span-2 { grid-column: span 2; }
          .lazy-span-1 { grid-column: span 1; }
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .lazy-span-3, .lazy-span-2, .lazy-span-1 { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
}
