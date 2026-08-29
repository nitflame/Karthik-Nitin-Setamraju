import { useEffect, useState } from 'react';

const GATEWAYS = [
  { id: 'github', name: 'github.api.gateway', url: 'https://api.github.com' },
  { id: 'leetcode', name: 'leetcode.api.mirror', url: 'https://alfa-leetcode-api.onrender.com' },
  { id: 'local', name: 'local.host.development', url: '/' },
];

export default function LatencyTelemetryTile() {
  const [telemetry, setTelemetry] = useState({
    github: { latency: null, status: 'CONNECTING' },
    leetcode: { latency: null, status: 'CONNECTING' },
    local: { latency: null, status: 'CONNECTING' },
  });

  const pingGateway = async (gateway) => {
    const start = performance.now();
    try {
      // Use HEAD method and cache: 'no-store' to ensure a fresh round-trip request
      // Use mode: 'no-cors' to prevent CORS failures from blocking the ping duration measurement
      await fetch(gateway.url, { 
        method: 'HEAD', 
        mode: 'no-cors',
        cache: 'no-store'
      });
      const end = performance.now();
      const latency = Math.round(end - start);
      
      let status = 'ONLINE';
      if (latency > 350) status = 'LAGGING';

      return { latency, status };
    } catch (err) {
      console.warn(`Telemetry failed for ${gateway.name}:`, err);
      return { latency: null, status: 'OFFLINE' };
    }
  };

  const updateTelemetry = async () => {
    const results = await Promise.all(GATEWAYS.map((g) => pingGateway(g)));
    const updated = {};
    GATEWAYS.forEach((g, idx) => {
      updated[g.id] = results[idx];
    });
    setTelemetry(updated);
  };

  useEffect(() => {
    updateTelemetry();
    const interval = setInterval(updateTelemetry, 15000); // refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (item) => {
    if (item.status === 'OFFLINE') return 'var(--alert)';
    if (item.status === 'LAGGING') return 'var(--amber)';
    if (item.status === 'CONNECTING') return 'var(--ink-faint)';
    return 'var(--signal)';
  };

  return (
    <div className="panel latency-telemetry-tile">
      <div className="panel-label">Gateway Telemetry</div>

      <div className="telemetry-feed">
        {GATEWAYS.map((g) => {
          const item = telemetry[g.id];
          const color = getStatusColor(item);
          return (
            <div className="tel-row" key={g.id}>
              <div className="tel-meta">
                <span className="tel-indicator" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
                <span className="tel-name">{g.name}</span>
              </div>
              <div className="tel-stats">
                <span className="tel-value" style={{ color: item.latency ? 'var(--ink)' : color }}>
                  {item.status === 'CONNECTING' ? 'PINGING' : item.status === 'OFFLINE' ? 'OFFLINE' : `${item.latency}ms`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="telemetry-footer">
        <span className="telemetry-pulse-dot" />
        <span className="telemetry-footer-text">ACTIVE CHECKING INTERVAL: 15s</span>
      </div>

      <style>{`
        .latency-telemetry-tile {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
        }

        .telemetry-feed {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .tel-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--panel-raised);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 8px 12px;
        }

        .tel-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tel-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: statusBlink 2.4s ease-in-out infinite;
        }

        .tel-name {
          font-family: var(--font-data);
          font-size: 11px;
          color: var(--ink-dim);
        }

        .tel-stats {
          text-align: right;
        }

        .tel-value {
          font-family: var(--font-data);
          font-size: 11px;
          font-weight: 600;
        }

        .telemetry-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          border-top: 1px solid var(--line);
          padding-top: 10px;
          margin-top: 4px;
        }

        .telemetry-pulse-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--signal);
          box-shadow: 0 0 4px var(--signal);
          animation: statusPulse 1.6s infinite;
        }

        .telemetry-footer-text {
          font-family: var(--font-data);
          font-size: 8.5px;
          color: var(--ink-faint);
          letter-spacing: 0.05em;
        }

        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
