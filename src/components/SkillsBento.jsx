import { skills } from '../content';

const CATEGORY_DISPLAY = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  aiml: 'AI & ML',
  databases: 'Databases',
  tools: 'Developer Tools',
  coreCS: 'Core CS',
};

const CATEGORY_ICONS = {
  languages: '{ }',
  frameworks: '⚙️',
  aiml: '🧠',
  databases: '💾',
  tools: '🔧',
  coreCS: '📐',
};

export default function SkillsBento() {
  return (
    <section id="skills" className="section">
      <div className="eyebrow">CHART 05</div>
      <h2>Core Competencies</h2>
      <p className="skills-intro">
        Organized by domain. Technologies and practices I've shipped production code with.
      </p>

      <div className="skills-bento">
        {Object.entries(skills).map(([catKey, items]) => (
          <div key={catKey} className="skill-tile">
            <div className="skill-header">
              <span className="skill-icon">{CATEGORY_ICONS[catKey]}</span>
              <h3 className="skill-category">{CATEGORY_DISPLAY[catKey]}</h3>
            </div>
            <div className="skill-list">
              {items.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .skills-intro {
          color: var(--ink-dim);
          font-size: 14px;
          max-width: 640px;
          margin-bottom: 32px;
        }

        .skills-bento {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }

        .skill-tile {
          position: relative;
          background: linear-gradient(135deg, rgba(16, 19, 21, 0.95) 0%, rgba(10, 12, 13, 0.98) 100%);
          border: 1px solid var(--line-strong);
          border-radius: 8px;
          padding: 20px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .skill-tile:hover {
          border-color: var(--signal);
          box-shadow: 0 0 20px rgba(90, 159, 165, 0.1);
          transform: translateY(-2px);
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .skill-icon {
          font-size: 24px;
          opacity: 0.8;
        }

        .skill-category {
          font-size: 14px;
          color: var(--ink);
          letter-spacing: 0.05em;
          margin: 0;
          font-weight: 600;
        }

        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          display: inline-block;
          font-family: var(--font-data);
          font-size: 11px;
          color: var(--ink-dim);
          background: rgba(90, 159, 165, 0.05);
          border: 1px solid rgba(90, 159, 165, 0.2);
          border-radius: 4px;
          padding: 5px 10px;
          letter-spacing: 0.04em;
          transition: all 0.15s ease;
        }

        .skill-tag:hover {
          color: var(--signal);
          border-color: var(--signal);
          background: rgba(90, 159, 165, 0.08);
        }

        @media (max-width: 1200px) {
          .skills-bento {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .skills-bento {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .skill-tile {
            padding: 16px;
          }
        }
      `}</style>
    </section>
  );
}
