import React from 'react';

export function Profile({ currentUser, setCurrentUser }) {
  const handleRedeemReward = (points) => {
    if (currentUser.points >= points) {
      const updatedUser = { ...currentUser, points: currentUser.points - points };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      alert('Reward redeemed! 🎉');
    } else {
      alert('Not enough points!');
    }
  };

  const rewards = [
    { id: 1, name: '☕ Cafe Voucher ($5)', points: 100, emoji: '☕' },
    { id: 2, name: '🎽 RMITogether Merch', points: 250, emoji: '🎽' },
    { id: 3, name: '🍔 Lunch Discount (20%)', points: 150, emoji: '🍔' },
    { id: 4, name: '🎮 Gaming Pass (1 month)', points: 200, emoji: '🎮' }
  ];

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <h2>{currentUser.name}</h2>
          <p className="profile-email">{currentUser.email}</p>
          <p className="profile-status">RMIT Student</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box purple">
          <div className="stat-number">{currentUser.points || 0}</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat-box pink">
          <div className="stat-number">{currentUser.eventsAttended?.length || 0}</div>
          <div className="stat-label">Events Attended</div>
        </div>
        <div className="stat-box blue">
          <div className="stat-number">{currentUser.badges?.length || 0}</div>
          <div className="stat-label">Badges Earned</div>
        </div>
      </div>

      <h3 className="badges-title">🏅 Your Badges</h3>
      <div className="badges-grid">
        <div className="badge-box">
          <div className="badge-emoji">🦋</div>
          <p className="badge-name">Social Butterfly</p>
          <p className="badge-description">5+ events</p>
        </div>
        <div className="badge-box">
          <div className="badge-emoji">📚</div>
          <p className="badge-name">Study Legend</p>
          <p className="badge-description">3+ study groups</p>
        </div>
        <div className="badge-box">
          <div className="badge-emoji">⭐</div>
          <p className="badge-name">Rising Star</p>
          <p className="badge-description">350+ points</p>
        </div>
        <div className="badge-box">
          <div className="badge-emoji">👑</div>
          <p className="badge-name">Event Creator</p>
          <p className="badge-description">Create events</p>
        </div>
      </div>

      <h3 className="rewards-title">🎁 Available Rewards</h3>
      <div className="rewards-list">
        {rewards.map((reward) => (
          <div key={reward.id} className="reward-item">
            <div>
              <p className="reward-name">{reward.name}</p>
              <p className="reward-points">{reward.points} points</p>
            </div>
            <button
              onClick={() => handleRedeemReward(reward.points)}
              disabled={currentUser.points < reward.points}
              className={`redeem-btn ${
                currentUser.points >= reward.points ? 'enabled' : 'disabled'
              }`}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}