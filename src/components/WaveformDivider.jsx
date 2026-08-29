import { motion } from 'framer-motion';

// A thin animated baseline with an occasional "blip" — used as a section
// divider instead of a plain <hr>. Cheap, quiet, on-theme.
export default function WaveformDivider({ label }) {
  const path =
    "M0,20 L60,20 L68,20 L74,6 L80,34 L86,20 L120,20 L400,20 L408,20 L414,10 L420,30 L426,20 L460,20 L800,20";

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '64px 0 0' }}>
      <svg
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 24, display: 'block' }}
        aria-hidden="true"
      >
        <path d={path} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--signal)"
          strokeWidth="1.2"
          strokeDasharray="0 1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
        {/* Continuous travel signal pulse */}
        <path
          d={path}
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          strokeDasharray="30 250"
          className="waveform-pulse-line"
        />
      </svg>
      
      <style>{`
        .waveform-pulse-line {
          animation: waveformTravel 4.5s linear infinite;
        }
        @keyframes waveformTravel {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -280; }
        }
        @media (prefers-reduced-motion: reduce) {
          .waveform-pulse-line { animation: none; opacity: 0; }
        }
      `}</style>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 10.5,
            letterSpacing: '0.08em',
            color: 'var(--ink-faint)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
