import { useState, useEffect, useRef } from 'react';
import { skills, projects, experience, certifications } from '../content';

export default function TerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'SIGNAL & NOISE — SYSTEM COMMAND PANEL v1.0.0', type: 'system' },
    { text: 'ENTER "help" FOR A LIST OF AVAILABLE INTERFACE COMMANDS.', type: 'system' },
    { text: '', type: 'output' },
  ]);
  const consoleBottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    if (isOpen) {
      focusInput();
    }
  }, [isOpen]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    const newHistory = [...history, { text: `snitink532@kns:~$ ${cmdText}`, type: 'prompt' }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    let output = [];

    switch (trimmed) {
      case 'help':
        output = [
          { text: 'Available commands:', type: 'system' },
          { text: '  skills         - Display categorized technical competencies', type: 'output' },
          { text: '  projects       - List shipped engineering case studies', type: 'output' },
          { text: '  experience     - Print CXR Developer Internship details', type: 'output' },
          { text: '  certifications - Dump verified certifications', type: 'output' },
          { text: '  clear          - Clear console log history', type: 'output' },
          { text: '  exit / close   - Collapse system console drawer', type: 'output' },
        ];
        break;

      case 'skills':
        output = [
          { text: 'SYSTEM SKILLS TELEMETRY:', type: 'system' },
          ...Object.entries(skills).map(([cat, items]) => ({
            text: `  [${cat.toUpperCase()}]: ${items.join(', ')}`,
            type: 'output'
          }))
        ];
        break;

      case 'projects':
        output = [
          { text: 'SHIPPED CASE STUDIES:', type: 'system' },
          ...projects.map((p) => ({
            text: `  ◈ ${p.title} (${p.period})\n    Stack: ${p.stack.join(', ')}\n    URL: ${p.link || 'N/A'}`,
            type: 'output'
          }))
        ];
        break;

      case 'experience':
        output = [
          { text: 'PROFESSIONAL EXPERIENCE RECORD:', type: 'system' },
          { text: `  Role: ${experience[0].role}\n  Org: ${experience[0].org}\n  Period: ${experience[0].period}`, type: 'output' },
          ...experience[0].bullets.map((b) => ({
            text: `    - ${b}`,
            type: 'output'
          }))
        ];
        break;

      case 'certifications':
        output = [
          { text: 'VERIFIED CREDENTIAL LOG:', type: 'system' },
          ...certifications.map((c) => ({
            text: `  ◈ ${c.title} (${c.issuer})\n    Credential ID: ${c.credentialId}\n    Consolidated Score: ${c.score.split(' (')[0]}`,
            type: 'output'
          }))
        ];
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'close':
        setIsOpen(false);
        setInput('');
        return;

      default:
        output = [
          { text: `Command not found: "${trimmed}". Type "help" for a list of commands.`, type: 'error' }
        ];
        break;
    }

    setHistory([...newHistory, ...output, { text: '', type: 'output' }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className={`console-floating-btn ${isOpen ? 'drawer-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle developer console console"
      >
        <span className="console-btn-dot" />
        CON: CONSOLE
      </button>

      {/* Slide-Up Console Drawer */}
      {isOpen && (
        <div className="console-drawer" onClick={focusInput}>
          <div className="console-drawer-header">
            <span className="console-header-title">SYSTEM MONITOR CONSOLE</span>
            <button 
              className="console-close-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              [ ESC: CLOSE ]
            </button>
          </div>

          <div className="console-history-container">
            {history.map((log, idx) => (
              <div 
                key={idx} 
                className={`console-log-line log-${log.type}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {log.text}
              </div>
            ))}
            <div ref={consoleBottomRef} />
          </div>

          <div className="console-shortcuts">
            <span className="shortcuts-label">QUICK CMD:</span>
            {['help', 'skills', 'projects', 'experience', 'certifications', 'clear'].map((cmd) => (
              <button
                key={cmd}
                className="shortcut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(cmd);
                }}
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="console-input-row">
            <span className="console-prompt">snitink532@kns:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="console-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>
      )}

      <style>{`
        .console-floating-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          font-family: var(--font-data);
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-dim);
          background: var(--panel);
          border: 1px solid var(--line-strong);
          border-radius: 4px;
          padding: 8px 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          letter-spacing: 0.05em;
        }

        .console-floating-btn:hover {
          border-color: var(--signal);
          color: var(--signal);
          box-shadow: 0 4px 20px rgba(90, 159, 165, 0.15);
        }

        .console-floating-btn.drawer-active {
          border-color: var(--signal);
          color: var(--signal);
          background: var(--bg);
        }

        .console-btn-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--signal);
          box-shadow: 0 0 4px var(--signal);
          animation: statusPulse 2s infinite;
        }

        /* Slide Up Console Window */
        .console-drawer {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 880px;
          height: 320px;
          background: rgba(10, 12, 13, 0.98);
          border: 1.5px solid var(--line-strong);
          border-bottom: none;
          border-radius: 6px 6px 0 0;
          z-index: 998;
          display: flex;
          flex-direction: column;
          box-shadow: 0 -15px 40px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(90, 159, 165, 0.02);
          font-family: var(--font-data);
          font-size: 12px;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          padding: 16px;
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); }
          to { transform: translate(-50%, 0); }
        }

        .console-drawer-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--line);
          padding-bottom: 10px;
          margin-bottom: 12px;
        }

        .console-header-title {
          font-weight: 600;
          color: var(--ink-dim);
          font-size: 10.5px;
          letter-spacing: 0.05em;
        }

        .console-close-btn {
          font-family: var(--font-data);
          font-size: 10.5px;
          color: var(--ink-faint);
          background: none;
          border: none;
          cursor: pointer;
          letter-spacing: 0.05em;
          padding: 0;
        }

        .console-close-btn:hover {
          color: var(--alert);
        }

        /* Logs display */
        .console-history-container {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 12px;
          padding-right: 6px;
          scrollbar-width: thin;
          scrollbar-color: var(--line) transparent;
        }

        .console-history-container::-webkit-scrollbar {
          width: 3px;
        }
        .console-history-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .console-history-container::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 1.5px;
        }

        .console-log-line {
          line-height: 1.6;
          margin-bottom: 4px;
        }

        .log-system { color: var(--signal); font-weight: 600; }
        .log-prompt { color: var(--ink-dim); }
        .log-output { color: var(--ink-dim); opacity: 0.85; }
        .log-error { color: var(--alert); }

        .console-shortcuts {
          display: flex;
          align-items: center;
          gap: 6px;
          border-top: 1px solid var(--line);
          padding-top: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .shortcuts-label {
          font-family: var(--font-data);
          font-size: 9.5px;
          color: var(--ink-faint);
          margin-right: 4px;
          letter-spacing: 0.05em;
        }
        .shortcut-btn {
          font-family: var(--font-data);
          font-size: 9.5px;
          color: var(--signal);
          background: rgba(16, 185, 129, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 2px 6px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .shortcut-btn:hover {
          background: rgba(16, 185, 129, 0.1);
          border-color: var(--signal);
        }

        /* Input area */
        .console-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 2px;
        }

        .console-prompt {
          color: var(--signal);
          flex-shrink: 0;
          user-select: none;
        }

        .console-input {
          flex: 1;
          background: none;
          border: none;
          color: var(--ink);
          font-family: var(--font-data);
          font-size: 12px;
          outline: none;
          padding: 0;
          caret-color: var(--signal);
        }

        @media (max-width: 720px) {
          .console-drawer {
            max-width: 100%;
            height: 280px;
            border-left: none;
            border-right: none;
            border-radius: 0;
            padding: 12px;
          }
          .console-floating-btn {
            bottom: 64px; /* Move above mobile bottom navigation bar */
            right: 16px;
          }
        }
      `}</style>
    </>
  );
}
