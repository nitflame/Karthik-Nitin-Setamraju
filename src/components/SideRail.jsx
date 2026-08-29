import { useEffect, useState } from 'react';
import { profile } from '../content';
import { CHANNELS } from '../nav';

export default function SideRail() {
  const [active, setActive] = useState('hero');
  const [time, setTime] = useState(new Date());

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

    const clockId = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => {
      observer.disconnect();
      clearInterval(clockId);
    };
  }, []);

  return (
    <nav className="side-rail" aria-label="Section navigation">
      <div className="rail-top">
        <div className="rail-logo">◈ K.N.S</div>
        <div className="rail-sub">SIGNAL MONITOR</div>
      </div>

      <ul className="rail-list">
        {CHANNELS.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className={active === c.id ? 'rail-link active' : 'rail-link'}
            >
              <span className="rail-num">{c.num}</span>
              <span>{c.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="rail-bottom">
        <div className="rail-status">
          <span className="rail-dot" />
          LIVE
        </div>
        <div className="rail-clock">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="rail-loc">{profile.location}</div>
      </div>

      <style>{`
        .side-rail {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: var(--rail-width);
          border-right: 1px solid var(--line);
          background: var(--panel);
          display: flex;
          flex-direction: column;
          padding: 28px 20px;
          z-index: 100;
        }
        .rail-logo {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 0.02em;
        }
        .rail-sub {
          font-family: var(--font-data);
          font-size: 9.5px;
          letter-spacing: 0.14em;
          color: var(--ink-faint);
          margin-top: 4px;
        }
        .rail-list {
          list-style: none;
          margin: 40px 0 0;
          padding: 0;
          flex: 1;
        }
        .rail-link {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 9px 0;
          font-family: var(--font-data);
          font-size: 12.5px;
          color: var(--ink-dim);
          text-decoration: none;
          border-left: 2px solid transparent;
          padding-left: 10px;
          margin-left: -12px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .rail-link:hover { color: var(--ink); text-decoration: none; }
        .rail-link.active {
          color: var(--signal);
          border-left-color: var(--signal);
        }
        .rail-num { color: var(--ink-faint); font-size: 10.5px; }
        .rail-link.active .rail-num { color: var(--signal-dim); }
        .rail-bottom {
          border-top: 1px solid var(--line);
          padding-top: 16px;
          font-family: var(--font-data);
        }
        .rail-status {
          display: flex; align-items: center; gap: 6px;
          font-size: 10.5px; color: var(--signal); letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .rail-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--signal);
          box-shadow: 0 0 6px var(--signal);
          animation: railBlink 2.4s ease-in-out infinite;
        }
        @keyframes railBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .rail-clock { font-size: 11px; color: var(--ink-dim); }
        .rail-loc { font-size: 9.5px; color: var(--ink-faint); margin-top: 2px; }

        @media (max-width: 720px) {
          .side-rail { display: none; }
        }
      `}</style>
    </nav>
  );
}
