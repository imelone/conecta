import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './login.css';
import Logo from '/assets/icons/logo.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    const successful = login(username, password);
    
    if (successful) {
      navigate('/home');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={Logo} alt="Conecta Futuro Logo" className="login-logo" />
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="login-info">
          <p><strong>Note:</strong> Login with one of the following users to access municipality-specific data:</p>
          <ul>
            <li>Username: <code>chiclana</code>, Municipality: Chiclana de Segura</li>
            <li>Username: <code>santa_elena</code>, Municipality: Santa Elena</li>
            <li>Username: <code>carboneros</code>, Municipality: Carboneros</li>
            <li>Username: <code>admin</code>, Access: All municipalities</li>
          </ul>
          <p>Passwords:</p>
          <ul>
            <li>For municipality users: <code>password1</code>, <code>password2</code>, <code>password3</code> respectively</li>
            <li>For admin user: <code>admin123</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
