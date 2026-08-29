import { skills } from '../../content';

// Skills reframed as a monitor's vitals tiles instead of a plain tag list.
// Each "gauge" width is a deliberate qualitative signal (breadth of items
// in that category relative to the others) — not a fabricated proficiency
// score, since no such score exists in the source resume.
const GROUPS = [
  { key: 'languages', label: 'Languages', accent: 'var(--signal)' },
  { key: 'frameworks', label: 'Frameworks / SDKs', accent: 'var(--cyan)' },
  { key: 'aiml', label: 'AI / ML', accent: 'var(--amber)' },
  { key: 'databases', label: 'Databases', accent: 'var(--signal)' },
  { key: 'tools', label: 'Tools', accent: 'var(--cyan)' },
  { key: 'coreCS', label: 'Core CS', accent: 'var(--amber)' },
];

export default function VitalsPanel() {
  const maxCount = Math.max(...Object.values(skills).map((arr) => arr.length));

  return (
    <div className="panel vitals-panel">
      <span className="panel-telemetry-tag">[CH.02 // SENSORS_V]</span>
      <div className="panel-label">Vitals — Skill Coverage</div>
      <div className="vitals-grid">
        {GROUPS.map((g) => {
          const items = skills[g.key];
          const pct = Math.round((items.length / maxCount) * 100);
          return (
            <div className="vital-tile" key={g.key}>
              <div className="vital-head">
                <span className="vital-label">{g.label}</span>
                <span className="vital-count" style={{ color: g.accent }}>{items.length}</span>
              </div>
              <div className="vital-bar-track">
                <div
                  className="vital-bar-fill"
                  style={{ width: `${pct}%`, background: g.accent }}
                />
              </div>
              <div className="vital-items">{items.join(' · ')}</div>
            </div>
          );
        })}
      </div>

      <style>{`
        .vitals-panel { grid-column: span 1; }
        .vitals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 6px; }
        .vital-tile { padding: 4px 0; }
        .vital-head { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .vital-label { font-size: 12.5px; color: var(--ink-dim); }
        .vital-count { font-family: var(--font-data); font-size: 12.5px; }
        .vital-bar-track {
          height: 4px; background: var(--line); border-radius: 2px; overflow: hidden; margin-bottom: 6px;
        }
        .vital-bar-fill { height: 100%; border-radius: 2px; }
        .vital-items { font-size: 11px; color: var(--ink-faint); line-height: 1.5; }

        @media (max-width: 640px) {
          .vitals-panel { grid-column: span 1; }
          .vitals-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
