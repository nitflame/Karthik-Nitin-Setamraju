import { useEffect, useState } from 'react';

const BAR_COUNT = 5;

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const p = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      setPct(Math.min(100, Math.max(0, p)));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const litBars = Math.round((pct / 100) * BAR_COUNT);

  return (
    <div className="scroll-signal" aria-hidden="true">
      <div className="scroll-signal-bars">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className={i < litBars ? 'signal-bar lit' : 'signal-bar'}
            style={{ height: `${6 + i * 3}px` }}
          />
        ))}
      </div>
      <span className="scroll-signal-pct">{Math.round(pct)}%</span>

      <style>{`
        .scroll-signal {
          position: fixed;
          top: 16px;
          left: calc(var(--rail-width) + 20px);
          z-index: 300;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          font-family: var(--font-data);
          font-size: 10px;
          color: var(--ink-faint);
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 6px 12px;
          transition: left 0.2s ease;
        }
        .scroll-signal-bars {
          display: flex;
          align-items: flex-end;
          gap: 2.5px;
          height: 20px;
        }
        .signal-bar {
          width: 3px;
          background: var(--line-strong);
          border-radius: 1px;
          transition: background 0.2s ease;
        }
        .signal-bar.lit {
          background: var(--signal);
          box-shadow: 0 0 5px var(--signal);
        }
        .scroll-signal-pct { font-variant-numeric: tabular-nums; }

        @media (max-width: 720px) {
          .scroll-signal { left: 16px; top: 12px; padding: 5px 10px; }
        }
      `}</style>
    </div>
  );
}
