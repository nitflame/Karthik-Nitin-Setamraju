import { profile, education, experience } from '../content';

export default function Resume() {
  return (
    <section id="resume" className="section">
      <div className="eyebrow">06 — MODEL CARD</div>
      <h2>Resume</h2>
      <p className="resume-intro">
        Access the verified system record containing complete academic history, professional internships, and verified technical credentials.
      </p>

      <div className="panel resume-panel">
        <div className="resume-dense-grid">
          <div className="resume-dense-col">
            <span className="panel-telemetry-tag">[EDU_SPEC]</span>
            <h4 className="dense-title">{education.school}</h4>
            <p className="dense-text">{education.degree}</p>
            <p className="dense-subtext">CGPA: {education.cgpa} · ({education.years})</p>
          </div>

          <div className="resume-dense-col">
            <span className="panel-telemetry-tag">[ACTIVE_NODES]</span>
            <h4 className="dense-title">Core Experience</h4>
            <p className="dense-text">CXR Lead VR Intern · GitHub Agentic Lead</p>
            <p className="dense-subtext">GITAM ACM Core Dev</p>
          </div>

          <div className="resume-dense-col">
            <span className="panel-telemetry-tag">[CRED_LEDGER]</span>
            <h4 className="dense-title">Verified Credentials</h4>
            <p className="dense-text">Leetcode: {profile.leetcode} (250+ solved)</p>
            <p className="dense-subtext">SIH Screened · Git Verified Portfolio</p>
          </div>
        </div>

        <div className="resume-action-row">
          <a
            href="/Karthik_Nitin_Setamraju_Resume.pdf"
            download="Karthik_Nitin_Setamraju_Resume.pdf"
            className="resume-download-btn"
          >
            <span className="btn-icon">⭳</span>
            <span className="btn-text">DOWNLOAD SYSTEM RECORD (PDF)</span>
          </a>
          <span className="file-size-tag">Size: ~25 KB · PDF Format</span>
        </div>
      </div>

      <style>{`
        .resume-intro { color: var(--ink-dim); font-size: 14px; max-width: 640px; margin-bottom: 28px; }
        .resume-panel { display: flex; flex-direction: column; gap: 16px; }
        
        .resume-dense-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 8px;
        }
        .resume-dense-col {
          background: var(--panel-raised);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .dense-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--ink);
        }
        .dense-text {
          font-size: 11px;
          color: var(--ink-dim);
          line-height: 1.45;
          margin: 0;
        }
        .dense-subtext {
          font-family: var(--font-data);
          font-size: 9.5px;
          color: var(--ink-faint);
          margin: 0;
        }

        .resume-action-row {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .resume-download-btn {
          font-family: var(--font-data);
          font-size: 12px;
          color: #041008;
          background: var(--signal);
          border: 1px solid var(--signal);
          padding: 8px 16px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
          transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        }
        .resume-download-btn:hover {
          background: transparent;
          color: var(--signal);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
          text-decoration: none;
        }
        .btn-icon { font-size: 14px; }
        .file-size-tag {
          font-family: var(--font-data);
          font-size: 11px;
          color: var(--ink-faint);
        }

        @media (max-width: 768px) {
          .resume-dense-grid { grid-template-columns: 1fr; gap: 10px; }
          .resume-action-row { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>
    </section>
  );
}
