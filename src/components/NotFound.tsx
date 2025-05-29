import React from 'react';
import { Link } from 'react-router-dom';
const NotFound: React.FC = () => {
  
  // Show 404 page
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#09a863' }}>404</h1>
      <h2 style={{ margin: '10px 0 30px' }}>Página no encontrada</h2>
      <p style={{ maxWidth: '500px', marginBottom: '30px' }}>
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link to="/home" style={{
        padding: '10px 20px',
        background: '#09a863',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
      }}>
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
