import { useEffect, useRef, useState } from 'react';

// A single stat tile that counts up from 0 to its target once it scrolls
// into view. Used for confirmed, computed values (project count) and for
// live-fetched values (GitHub repos) — never a hardcoded guess.
export default function MetricCounter({ label, value, suffix = '', loading = false }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (value == null) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          animateCount(value, setDisplay);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-counter" ref={ref}>
      <div className="stat-value">
        {loading ? <span className="stat-dash">—</span> : `${display}${suffix}`}
      </div>
      <div className="stat-label">{label}</div>

      <style>{`
        .stat-counter { display: flex; flex-direction: column; gap: 4px; }
        .stat-value {
          font-family: var(--font-data);
          font-size: 26px;
          color: var(--signal);
          line-height: 1;
        }
        .stat-dash { color: var(--ink-faint); }
        .stat-label {
          font-size: 10.5px;
          color: var(--ink-faint);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
      `}</style>
    </div>
  );
}

function animateCount(target, setDisplay) {
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setDisplay(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
