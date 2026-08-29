// A persistent, always-visible resume download control, pinned to the
// top-right corner regardless of scroll position — separate from the
// full Resume section further down the page, which stays as the
// detailed view (preview + metadata).
export default function ResumeButton() {
  return (
    <a
      className="resume-float-btn"
      href="/Karthik_Nitin_Setamraju_Resume.pdf"
      download="Karthik_Nitin_Setamraju_Resume.pdf"
      aria-label="Download resume PDF"
    >
      <span className="resume-btn-dot" />
      Resume
      <span className="resume-btn-icon">⭳</span>

      <style>{`
        .resume-float-btn {
          position: fixed;
          top: 16px;
          right: 20px;
          z-index: 300;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-data);
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--signal);
          background: var(--panel);
          border: 1px solid var(--signal-dim);
          border-radius: 20px;
          padding: 7px 14px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          transition: all 0.15s ease;
        }
        .resume-float-btn:hover {
          background: rgba(77,255,154,0.08);
          box-shadow: 0 0 14px rgba(77,255,154,0.25);
          text-decoration: none;
        }
        .resume-btn-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--signal);
          box-shadow: 0 0 6px var(--signal);
        }
        .resume-btn-icon { font-size: 13px; }

        @media (max-width: 720px) {
          .resume-float-btn { top: auto; bottom: 16px; right: 16px; }
        }
      `}</style>
    </a>
  );
}
