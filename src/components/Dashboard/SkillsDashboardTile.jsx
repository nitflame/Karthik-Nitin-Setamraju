import { skills } from '../../content';

const CATEGORY_LABELS = {
  aiml: 'AI / ML',
  languages: 'Languages',
  frameworks: 'Frameworks',
  databases: 'Databases',
  tools: 'Tools',
  coreCS: 'Core CS',
};

export default function SkillsDashboardTile() {
  return (
    <div className="panel skills-dashboard-tile">
      <span className="panel-telemetry-tag">[CH.03 // DIR_INDEX]</span>
      <div className="panel-label">Core Skills</div>
      <div className="skills-tile-grid">
        {Object.entries(skills).map(([key, items]) => (
          <div key={key} className="skills-tile-group">
            <div className="skills-tile-cat">{CATEGORY_LABELS[key] || key}</div>
            <div className="skills-tile-items">
              {items.map((it) => (
                <span className="skills-tile-tag" key={it}>
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .skills-dashboard-tile {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
        }
        .skills-tile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          max-height: 250px;
          overflow-y: auto;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: var(--line) transparent;
        }
        .skills-tile-grid::-webkit-scrollbar {
          width: 3px;
        }
        .skills-tile-grid::-webkit-scrollbar-track {
          background: transparent;
        }
        .skills-tile-grid::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 1.5px;
        }
        .skills-tile-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .skills-tile-cat {
          font-family: var(--font-data);
          font-size: 10.5px;
          color: var(--signal);
          text-transform: uppercase;
        }
        .skills-tile-items {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .skills-tile-tag {
          font-size: 10px;
          color: var(--ink-dim);
          background: var(--panel-raised);
          border: 1px solid var(--line);
          padding: 2px 6px;
          border-radius: 3px;
          font-family: var(--font-data);
        }
      `}</style>
    </div>
  );
}
