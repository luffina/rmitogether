import React, { useState } from 'react';

export function Auth({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!email || !password || !name) {
        setError('All fields are required');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find(u => u.email === email);

      if (userExists) {
        setError('Email already registered');
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        points: 0,
        badges: [],
        eventsAttended: [],
        interests: ['Gaming', 'Study']
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      onLoginSuccess(newUser);
    } else {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        setError('Invalid email or password');
        return;
      }

      onLoginSuccess(user);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">🎉 RMITogether</h1>
        <p className="auth-subtitle">Discover events at RMIT</p>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@rmit.edu.au"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="auth-toggle">
          <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setEmail('');
              setPassword('');
              setName('');
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <div className="demo-credentials">
          <p className="demo-credentials-title">Demo Credentials:</p>
          <p className="demo-credentials-text">Email: demo@rmit.edu.au</p>
          <p className="demo-credentials-text">Password: demo123</p>
        </div>
      </div>
    </div>
  );
}