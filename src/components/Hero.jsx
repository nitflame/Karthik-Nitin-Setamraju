import { motion } from 'framer-motion';
import { profile } from '../content';
import StatsStrip from './StatsStrip';
import TechLogo from './TechLogo';
import TechMarquee from './TechMarquee';
import LiveClock from './LiveClock';
import LocationBadge from './LocationBadge';

const STACK_SENTENCE = ['Python', 'FastAPI', 'Unity', 'Java', 'MongoDB'];

export default function Hero() {
  return (
    <section id="hero" className="section hero-section">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="hero-top-bar">
          <LocationBadge />
          <LiveClock />
        </div>

        <div className="hero-avatar-container">
          <div className="hero-avatar">
            <div className="avatar-ring" />
            <img src="/avatar.jpg" alt="Karthik Nitin Setamraju" className="avatar-img" />
          </div>
        </div>

        <div className="hero-terminal-badge" aria-hidden="true">
          <span className="terminal-method">GET</span>
          <span className="terminal-path">/profile/karthik-nitin-setamraju</span>
          <span className="terminal-status">200 OK</span>
          <span className="terminal-cursor" />
        </div>

        <div className="eyebrow">01 — SYSTEM PROMPT — {profile.location.toUpperCase()}</div>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-tagline">{profile.tagline}</p>

        <p className="hero-stack-line">
          I build AI-powered systems and immersive XR experiences using{' '}
          {STACK_SENTENCE.map((tech, i) => (
            <span className="hero-stack-item" key={tech}>
              <TechLogo label={tech} size={16} />
              {tech}
              {i < STACK_SENTENCE.length - 1 ? ' ' : ''}
            </span>
          ))}
          , focused on computer vision and applied machine learning.
        </p>

        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={`https://leetcode.com/${profile.leetcode}`} target="_blank" rel="noopener noreferrer">LeetCode ↗</a>
          <a href="/Karthik_Nitin_Setamraju_Resume.pdf" download="Karthik_Nitin_Setamraju_Resume.pdf">Resume PDF ⭳</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>

        <StatsStrip />
        <TechMarquee />
      </motion.div>

      <style>{`
        .hero-section { padding-top: 88px; }

        .hero-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .hero-avatar-container {
          margin-bottom: 32px;
          display: flex;
          justify-content: flex-start;
        }

        .hero-avatar {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(90, 159, 165, 0.1) 0%, rgba(90, 159, 165, 0.05) 100%);
          border: 2px solid rgba(90, 159, 165, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 1;
        }

        .avatar-ring {
          position: absolute;
          inset: -8px;
          border: 1.5px solid rgba(90, 159, 165, 0.2);
          border-radius: 50%;
          animation: ringPulse 3s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        .avatar-initial {
          position: relative;
          z-index: 1;
        }

        .hero-name {
          font-size: clamp(28px, 4vw, 42px);
          margin: 14px 0 10px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .hero-terminal-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: var(--panel-raised);
          border: 1px solid var(--line-strong);
          border-radius: 50px;
          font-family: var(--font-data);
          font-size: 11px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .terminal-method {
          color: var(--signal);
          font-weight: 700;
        }
        .terminal-path {
          color: var(--ink-dim);
        }
        .terminal-status {
          color: var(--cyan);
          background: rgba(90, 209, 230, 0.08);
          border: 1px solid rgba(90, 209, 230, 0.15);
          padding: 1px 6px;
          border-radius: 3px;
          font-size: 9.5px;
          font-weight: 600;
        }
        .terminal-cursor {
          display: inline-block;
          width: 2px;
          height: 11px;
          background: var(--signal);
          animation: terminalCursorBlink 1s step-end infinite;
          border-radius: 1px;
        }
        @keyframes terminalCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-tagline {
          font-size: 17px;
          color: var(--signal);
          font-family: var(--font-data);
          margin-bottom: 18px;
        }
        .hero-stack-line {
          max-width: 640px;
          color: var(--ink-dim);
          font-size: 15.5px;
          line-height: 2;
          margin-bottom: 14px;
        }
        .hero-stack-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--ink);
          font-weight: 600;
          margin: 0 2px;
        }
        .hero-summary {
          max-width: 640px;
          color: var(--ink-dim);
          font-size: 15px;
          line-height: 1.7;
        }
        .hero-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 28px;
          font-family: var(--font-data);
          font-size: 13px;
        }

        @media (max-width: 640px) {
          .hero-top-bar {
            margin-bottom: 32px;
            justify-content: flex-start;
          }
          .hero-avatar {
            width: 80px;
            height: 80px;
            font-size: 36px;
          }
        }
      `}</style>
    </section>
  );
}
