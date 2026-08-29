import { achievements } from '../../content';

export default function AchievementsStrip() {
  return (
    <div className="panel achievements-panel">
      <span className="panel-telemetry-tag">[CH.05 // REC_LOG]</span>
      <div className="panel-label">Achievements</div>
      <div className="achv-list">
        {achievements.map((a) => (
          <div className="achv-row" key={a.label}>
            <span className="achv-marker" />
            <div>
              <div className="achv-label">{a.label}</div>
              <div className="achv-detail">{a.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .achievements-panel { grid-column: span 1; }
        .achv-list { display: flex; flex-direction: column; gap: 12px; margin-top: 4px; }
        .achv-row { display: flex; gap: 12px; align-items: flex-start; }
        .achv-marker {
          width: 6px; height: 6px; border-radius: 50%; margin-top: 6px; flex-shrink: 0;
          background: var(--signal); box-shadow: 0 0 6px var(--signal);
        }
        .achv-label { font-size: 13.5px; font-weight: 600; }
        .achv-detail { font-size: 12px; color: var(--ink-dim); margin-top: 2px; }

        @media (max-width: 640px) {
          .achievements-panel { grid-column: span 1; }
        }
      `}</style>
    </div>
  );
}
