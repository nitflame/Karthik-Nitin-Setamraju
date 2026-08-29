import { useEffect, useState } from 'react';
import { CHANNELS } from '../nav';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const sections = CHANNELS.map((c) => document.getElementById(c.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const activeLabel = CHANNELS.find((c) => c.id === active)?.label || 'Overview';

  return (
    <>
      <nav className="mobile-nav-bar" aria-label="Mobile section navigation">
        <button
          className="mobile-nav-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span className="mobile-nav-dot" />
          <span className="mobile-nav-current">{activeLabel}</span>
          <span className="mobile-nav-chevron">{open ? '▾' : '▴'}</span>
        </button>
      </nav>

      {open && (
        <div className="mobile-nav-drawer" role="menu">
          <div className="mobile-nav-drawer-inner">
            {CHANNELS.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                role="menuitem"
                className={active === c.id ? 'mobile-nav-link active' : 'mobile-nav-link'}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-nav-num">{c.num}</span>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .mobile-nav-bar { display: none; }

        @media (max-width: 720px) {
          .mobile-nav-bar {
            display: block;
            position: fixed;
            bottom: 0; left: 0; right: 0;
            z-index: 250;
            background: var(--panel);
            border-top: 1px solid var(--line);
          }
          .mobile-nav-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 18px;
            background: none;
            border: none;
            color: var(--ink);
            font-family: var(--font-data);
            font-size: 12.5px;
          }
          .mobile-nav-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: var(--signal); box-shadow: 0 0 6px var(--signal);
            flex-shrink: 0;
          }
          .mobile-nav-current { flex: 1; text-align: left; color: var(--signal); }
          .mobile-nav-chevron { color: var(--ink-faint); }

          .mobile-nav-drawer {
            position: fixed;
            bottom: 44px; left: 0; right: 0;
            z-index: 249;
            background: var(--panel);
            border-top: 1px solid var(--line);
            max-height: 60vh;
            overflow-y: auto;
          }
          .mobile-nav-drawer-inner { padding: 8px 6px; }
          .mobile-nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            font-family: var(--font-data);
            font-size: 13px;
            color: var(--ink-dim);
            text-decoration: none;
            border-radius: 4px;
          }
          .mobile-nav-link:hover { text-decoration: none; }
          .mobile-nav-link.active { color: var(--signal); background: rgba(90,159,165,0.06); }
          .mobile-nav-num { color: var(--ink-faint); font-size: 11px; }
          .mobile-nav-link.active .mobile-nav-num { color: var(--signal-dim); }
        }
      `}</style>
    </>
  );
}
