import { education } from '../../content';

export default function EducationDashboardTile() {
  return (
    <div className="panel education-dashboard-tile">
      <span className="panel-telemetry-tag">[CH.04 // CGPA_8.70]</span>
      <div className="panel-label">Academic Telemetry</div>
      
      <div className="edu-tile-body">
        <h4 className="edu-tile-school">{education.school}</h4>
        <div className="edu-tile-degree">{education.degree}</div>
        
        <div className="edu-tile-stats">
          <div className="edu-stat-item">
            <span className="edu-stat-lbl">TIMELINE</span>
            <span className="edu-stat-val">{education.years}</span>
          </div>
          <div className="edu-stat-item">
            <span className="edu-stat-lbl">PERFORMANCE</span>
            <span className="edu-stat-val" style={{ color: 'var(--signal)' }}>CGPA {education.cgpa}</span>
          </div>
        </div>

        <div className="edu-coursework-section">
          <div className="panel-label" style={{ fontSize: '9.5px', marginBottom: '6px' }}>COURSEWORK</div>
          <div className="edu-coursework-chips">
            {education.coursework.map((c) => (
              <span className="edu-course-chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .education-dashboard-tile {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
        }
        .edu-tile-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .edu-tile-school {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .edu-tile-degree {
          font-size: 12px;
          color: var(--ink-dim);
          line-height: 1.4;
        }
        .edu-tile-stats {
          display: flex;
          gap: 16px;
          margin-top: 4px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 8px 0;
        }
        .edu-stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .edu-stat-lbl {
          font-family: var(--font-data);
          font-size: 8.5px;
          color: var(--ink-faint);
          letter-spacing: 0.05em;
        }
        .edu-stat-val {
          font-family: var(--font-data);
          font-size: 11px;
          color: var(--ink-dim);
          font-weight: 600;
        }
        .edu-coursework-section {
          margin-top: 4px;
        }
        .edu-coursework-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .edu-course-chip {
          font-family: var(--font-data);
          font-size: 9.5px;
          color: var(--ink-dim);
          background: var(--panel-raised);
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 2px 6px;
        }
      `}</style>
    </div>
  );
}
