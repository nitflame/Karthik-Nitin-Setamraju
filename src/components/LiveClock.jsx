import { useEffect, useState } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-clock">
      <style>{`
        .live-clock {
          font-family: var(--font-data);
          font-size: 14px;
          color: var(--ink);
          letter-spacing: 0.05em;
          padding: 8px 16px;
          background: rgba(90, 159, 165, 0.06);
          border: 1px solid rgba(90, 159, 165, 0.15);
          border-radius: 4px;
          display: inline-block;
          min-width: 100px;
          text-align: center;
          animation: clockPulse 2s ease-in-out infinite;
        }

        @keyframes clockPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 640px) {
          .live-clock {
            font-size: 12px;
            padding: 6px 12px;
          }
        }
      `}</style>
      {time}
    </div>
  );
}
