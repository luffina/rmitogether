import React, { useState, useEffect } from 'react';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const sorted = users
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .slice(0, 10);
    setLeaderboard(sorted);
  }, []);

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const badges = {
    0: '👑 Social Butterfly',
    1: '📚 Study Legend',
    2: '🎮 Game Master'
  };

  return (
    <div>
      <h2 className="leaderboard-title">🏆 Top Community Members</h2>

      {leaderboard.length === 0 ? (
        <div className="empty-message">
          <p>No users yet. Create an account to get started!</p>
        </div>
      ) : (
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="leaderboard-header-item">Rank</div>
            <div className="leaderboard-header-name">Name</div>
            <div className="leaderboard-header-item">Points</div>
            <div className="leaderboard-header-item">Badge</div>
          </div>
          {leaderboard.map((user, index) => (
            <div key={user.id} className="leaderboard-row">
              <div className="leaderboard-rank">{getRankIcon(index)}</div>
              <div className="leaderboard-name">
                <div className="leaderboard-user-name">{user.name}</div>
                <div className="leaderboard-user-email">{user.email}</div>
              </div>
              <div className="leaderboard-points">{user.points || 0}</div>
              <div className="leaderboard-badge">{badges[index] || '⭐ Member'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}