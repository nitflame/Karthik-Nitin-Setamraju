import { useState } from 'react';
import { profile } from '../content';

const PURPOSES = ['Opportunity', 'Collaboration', 'General'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', purpose: 'Opportunity', message: '' });
  const [sent, setSent] = useState(false);

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // No backend on a static site — this opens the visitor's own email
  // client with the message pre-filled, rather than silently pretending
  // to submit somewhere. Wire up Formspree/EmailJS later if you want a
  // true in-page submit without leaving the browser.
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    const subject = encodeURIComponent(`Portfolio contact — ${form.purpose} — from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="eyebrow">07 — INFERENCE ENDPOINT</div>
      <h2>Contact</h2>
      <p className="contact-line">
        Open to AI/ML and XR development roles and internships. Reach out directly, or open a channel below:
      </p>

      <form className="panel channel-form" onSubmit={handleSubmit}>
        <div className="panel-label">Open a channel</div>

        <div className="purpose-row">
          {PURPOSES.map((p) => (
            <button
              type="button"
              key={p}
              className={form.purpose === p ? 'purpose-btn active' : 'purpose-btn'}
              onClick={() => update('purpose', p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="form-row">
          <input
            className="form-input"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            required
          />
        </div>

        <textarea
          className="form-input form-textarea"
          placeholder="What's this about?"
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          required
        />

        <button type="submit" className="form-submit" disabled={!isValid}>
          {sent ? 'Opened in your mail app ✓' : 'Send Signal →'}
        </button>
        <p className="form-note">Opens your email client with this pre-filled — nothing is stored on this site.</p>
      </form>

      <div className="contact-grid">
        <a className="panel contact-card" href={`mailto:${profile.email}`}>
          <span className="panel-label">Email</span>
          <span className="contact-value">{profile.email}</span>
        </a>
        <a className="panel contact-card" href={profile.github} target="_blank" rel="noopener noreferrer">
          <span className="panel-label">GitHub</span>
          <span className="contact-value">github.com/nitflame</span>
        </a>
        <a className="panel contact-card" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <span className="panel-label">LinkedIn</span>
          <span className="contact-value">Connect ↗</span>
        </a>
        <a className="panel contact-card" href={`https://leetcode.com/${profile.leetcode}`} target="_blank" rel="noopener noreferrer">
          <span className="panel-label">LeetCode</span>
          <span className="contact-value">{profile.leetcode}</span>
        </a>
      </div>

      <footer className="footer">
        {profile.name} · {profile.location} · Built as a Vite + React single-page site
      </footer>

      <style>{`
        .contact-line { color: var(--ink-dim); font-size: 14px; margin-bottom: 24px; }

        .channel-form { margin-bottom: 24px; }
        .purpose-row { display: flex; gap: 8px; margin: 12px 0 16px; flex-wrap: wrap; }
        .purpose-btn {
          font-family: var(--font-data); font-size: 11.5px; color: var(--ink-dim);
          background: var(--panel-raised); border: 1px solid var(--line-strong);
          border-radius: 20px; padding: 6px 14px; transition: all 0.15s ease;
        }
        .purpose-btn:hover { color: var(--ink); }
        .purpose-btn.active { color: var(--signal); border-color: var(--signal); box-shadow: 0 0 10px rgba(77,255,154,0.15); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .form-input {
          width: 100%; background: var(--bg); border: 1px solid var(--line-strong);
          border-radius: 4px; padding: 10px 12px; color: var(--ink); font-family: var(--font-body);
          font-size: 13.5px;
        }
        .form-input:focus { outline: none; border-color: var(--signal-dim); }
        .form-textarea { margin-bottom: 14px; resize: vertical; font-family: var(--font-body); }
        .form-submit {
          font-family: var(--font-data); font-size: 12.5px; letter-spacing: 0.05em;
          color: var(--signal); background: rgba(77,255,154,0.06); border: 1px solid var(--signal-dim);
          border-radius: 4px; padding: 10px 18px; transition: all 0.15s ease;
        }
        .form-submit:hover:not(:disabled) { background: rgba(77,255,154,0.14); box-shadow: 0 0 14px rgba(77,255,154,0.2); }
        .form-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .form-note { font-size: 10.5px; color: var(--ink-faint); margin-top: 10px; }

        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .contact-card { display: flex; flex-direction: column; gap: 8px; text-decoration: none; transition: border-color 0.15s ease; }
        .contact-card:hover { border-color: var(--signal-dim); text-decoration: none; }
        .contact-value { font-family: var(--font-data); font-size: 13.5px; color: var(--ink); }
        .footer {
          margin-top: 64px; padding-top: 20px; border-top: 1px solid var(--line);
          font-size: 11.5px; color: var(--ink-faint); font-family: var(--font-data);
        }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
