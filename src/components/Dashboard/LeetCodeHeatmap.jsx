import { useEffect, useState } from 'react';
import { profile } from '../../content';

const LEETCODE_USERNAME = profile.leetcode;

export default function LeetCodeHeatmap() {
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(false);
  const [calendarData, setCalendarData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    // Set up start/end dates for grid generation
    const today = new Date();
    const endOffset = 6 - today.getDay(); // Align to Saturday
    const gridEndDate = new Date(today);
    gridEndDate.setDate(today.getDate() + endOffset);
    const gridStartDate = new Date(gridEndDate);
    gridStartDate.setDate(gridEndDate.getDate() - 370); // 371 days inclusive (starts on Sunday)

    Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/profile`),
      fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/acSubmission?limit=5`)
    ])
      .then(async ([resProfile, resSub]) => {
        if (!resProfile.ok || !resSub.ok) throw new Error('API request failed');
        const dataProfile = await resProfile.json();
        const dataSub = await resSub.json();

        if (cancelled) return;

        // Process Profile Data
        const easySolved = Number(dataProfile.easySolved ?? 0);
        const mediumSolved = Number(dataProfile.mediumSolved ?? 0);
        const hardSolved = Number(dataProfile.hardSolved ?? 0);
        const totalSolved = Number(dataProfile.totalSolved ?? dataProfile.solvedProblem ?? easySolved + mediumSolved + hardSolved);

        setStats({
          totalSolved: totalSolved || null,
          totalQuestions: dataProfile.totalQuestions ?? null,
          easySolved: easySolved || null,
          mediumSolved: mediumSolved || null,
          hardSolved: hardSolved || null,
        });

        if (dataProfile.submissionCalendar) {
          setCalendarData(parseSubmissionCalendar(dataProfile.submissionCalendar));
        } else {
          setCalendarData(emptyCalendar(gridStartDate));
        }

        // Process Submissions Data
        if (dataSub && dataSub.submission) {
          setSubmissions(dataSub.submission);
        }

        setLastUpdated(new Date().toLocaleString());
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) {
          setError(true);
          setCalendarData(emptyCalendar(gridStartDate));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Grid Generation logic
  const today = new Date();
  const endOffset = 6 - today.getDay();
  const gridEndDate = new Date(today);
  gridEndDate.setDate(today.getDate() + endOffset);
  const gridStartDate = new Date(gridEndDate);
  gridStartDate.setDate(gridEndDate.getDate() - 370);

  const days = [];
  for (let i = 0; i <= 370; i++) {
    const curr = new Date(gridStartDate);
    curr.setDate(gridStartDate.getDate() + i);
    const yyyymmdd = curr.getFullYear() + '-' + 
                     String(curr.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(curr.getDate()).padStart(2, '0');
    days.push({
      date: yyyymmdd,
      count: calendarData[yyyymmdd] || 0,
      month: curr.getMonth(),
      day: curr.getDate()
    });
  }

  const weeks = [];
  for (let i = 0; i < 53; i++) {
    weeks.push(days.slice(i * 7, (i + 1) * 7));
  }

  const monthLabels = [];
  let lastMonth = -1;
  for (let w = 0; w < 53; w++) {
    const firstDayOfWeek = days[w * 7];
    if (firstDayOfWeek) {
      const m = firstDayOfWeek.month;
      if (m !== lastMonth) {
        monthLabels.push({
          text: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m],
          col: w
        });
        lastMonth = m;
      }
    }
  }

  const getCellColor = (count) => {
    if (count === 0) return 'var(--line)';
    if (count <= 2) return 'rgba(90, 159, 165, 0.28)';
    if (count <= 4) return 'rgba(90, 159, 165, 0.55)';
    if (count <= 6) return 'rgba(90, 159, 165, 0.8)';
    return 'var(--signal)';
  };

  const formatRelativeTime = (ts) => {
    const date = new Date(Number(ts) * 1000);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="panel heatmap-panel">
      <span className="panel-telemetry-tag">[CH.01 // RX_FEED_ON]</span>
      <div className="panel-label">Leetcode Command Center — {LEETCODE_USERNAME}</div>

      <div className="leetcode-split">
        {/* Left Column: Heatmap and Solved Stats */}
        <div className="leetcode-left-col">
          <div className="heatmap-container">
            <div className="heatmap-scroll-wrap">
              <svg viewBox="0 0 655 112" className="heatmap-svg">
                {monthLabels.map((l, i) => (
                  <text
                    key={i}
                    x={35 + l.col * 11.5}
                    y="12"
                    fill="var(--ink-dim)"
                    fontSize="9px"
                    fontFamily="var(--font-data)"
                  >
                    {l.text}
                  </text>
                ))}

                <text x="5" y="38" fill="var(--ink-faint)" fontSize="9px" fontFamily="var(--font-data)">Mon</text>
                <text x="5" y="61" fill="var(--ink-faint)" fontSize="9px" fontFamily="var(--font-data)">Wed</text>
                <text x="5" y="84" fill="var(--ink-faint)" fontSize="9px" fontFamily="var(--font-data)">Fri</text>

                {weeks.map((week, wIdx) => (
                  <g key={wIdx}>
                    {week.map((day, dIdx) => (
                      <rect
                        key={dIdx}
                        x={35 + wIdx * 11.5}
                        y={20 + dIdx * 11.5}
                        width="9"
                        height="9"
                        rx="1.5"
                        fill={getCellColor(day.count)}
                        className="heatmap-cell"
                      >
                        <title>{`${day.date}: ${day.count} submissions`}</title>
                      </rect>
                    ))}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="heatmap-readout">
            <div>
              <div className="heatmap-number">{stats?.totalSolved ?? '250+'}</div>
              <div className="heatmap-caption">solved{stats?.totalQuestions ? ` / ${stats.totalQuestions}` : ''}</div>
            </div>
            <div>
              <div className="heatmap-number heatmap-easy">{stats?.easySolved ?? '—'}</div>
              <div className="heatmap-caption">easy</div>
            </div>
            <div>
              <div className="heatmap-number heatmap-medium">{stats?.mediumSolved ?? '—'}</div>
              <div className="heatmap-caption">medium</div>
            </div>
            <div>
              <div className="heatmap-number heatmap-hard">{stats?.hardSolved ?? '—'}</div>
              <div className="heatmap-caption">hard</div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Recent Submissions */}
        <div className="leetcode-right-col">
          <div className="submissions-title">Live Submissions Log</div>
          <div className="submissions-list">
            {submissions.length > 0 ? (
              submissions.map((sub, sIdx) => (
                <div className="submission-card" key={sIdx}>
                  <div className="sub-title-row">
                    <span className="sub-title" title={sub.title}>{sub.title}</span>
                    <span className="sub-lang">{sub.lang}</span>
                  </div>
                  <div className="sub-meta-row">
                    <span className="sub-status">Accepted</span>
                    <span className="sub-time">{formatRelativeTime(sub.timestamp)}</span>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="submissions-placeholder">// FEED OFFLINE //</div>
            ) : (
              <div className="submissions-placeholder">CONNECTING FEED…</div>
            )}
          </div>
        </div>
      </div>

      {lastUpdated && (
        <p className="heatmap-timestamp">Last synchronized: {lastUpdated}</p>
      )}

      {error && (
        <p className="heatmap-note">
          Live LeetCode data feeds are currently down or rate-limited. Submissions are shown as empty rather than invented. Solved counts fall back to verified resume records.
          {' '}
          <a href={`https://leetcode.com/${profile.leetcode}`} target="_blank" rel="noopener noreferrer">
            Check live profile ↗
          </a>
        </p>
      )}

      <style>{`
        .heatmap-panel { grid-column: span 3; }
        
        .leetcode-split {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          gap: 24px;
          margin-top: 14px;
          width: 100%;
        }

        .leetcode-left-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .leetcode-right-col {
          display: flex;
          flex-direction: column;
          border-left: 1px solid var(--line);
          padding-left: 24px;
        }

        /* Submissions Feed Styles */
        .submissions-title {
          font-family: var(--font-data);
          font-size: 10px;
          color: var(--ink-faint);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .submissions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .submission-card {
          background: var(--panel-raised);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .submission-card:hover {
          border-color: var(--signal-dim);
          background: rgba(90, 159, 165, 0.02);
        }

        .sub-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .sub-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
        }

        .sub-lang {
          font-family: var(--font-data);
          font-size: 8.5px;
          color: var(--cyan);
          background: rgba(90, 209, 230, 0.08);
          border: 1px solid rgba(90, 209, 230, 0.15);
          padding: 1px 5px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .sub-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
        }

        .sub-status {
          color: var(--signal);
          font-weight: 500;
          font-family: var(--font-data);
          font-size: 9px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .sub-time {
          color: var(--ink-faint);
          font-family: var(--font-data);
        }

        .submissions-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 140px;
          border: 1px dashed var(--line);
          border-radius: 4px;
          color: var(--ink-faint);
          font-family: var(--font-data);
          font-size: 11px;
          letter-spacing: 0.05em;
        }

        /* Heatmap Grid Styles */
        .heatmap-container { margin-bottom: 12px; }
        .heatmap-scroll-wrap {
          width: 100%;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--line) transparent;
        }
        .heatmap-scroll-wrap::-webkit-scrollbar {
          height: 4px;
        }
        .heatmap-scroll-wrap::-webkit-scrollbar-track {
          background: transparent;
        }
        .heatmap-scroll-wrap::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 2px;
        }
        .heatmap-svg { width: 100%; min-width: 630px; height: auto; display: block; }
        .heatmap-cell:hover {
          stroke: var(--ink);
          stroke-width: 0.8px;
        }
        .heatmap-readout {
          display: flex; gap: 24px; flex-wrap: wrap; margin-top: 4px;
        }
        .heatmap-number { font-family: var(--font-data); font-size: 20px; color: var(--ink); }
        .heatmap-easy { color: var(--signal); }
        .heatmap-medium { color: var(--amber); }
        .heatmap-hard { color: var(--alert); }
        .heatmap-caption { font-size: 10px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: 0.06em; }
        .heatmap-note { font-size: 11px; color: var(--ink-faint); margin-top: 12px; }
        .heatmap-timestamp { font-size: 9.5px; color: var(--ink-faint); margin-top: 14px; text-align: left; }

        @media (max-width: 900px) {
          .leetcode-split {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .leetcode-right-col {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--line);
            padding-top: 16px;
          }
          .sub-title {
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
}

// Renders an empty calendar grid on error
function emptyCalendar(startDate) {
  const calendar = {};
  const startMs = startDate.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  for (let i = 0; i <= 370; i++) {
    const d = new Date(startMs + i * oneDay);
    const yyyymmdd = d.getFullYear() + '-' +
                     String(d.getMonth() + 1).padStart(2, '0') + '-' +
                     String(d.getDate()).padStart(2, '0');
    calendar[yyyymmdd] = 0;
  }
  return calendar;
}

function parseSubmissionCalendar(submissionCalendar) {
  const cal = typeof submissionCalendar === 'string'
    ? JSON.parse(submissionCalendar)
    : submissionCalendar;

  const submissionMap = {};
  Object.entries(cal).forEach(([ts, count]) => {
    const d = new Date(Number(ts) * 1000);
    const yyyymmdd = d.getFullYear() + '-' +
                     String(d.getMonth() + 1).padStart(2, '0') + '-' +
                     String(d.getDate()).padStart(2, '0');
    submissionMap[yyyymmdd] = (submissionMap[yyyymmdd] || 0) + Number(count);
  });

  return submissionMap;
}
