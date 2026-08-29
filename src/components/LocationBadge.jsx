import { profile } from '../content';

export default function LocationBadge() {
  return (
    <div className="location-badge">
      <style>{`
        .location-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(90, 159, 165, 0.04);
          border: 1px solid rgba(90, 159, 165, 0.12);
          border-radius: 6px;
          font-family: var(--font-data);
          font-size: 12px;
          color: var(--ink-dim);
          letter-spacing: 0.05em;
          width: fit-content;
        }

        .location-icon {
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--signal);
          font-size: 11px;
        }

        .location-text {
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .location-badge {
            padding: 6px 10px;
            font-size: 11px;
          }
        }
      `}</style>
      <div className="location-icon">📍</div>
      <div className="location-text">{profile.location}</div>
    </div>
  );
}
