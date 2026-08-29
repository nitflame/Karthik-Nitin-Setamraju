import { useEffect, useState } from 'react';
import MetricCounter from './MetricCounter';
import { profile, projects } from '../content';

// Three stats: one purely computed from real content (no fetch needed),
// one live-fetched from GitHub, one confirmed static figure from the
// resume. None are invented — the GitHub count either loads for real or
// the tile shows a dash, it never silently falls back to a guessed number.
export default function StatsStrip() {
  const [repoCount, setRepoCount] = useState(null);
  const [repoError, setRepoError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${profile.githubUsername}`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response');
        return res.json();
      })
      .then((data) => {
        if (!cancelled && typeof data.public_repos === 'number') {
          setRepoCount(data.public_repos);
        } else if (!cancelled) {
          setRepoError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setRepoError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="stats-strip">
      <MetricCounter label="Projects Shipped" value={projects.length} />
      <MetricCounter label="GitHub Repos" value={repoCount} loading={repoCount == null && !repoError} />
      <MetricCounter label="LeetCode Solved" value={250} suffix="+" />

      <style>{`
        .stats-strip {
          display: flex;
          gap: 40px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
