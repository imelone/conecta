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
      setError('Por favor, introduce usuario y contraseña');
      return;
    }
    
    const successful = login(username, password);
    
    if (successful) {
      navigate('/home');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={Logo} alt="Conecta Futuro Logo" className="login-logo" />
        </div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Introduce tu usuario"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
            />
          </div>
          
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        
        <div className="login-info">
          <p><strong>Nota:</strong> Inicia sesión con uno de los siguientes usuarios para acceder a datos específicos de municipios:</p>
          <ul>
            <li>Usuario: <code>chiclana</code>, Municipio: Chiclana de Segura</li>
            <li>Usuario: <code>santa_elena</code>, Municipio: Santa Elena</li>
            <li>Usuario: <code>carboneros</code>, Municipio: Carboneros</li>
            <li>Usuario: <code>admin</code>, Acceso: Todos los municipios</li>
          </ul>
          <p>Contraseñas:</p>
          <ul>
            <li>Para usuarios de municipios: <code>password1</code>, <code>password2</code>, <code>password3</code> respectivamente</li>
            <li>Para usuario administrador: <code>admin123</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
