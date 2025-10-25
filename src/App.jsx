import React, { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { Feed } from './components/Feed';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('feed');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentPage('feed');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage('feed');
  };

  if (!currentUser) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
      <div className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-title" onClick={() => setCurrentPage('feed')}>
            🎉 RMITogether
          </h1>
          <div className="navbar-buttons">
            <button
              onClick={() => setCurrentPage('feed')}
              className={`nav-btn ${currentPage === 'feed' ? 'active' : ''}`}
            >
              Feed
            </button>
            <button
              onClick={() => setCurrentPage('leaderboard')}
              className={`nav-btn ${currentPage === 'leaderboard' ? 'active' : ''}`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`nav-btn ${currentPage === 'profile' ? 'active' : ''}`}
            >
              Profile
            </button>
            <button onClick={handleLogout} className="nav-btn logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {currentPage === 'feed' && (
          <Feed currentUser={currentUser} setCurrentUser={setCurrentUser} />
        )}
        {currentPage === 'leaderboard' && <Leaderboard />}
        {currentPage === 'profile' && (
          <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
        )}
      </div>
    </div>
  );
}

export default App;