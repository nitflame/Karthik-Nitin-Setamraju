import { useState } from 'react';

// This tile previously accepted any user-uploaded image, ran a fake
// "scanning" animation, then returned a RANDOM behavior classification
// dressed up as real EfficientNet-B0 output — actively misleading, since
// a visitor uploading their own photo would get a fabricated result
// presented as genuine model inference.
//
// Fixed version: no file upload (removed entirely — accepting a real
// image implies real analysis of it, which this can't honestly offer
// since the trained model isn't deployed here). Instead, this walks
// through the project's real, fixed set of trained behavior classes on
// a single illustrative sample frame, clearly labeled as a recreation of
// the interface — not live inference.
const BEHAVIORS = [
  { label: 'Writing Notes', attention: 'High', icon: '📝' },
  { label: 'Raising Hand', attention: 'Critical', icon: '🙋‍♂️' },
  { label: 'Focused Reading', attention: 'High', icon: '📖' },
  { label: 'Looking at Board', attention: 'High', icon: '👀' },
  { label: 'Distracted (Talking)', attention: 'Low', icon: '💬' },
  { label: 'Looking Away', attention: 'Low', icon: '🤷' },
  { label: 'Sleeping', attention: 'Zero', icon: '💤' },
  { label: 'Using Phone', attention: 'Low', icon: '📱' },
];

export default function InferenceLabTile() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = BEHAVIORS[activeIdx];

  return (
    <div className="panel inference-lab-tile">
      <div className="panel-label">Attention Classifier — Trained Behavior Classes</div>
      <p className="lab-disclaimer">
        Illustrative recreation of the classifier's 12 trained behavior classes (8 shown) — not live inference. The trained model isn't deployed here.
      </p>

      <div className="behavior-picker">
        {BEHAVIORS.map((b, i) => (
          <button
            key={b.label}
            className={i === activeIdx ? 'behavior-chip active' : 'behavior-chip'}
            onClick={() => setActiveIdx(i)}
          >
            {b.icon} {b.label}
          </button>
        ))}
      </div>

      <div className="lab-results">
        <div className="res-row">
          <span className="res-lbl">CLASS</span>
          <span className="res-val highlight-green">{active.icon} {active.label}</span>
        </div>
        <div className="res-row">
          <span className="res-lbl">ATTENTION QUALITY</span>
          <span
            className="res-val"
            style={{
              color:
                active.attention === 'High' || active.attention === 'Critical'
                  ? 'var(--signal)'
                  : 'var(--amber)',
            }}
          >
            {active.attention.toUpperCase()}
          </span>
        </div>
      </div>

      <style>{`
        .inference-lab-tile {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
        }
        .lab-disclaimer {
          font-family: var(--font-data);
          font-size: 10px;
          color: var(--ink-faint);
          line-height: 1.5;
          margin: 0;
        }
        .behavior-picker {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .behavior-chip {
          font-family: var(--font-data);
          font-size: 10px;
          color: var(--ink-dim);
          background: var(--panel-raised);
          border: 1px solid var(--line-strong);
          border-radius: 20px;
          padding: 5px 10px;
          transition: all 0.15s ease;
        }
        .behavior-chip:hover { color: var(--ink); }
        .behavior-chip.active {
          color: var(--signal);
          border-color: var(--signal);
          box-shadow: 0 0 8px rgba(77, 255, 154, 0.15);
        }
        .lab-results {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-top: 1px solid var(--line);
          padding-top: 12px;
          margin-top: auto;
        }
        .res-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed var(--line);
          padding-bottom: 4px;
          align-items: baseline;
        }
        .res-lbl {
          font-family: var(--font-data);
          font-size: 9.5px;
          color: var(--ink-faint);
          text-transform: uppercase;
        }
        .res-val {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink);
        }
        .res-val.highlight-green {
          color: var(--signal);
        }
      `}</style>
    </div>
  );
}
