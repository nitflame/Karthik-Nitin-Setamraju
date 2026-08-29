import TechLogo, { getTechIcon } from './TechLogo';

// Purely decorative ambient motion — only includes technologies with a
// confirmed real brand logo (see TechLogo's ICON_MAP), so nothing here
// implies a brand association that doesn't exist.
const MARQUEE_ITEMS = [
  'Python', 'FastAPI', 'Unity', 'Java', 'JavaScript',
  'Blender', 'MySQL', 'MongoDB', 'Git', 'VS Code', 'SQL',
].filter((label) => getTechIcon(label));

export default function TechMarquee() {
  const loopItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="tech-marquee" aria-hidden="true">
      <div className="tech-marquee-track">
        {loopItems.map((label, i) => (
          <span className="tech-marquee-item" key={`${label}-${i}`}>
            <TechLogo label={label} size={18} />
            {label}
          </span>
        ))}
      </div>

      <style>{`
        .tech-marquee {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          margin-top: 28px;
        }
        .tech-marquee-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: marqueeScroll 26s linear infinite;
        }
        .tech-marquee-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-data);
          font-size: 12.5px;
          color: var(--ink-faint);
          white-space: nowrap;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
