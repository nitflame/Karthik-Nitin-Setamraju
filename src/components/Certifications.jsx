import { certifications } from '../content';

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="eyebrow">05 — FINE-TUNING</div>
      <h2>Certifications</h2>
      <p className="cert-intro">
        Official and academic credentials verified by institutional providers and central ministries.
      </p>

      <div className="certifications-list">
        {certifications.map((cert, index) => (
          <div key={index} className="panel cert-card">
            <div className="cert-header">
              <div>
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
              <span className="chip cert-period">{cert.period}</span>
            </div>

            <div className="cert-body">
              {cert.score && (
                <div className="cert-stat-row">
                  <div className="cert-stat">
                    <div className="panel-label">Consolidated Score</div>
                    <div className="cert-score-val highlight">{cert.score.split(' (')[0]}</div>
                  </div>
                  <div className="cert-stat">
                    <div className="panel-label">Assessment Details</div>
                    <div className="cert-score-details">{cert.score.includes('(') ? cert.score.split(' (')[1].replace(')', '') : cert.score}</div>
                  </div>
                </div>
              )}

              <div className="cert-verification">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span className="panel-label" style={{ margin: 0 }}>Roll Number / Credential ID</span>
                  <code className="cert-id">{cert.credentialId}</code>
                </div>
                {cert.downloadLink && (
                  <a
                    href={cert.downloadLink}
                    download={cert.downloadLink.split('/').pop()}
                    className="cert-download-link"
                  >
                    Download Certificate ⭳
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .cert-intro { color: var(--ink-dim); font-size: 14px; max-width: 640px; margin-bottom: 24px; }
        .certifications-list { display: flex; flex-direction: column; gap: 16px; }
        .cert-card { display: flex; flex-direction: column; gap: 20px; }
        .cert-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
        .cert-title { font-size: 17px; margin-bottom: 4px; color: var(--ink); }
        .cert-issuer { font-size: 13px; color: var(--ink-dim); font-family: var(--font-body); }
        .cert-period { font-size: 10.5px; }
        
        .cert-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-top: 1px solid var(--line);
          padding-top: 16px;
        }
        
        .cert-stat-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 20px;
        }
        .cert-score-val {
          font-family: var(--font-data);
          font-size: 20px;
          font-weight: 700;
          color: var(--ink);
        }
        .cert-score-val.highlight {
          color: var(--cyan);
          text-shadow: 0 0 8px rgba(90, 209, 230, 0.2);
        }
        .cert-score-details {
          font-family: var(--font-data);
          font-size: 13.5px;
          color: var(--ink-dim);
          padding-top: 4px;
        }
        
        .cert-verification {
          background: var(--panel-raised);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 10px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .cert-verification .panel-label { margin: 0; }
        .cert-id {
          font-family: var(--font-data);
          font-size: 12.5px;
          color: var(--signal);
          letter-spacing: 0.05em;
        }
        .cert-download-link {
          font-family: var(--font-data);
          font-size: 11px;
          color: var(--signal);
          text-decoration: none;
          border: 1px solid rgba(90, 159, 165, 0.3);
          padding: 4px 10px;
          border-radius: 4px;
          transition: background 0.15s ease, border-color 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .cert-download-link:hover {
          background: rgba(90, 159, 165, 0.08);
          border-color: var(--signal);
          text-decoration: none;
        }

        @media (max-width: 640px) {
          .cert-stat-row { grid-template-columns: 1fr; gap: 12px; }
          .cert-verification { flex-direction: column; align-items: flex-start; gap: 6px; }
        }
      `}</style>
    </section>
  );
}
