import { education } from '../content';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="eyebrow">CHART 06</div>
      <h2>Education</h2>
      <div className="panel edu-panel">
        <div className="edu-head">
          <div>
            <h3 className="edu-school">{education.school}</h3>
            <p className="edu-degree">{education.degree}</p>
          </div>
          <div className="edu-meta">
            <span className="chip">{education.years}</span>
            <span className="chip" style={{ color: 'var(--signal)' }}>CGPA {education.cgpa}</span>
          </div>
        </div>
        <div className="panel-label" style={{ marginTop: 18 }}>Relevant coursework</div>
        <div className="chip-row">
          {education.coursework.map((c) => (
            <span className="chip" key={c}>{c}</span>
          ))}
        </div>
      </div>

      <style>{`
        .edu-head { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .edu-school { font-size: 16px; margin-bottom: 4px; }
        .edu-degree { font-size: 13.5px; color: var(--ink-dim); }
        .edu-meta { display: flex; gap: 8px; align-items: flex-start; }
      `}</style>
    </section>
  );
}
