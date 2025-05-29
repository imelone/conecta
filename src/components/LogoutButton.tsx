import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LogoutButton.css';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className = '' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button 
      className={`logout-button ${className}`} 
      onClick={handleLogout}
      title="Cerrar sesión"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
