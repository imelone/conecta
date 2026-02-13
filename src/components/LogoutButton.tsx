import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, SxProps } from '@mui/material';
import { logoutButton } from './logout_button_styles';

interface LogoutButtonProps {
  sx?: SxProps;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ sx }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      component="button"
      sx={[logoutButton, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      onClick={handleLogout}
      title="Cerrar sesión"
    >
      Cerrar sesión
    </Box>
  );
};

export default LogoutButton;
