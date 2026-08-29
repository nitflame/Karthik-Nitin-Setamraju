import { useState, useEffect } from 'react';
import { experience, flagshipProject } from '../content';

export default function Experience() {
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setShowCaseStudy(false);
      }
    }
    if (showCaseStudy) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCaseStudy]);

  return (
    <section id="experience" className="section">
      <div className="eyebrow">02 — MEMORY</div>
      <h2>Experience</h2>

      <div className="experience-bento">
        {/* Row 1: 3 columns (Summer Intern, Agentic Lead, ACM Core) */}
        <div className="bento-row bento-row-3">
          {experience.slice(0, 3).map((e) => (
            <div key={`${e.role}-${e.period}`} className="panel exp-card">
              <div className="exp-head">
                <div>
                  <h3 className="exp-role">{e.role}</h3>
                  <p className="exp-org">{e.org}</p>
                </div>
                <span className="chip">{e.period}</span>
              </div>
              {e.bullets.length > 0 && (
                <ul className="exp-bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {e.role === "Summer Intern — AR/VR Developer" && (
                <div className="case-study-toggle-wrapper">
                  <button
                    className="case-study-toggle-btn"
                    onClick={() => setShowCaseStudy(true)}
                  >
                    <span>[ + ] ACCESS VR SIM DIAGNOSTICS</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: 2 columns (Winter Intern, Media Team) */}
        <div className="bento-row bento-row-2">
          {experience.slice(3, 5).map((e) => (
            <div key={`${e.role}-${e.period}`} className="panel exp-card">
              <div className="exp-head">
                <div>
                  <h3 className="exp-role">{e.role}</h3>
                  <p className="exp-org">{e.org}</p>
                </div>
                <span className="chip">{e.period}</span>
              </div>
              {e.bullets.length > 0 && (
                <ul className="exp-bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic Telemetry Details Overlay Modal */}
      {showCaseStudy && (
        <div className="case-study-modal-overlay" onClick={() => setShowCaseStudy(false)}>
          <div className="case-study-modal-content active-border-signal" onClick={(e) => e.stopPropagation()}>
            <div className="corner-bracket top-left" />
            <div className="corner-bracket top-right" />
            <div className="corner-bracket bottom-left" />
            <div className="corner-bracket bottom-right" />
            
            <div className="modal-header">
              <span className="panel-telemetry-tag">[SYSTEM_DIAGNOSTICS // RX_LOG]</span>
              <button className="modal-close-btn" onClick={() => setShowCaseStudy(false)}>
                [ ESC: CLOSE ]
              </button>
            </div>

            <div className="modal-body">
              <div className="panel-label">Internship Case Study Dossier</div>
              <h3 className="project-title">{flagshipProject.title}</h3>
              
              <div className="chip-row stack-chips">
                {flagshipProject.stack.map((s) => (
                  <span className="chip" key={s}>{s}</span>
                ))}
              </div>
              
              <p className="project-summary">{flagshipProject.summary}</p>

              <h4 className="sub-head-small">Systems Delivered</h4>
              <div className="systems-list">
                {flagshipProject.systems.map((s, i) => (
                  <div key={s.name} className="system-row">
                    <span className="system-index">{String(i + 1).padStart(2, '0')}.</span>
                    <div className="system-text">
                      <strong className="system-name">{s.name}</strong> — {s.detail}
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="sub-head-small">Hardest Engineering Challenge</h4>
              <div className="challenge-block">
                <p className="challenge-headline">{flagshipProject.challenges.headline}</p>
                <div className="chip-row error-chips">
                  {flagshipProject.challenges.errors.map((err) => (
                    <span key={err.code} className="chip error-chip">
                      {err.code}
                    </span>
                  ))}
                </div>
                <p className="challenge-resolution">{flagshipProject.challenges.resolution}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .experience-bento {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
        }
        .bento-row {
          display: grid;
          gap: 16px;
        }
        .bento-row-3 {
          grid-template-columns: repeat(3, 1fr);
        }
        .bento-row-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        .exp-card {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .exp-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .exp-role {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
        }
        .exp-org {
          color: var(--ink-dim);
          font-size: 11.5px;
          margin-top: 2px;
        }
        .exp-bullets {
          margin: 0 0 12px;
          padding-left: 16px;
          color: var(--ink-dim);
          font-size: 12px;
          line-height: 1.5;
        }
        .exp-bullets li {
          margin-bottom: 4px;
        }

        /* Toggler wrapper and button inside card */
        .case-study-toggle-wrapper {
          margin-top: auto;
          border-top: 1px dashed var(--line);
          padding-top: 12px;
        }
        .case-study-toggle-btn {
          width: 100%;
          font-family: var(--font-data);
          font-size: 10px;
          font-weight: 600;
          color: var(--signal);
          background: rgba(16, 185, 129, 0.04);
          border: 1px dashed rgba(16, 185, 129, 0.25);
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
          letter-spacing: 0.05em;
          text-align: center;
        }
        .case-study-toggle-btn:hover {
          background: rgba(16, 185, 129, 0.08);
          border-color: var(--signal);
          border-style: solid;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.15);
        }

        /* Modal Overlay Styles */
        .case-study-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 8, 17, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: modalFadeIn 0.2s ease-out forwards;
        }
        .case-study-modal-content {
          position: relative;
          background: var(--panel);
          border: 1.5px solid var(--line-strong);
          border-radius: 6px;
          width: 100%;
          max-width: 720px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          padding: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .case-study-modal-content.active-border-signal {
          border-color: var(--signal);
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.08), 0 20px 50px rgba(0, 0, 0, 0.6);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--line);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .modal-close-btn {
          font-family: var(--font-data);
          font-size: 11px;
          color: var(--ink-faint);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .modal-close-btn:hover {
          color: var(--alert);
        }
        .modal-body {
          overflow-y: auto;
          flex: 1;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: var(--line) transparent;
        }
        .modal-body::-webkit-scrollbar {
          width: 4px;
        }
        .modal-body::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 2px;
        }

        /* Detail dossier styling in modal */
        .project-title { font-size: 16px; color: var(--ink); margin: 8px 0; }
        .stack-chips { margin: 4px 0 14px; display: flex; flex-wrap: wrap; gap: 6px; }
        .project-summary { font-size: 13.5px; color: var(--ink-dim); line-height: 1.6; margin-bottom: 16px; }
        
        .sub-head-small {
          font-family: var(--font-data);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-faint);
          margin: 18px 0 8px;
        }
        
        .systems-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; }
        .system-row { display: flex; gap: 8px; font-size: 12.5px; color: var(--ink-dim); line-height: 1.5; }
        .system-index { color: var(--signal); font-family: var(--font-data); flex-shrink: 0; }
        .system-name { color: var(--ink); }
        
        .challenge-block {
          background: var(--panel-raised);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 14px;
          margin-top: 4px;
        }
        .challenge-headline { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .error-chips { margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
        .error-chip { color: var(--alert); border-color: rgba(239, 68, 68, 0.25); font-size: 9.5px; }
        .challenge-resolution { font-size: 12.5px; color: var(--ink-dim); line-height: 1.6; }

        /* Corner brackets */
        .corner-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: var(--line-strong);
          opacity: 0.4;
        }
        .case-study-modal-content.active-border-signal .corner-bracket {
          border-color: var(--signal);
          opacity: 0.8;
        }
        .corner-bracket.top-left { top: 6px; left: 6px; border-left: 1.5px solid; border-top: 1.5px solid; }
        .corner-bracket.top-right { top: 6px; right: 6px; border-right: 1.5px solid; border-top: 1.5px solid; }
        .corner-bracket.bottom-left { bottom: 6px; left: 6px; border-left: 1.5px solid; border-bottom: 1.5px solid; }
        .corner-bracket.bottom-right { bottom: 6px; right: 6px; border-right: 1.5px solid; border-bottom: 1.5px solid; }

        .chip { font-family: var(--font-data); font-size: 9px; padding: 2px 6px; border-radius: 3px; background: var(--panel-raised); border: 1px solid var(--line); color: var(--ink-dim); }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 1024px) {
          .bento-row-3 {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 720px) {
          .bento-row-3, .bento-row-2 {
            grid-template-columns: 1fr;
          }
          .case-study-modal-content {
            max-height: 90vh;
            padding: 16px;
          }
        }
      `}</style>
    </section>
  );
}
