import { useEffect, useRef } from 'react';

// A very low-opacity radial glow that beats like a resting heartbeat in
// the background, with its intensity nudged up slightly by scroll motion
// and decaying back to a calm baseline when idle. Deliberately capped low
// so scroll energy can only ever modulate an already-subtle effect.
export default function BackgroundPulse() {
  const outerRef = useRef(null);
  const energyRef = useRef(0);
  const lastScrollY = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lastScrollY.current = window.scrollY;

    function loop() {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      // Scroll motion nudges energy up; it decays back down every frame
      // so the effect always settles to a calm resting pulse when idle.
      energyRef.current = Math.min(1, energyRef.current + delta * 0.006);
      energyRef.current *= 0.92;

      if (outerRef.current) {
        const intensity = 0.45 + energyRef.current * 0.55; // 0.45 (resting) .. 1 (active)
        outerRef.current.style.setProperty('--pulse-intensity', intensity.toFixed(3));
      }

      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="bg-pulse-outer"
      ref={outerRef}
      aria-hidden="true"
      style={{
        '--pulse-color': 'rgba(90, 159, 165, 0.05)',
        '--pulse-duration': '1.2s',
      }}
    >
      <div className="bg-pulse-inner" />
      
      {/* Subtle Arc Reactor Telemetry Graphic in background */}
      <div className="arc-reactor-container">
        <svg viewBox="0 0 400 400" className="arc-reactor-svg">
          {/* Core radial glow */}
          <circle cx="200" cy="200" r="40" fill="url(#reactor-glow)" />

          {/* Concentric telemetry guides */}
          <circle cx="200" cy="200" r="60" fill="none" stroke="var(--cyan)" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.3" />
          <circle cx="200" cy="200" r="80" fill="none" stroke="var(--cyan)" strokeWidth="0.5" opacity="0.15" />

          {/* Segmented middle ring (rotates counter-clockwise) */}
          <circle cx="200" cy="200" r="100" fill="none" stroke="var(--cyan)" strokeWidth="1.2" strokeDasharray="30 15 10 15" className="reactor-ring-ccw" />
          <circle cx="200" cy="200" r="115" fill="none" stroke="var(--cyan)" strokeWidth="0.6" strokeDasharray="6 30 18 12" className="reactor-ring-ccw" opacity="0.4" />

          {/* Outer grid ring (rotates clockwise) */}
          <circle cx="200" cy="200" r="135" fill="none" stroke="var(--cyan)" strokeWidth="0.8" strokeDasharray="4 4" className="reactor-ring-cw" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="var(--cyan)" strokeWidth="1.4" strokeDasharray="70 30" className="reactor-ring-cw" />

          {/* Outer limit ring */}
          <circle cx="200" cy="200" r="150" fill="none" stroke="var(--cyan)" strokeWidth="0.5" opacity="0.2" />

          {/* Crosshair guidelines */}
          <line x1="200" y1="35" x2="200" y2="365" stroke="var(--cyan)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />
          <line x1="35" y1="200" x2="365" y2="200" stroke="var(--cyan)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />

          <defs>
            <radialGradient id="reactor-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        .bg-pulse-outer {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: var(--pulse-intensity, 0.45);
          transition: opacity 0.2s linear;
        }
        .bg-pulse-inner {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 50% 22%, var(--pulse-color), transparent 55%);
          animation: bgHeartbeat var(--pulse-duration) ease-in-out infinite;
          transform-origin: 50% 22%;
        }
        
        /* Arc Reactor Background Container */
        .arc-reactor-container {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translate(-50%, 0);
          width: 580px;
          height: 580px;
          opacity: 0.045; /* extremely faint to preserve layout readability */
          mix-blend-mode: screen;
          filter: blur(0.3px);
        }
        .arc-reactor-svg {
          width: 100%;
          height: 100%;
          animation: reactorScalePulse 6s ease-in-out infinite;
        }
        .reactor-ring-cw {
          transform-origin: 200px 200px;
          animation: rotateCw 75s linear infinite;
        }
        .reactor-ring-ccw {
          transform-origin: 200px 200px;
          animation: rotateCcw 50s linear infinite;
        }

        @keyframes rotateCw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateCcw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes reactorScalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        /* A "lub-dub" double-beat shape rather than a plain sine pulse —
           mirrors the physiology traces used elsewhere on the site. */
        @keyframes bgHeartbeat {
          0%   { transform: scale(1);    opacity: 0.55; }
          8%   { transform: scale(1.05); opacity: 1; }
          16%  { transform: scale(0.98); opacity: 0.5; }
          26%  { transform: scale(1.03); opacity: 0.85; }
          40%  { transform: scale(1);    opacity: 0.5; }
          100% { transform: scale(1);    opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-pulse-inner { animation: none; }
          .bg-pulse-outer { opacity: 0.4 !important; }
          .reactor-ring-cw, .reactor-ring-ccw, .arc-reactor-svg { animation: none; }
        }

        @media (max-width: 768px) {
          .arc-reactor-container {
            width: 380px;
            height: 380px;
            top: 14%;
          }
        }
      `}</style>
    </div>
  );
}
