import { useState, useEffect } from 'react';
import { projects } from '../content';
import TechLogo from './TechLogo';

const CATEGORIES = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

function StatusBadge({ status }) {
  const statusMap = {
    'Live': { label: 'LIVE', color: 'var(--signal)', bgColor: 'rgba(90, 159, 165, 0.1)' },
    'Archived': { label: 'ARCHIVED', color: 'var(--ink-dim)', bgColor: 'rgba(139, 150, 148, 0.1)' },
    'Beta': { label: 'BETA', color: 'var(--signal)', bgColor: 'rgba(90, 159, 165, 0.1)' },
    'Development': { label: 'IN DEVELOPMENT', color: 'var(--ink-dim)', bgColor: 'rgba(139, 150, 148, 0.1)' },
    'MVP': { label: 'MVP', color: 'var(--signal)', bgColor: 'rgba(90, 159, 165, 0.1)' },
  };
  
  const config = statusMap[status] || statusMap['Archived'];
  const isLive = status === 'Live' || status === 'Beta' || status === 'MVP';
  
  return (
    <span className="status-badge" style={{ borderColor: config.color, backgroundColor: config.bgColor }}>
      <span className={`status-dot ${isLive ? 'live' : ''}`} style={{ background: isLive ? config.color : 'transparent' }} />
      <span style={{ color: config.color }}>{config.label}</span>
    </span>
  );
}

function StackRow({ stack }) {
  return (
    <span className="dossier-sub-row">
      {stack.map((t) => (
        <span className="dossier-stack-item" key={t}>
          <TechLogo label={t} size={13} />
          {t}
        </span>
      ))}
    </span>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);
  
  const activeProj = filtered[activeIdx] || filtered[0] || projects[0];

  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    setActiveIdx(0);
    setFadeKey((k) => k + 1);
  }

  function handleProjectChange(idx) {
    setActiveIdx(idx);
    setFadeKey((k) => k + 1);
  }

  // Ensure index remains bounds safe when category changes
  useEffect(() => {
    if (activeIdx >= filtered.length) {
      setActiveIdx(0);
    }
  }, [filtered, activeIdx]);

  return (
    <section id="projects" className="section">
      <div className="eyebrow">03 — TOOL USE</div>
      <h2>Projects</h2>
      <p className="projects-intro">
        A closer look at what I've actually built — predictive systems, real-time computer vision, and full-stack products.
      </p>

      {/* Category selector tabs */}
      <div className="category-tabs" role="tablist" aria-label="Filter projects by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={activeCategory === cat ? 'category-tab active' : 'category-tab'}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
            <span className="category-count">
              {cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Consolidated Master-Detail Switcher */}
      <div className="projects-layout">
        
        {/* Left Side: Master Project Selector Tabs (Sidebar on desktop, horizontal scroll on mobile) */}
        <div className="project-master-list" role="tablist" aria-label="Select case study">
          {filtered.map((proj, idx) => {
            const isSelected = activeProj.id === proj.id;
            const isLive = proj.status === 'Live' || proj.status === 'Beta';
            return (
              <button
                key={proj.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleProjectChange(idx)}
                className={`project-master-item ${isSelected ? 'selected' : ''}`}
              >
                <div className="item-title-row">
                  <span
                    className="item-dot"
                    style={{
                      backgroundColor: isSelected
                        ? 'var(--signal)'
                        : isLive
                        ? 'rgba(90, 159, 165, 0.4)'
                        : 'var(--ink-faint)',
                    }}
                  />
                  <span className="item-title">{proj.title}</span>
                </div>
                <div className="item-tech-summary">
                  {proj.stack.slice(0, 3).join(' · ')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detail Dossier Panel */}
        <div className="dossier-panel active-border-signal" key={fadeKey}>
          <div className="corner-bracket top-left" />
          <div className="corner-bracket top-right" />
          <div className="corner-bracket bottom-left" />
          <div className="corner-bracket bottom-right" />

          <div className="dossier-tab">CASE DOSSIER</div>

          {activeProj ? (
            <div className="dossier-content animate-fade-in">
              <div className="dossier-head">
                <div>
                  <h3 className="dossier-title">{activeProj.title}</h3>
                  <StackRow stack={activeProj.stack} />
                </div>
                <div className="dossier-badges">
                  <StatusBadge status={activeProj.status} />
                  <span className="chip dossier-period">{activeProj.period}</span>
                </div>
              </div>

              <p className="dossier-summary">{activeProj.summary}</p>

              {activeProj.bullets && activeProj.bullets.length > 0 && (
                <ul className="dossier-bullets">
                  {activeProj.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}

              {activeProj.link && (
                <div className="dossier-footer">
                  <div className="dossier-footer-buttons">
                    <a
                      href={activeProj.link}
                      className="dossier-link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read case study ↗
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="dossier-empty">Select a project to review the dossier data.</div>
          )}
        </div>
      </div>

      <style>{`
        .projects-intro { color: var(--ink-dim); font-size: 14px; max-width: 640px; margin-bottom: 24px; }

        .category-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .category-tab {
          font-family: var(--font-data);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--ink-dim);
          background: var(--panel-raised);
          border: 1px solid var(--line-strong);
          border-radius: 4px;
          padding: 6px 12px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
        }
        .category-tab:hover { color: var(--ink); border-color: var(--ink-dim); }
        .category-tab.active {
          color: var(--signal);
          border-color: var(--signal);
          box-shadow: 0 0 10px rgba(90, 159, 165, 0.15);
        }
        .category-count {
          font-size: 9.5px;
          color: var(--ink-faint);
          background: var(--bg);
          border-radius: 3px;
          padding: 1px 5px;
        }
        .category-tab.active .category-count { color: var(--signal); }

        /* Master-Detail layout */
        .projects-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 24px;
          margin-top: 24px;
          align-items: stretch;
        }

        /* Project master list (left side) */
        .project-master-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .project-master-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 12px 14px;
          width: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
          gap: 6px;
        }
        .project-master-item:hover {
          border-color: var(--line-strong);
          background: var(--panel-raised);
        }
        .project-master-item.selected {
          border-color: var(--signal);
          background: linear-gradient(135deg, rgba(90, 159, 165, 0.05) 0%, transparent 100%);
          box-shadow: 0 0 10px rgba(90, 159, 165, 0.05);
        }
        .item-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        .item-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .item-title {
          font-family: var(--font-data);
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .project-master-item.selected .item-title {
          color: var(--signal);
        }
        .item-tech-summary {
          font-family: var(--font-data);
          font-size: 10.5px;
          color: var(--ink-faint);
          padding-left: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        /* Detail card (right side) */
        .dossier-panel {
          position: relative;
          background: linear-gradient(135deg, rgba(16, 19, 21, 0.95) 0%, rgba(10, 12, 13, 0.98) 100%);
          border: 1px solid var(--line-strong);
          border-radius: 0 6px 6px 6px;
          padding: 24px;
          min-height: 300px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
        }
        .dossier-panel.active-border-signal {
          border-color: var(--signal);
          box-shadow: 0 0 20px rgba(90, 159, 165, 0.04), 0 15px 45px rgba(0, 0, 0, 0.6);
        }

        /* Tab label at top */
        .dossier-tab {
          position: absolute;
          top: -24px;
          left: -1px;
          height: 24px;
          width: 120px;
          background: #101315;
          border: 1px solid var(--line-strong);
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-data);
          font-size: 9.5px;
          color: var(--ink-dim);
          letter-spacing: 0.08em;
        }
        .dossier-panel.active-border-signal .dossier-tab {
          border-color: var(--signal);
          color: var(--signal);
          background: var(--panel);
        }

        /* Fade-in entrance */
        .dossier-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex: 1;
        }
        .animate-fade-in {
          animation: fadeEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeEnter {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Dossier layout */
        .dossier-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .dossier-title { font-size: 16px; color: var(--ink); margin-bottom: 6px; }
        .dossier-sub-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .dossier-stack-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--signal);
          font-family: var(--font-data);
        }
        .dossier-period { font-size: 10.5px; }

        .dossier-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .status-badge {
          font-family: var(--font-data);
          font-size: 10px;
          letter-spacing: 0.04em;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid;
        }
        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          box-shadow: 0 0 6px currentColor;
        }
        .status-dot.live {
          animation: statusBlink 2.4s ease-in-out infinite;
        }
        @keyframes statusBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .dossier-summary { font-size: 13.5px; color: var(--ink-dim); line-height: 1.6; margin-bottom: 16px; }
        .dossier-bullets { margin: 0 0 20px; padding-left: 18px; font-size: 12.5px; color: var(--ink-dim); }
        .dossier-bullets li { margin-bottom: 6px; }

        .dossier-footer { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--line); }
        .dossier-link-primary {
          font-family: var(--font-data);
          font-size: 11.5px;
          color: var(--signal);
          text-decoration: none;
          display: inline-block;
          border: 1px solid rgba(90, 159, 165, 0.3);
          padding: 6px 14px;
          border-radius: 4px;
          transition: all 0.15s ease;
          letter-spacing: 0.04em;
        }
        .dossier-link-primary:hover {
          background: rgba(90, 159, 165, 0.08);
          border-color: var(--signal);
          box-shadow: 0 0 10px rgba(90, 159, 165, 0.15);
          text-decoration: none;
        }

        .dossier-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          color: var(--ink-faint);
          font-family: var(--font-data);
          font-size: 12px;
        }

        /* Corner brackets */
        .corner-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: var(--line-strong);
          opacity: 0.4;
        }
        .dossier-panel.active-border-signal .corner-bracket {
          border-color: var(--signal);
          opacity: 0.8;
        }
        .corner-bracket.top-left { top: 6px; left: 6px; border-left: 1.5px solid; border-top: 1.5px solid; }
        .corner-bracket.top-right { top: 6px; right: 6px; border-right: 1.5px solid; border-top: 1.5px solid; }
        .corner-bracket.bottom-left { bottom: 6px; left: 6px; border-left: 1.5px solid; border-bottom: 1.5px solid; }
        .corner-bracket.bottom-right { bottom: 6px; right: 6px; border-right: 1.5px solid; border-bottom: 1.5px solid; }

        .chip { font-family: var(--font-data); font-size: 9.5px; padding: 3px 6px; border-radius: 3px; }

        /* Responsive Mobile Layout */
        @media (max-width: 850px) {
          .projects-layout {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          /* Convert sidebar into horizontal scrollbar on mobile */
          .project-master-list {
            flex-direction: row;
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 8px;
            gap: 8px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          
          .project-master-item {
            width: auto;
            flex: 0 0 auto;
            scroll-snap-align: start;
            padding: 8px 14px;
            min-height: 44px; /* Touch target size */
            justify-content: center;
          }
          
          .item-tech-summary {
            display: none; /* Hide stack summary on mobile navigation to save vertical space */
          }
          
          .item-title-row {
            width: auto;
          }

          .dossier-panel {
            border-radius: 4px;
            padding: 20px;
          }
          
          .dossier-tab {
            top: -24px;
            left: 0;
          }
        }
      `}</style>
    </section>
  );
}
