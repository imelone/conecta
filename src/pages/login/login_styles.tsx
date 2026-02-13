import { SxProps } from '@mui/material'

export const loginContainer: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
}

export const loginCard: SxProps = {
  width: '100%',
  maxWidth: '450px',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}

export const logoContainer: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1.5rem',
}

export const loginLogo: React.CSSProperties = {
  width: '250px',
  height: '250px',
  objectFit: 'contain',
}

export const heading: SxProps = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#333',
}

export const formGroup: SxProps = {
  marginBottom: '1rem',
  '& label': {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
  },
  '& input': {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
}

export const loginButton: SxProps = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '1rem',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}

export const errorMessage: SxProps = {
  color: '#f44336',
  marginBottom: '1rem',
  padding: '0.5rem',
  backgroundColor: '#ffebee',
  borderRadius: '4px',
  fontSize: '0.9rem',
}

export const loginInfo: SxProps = {
  marginTop: '2rem',
  paddingTop: '1rem',
  borderTop: '1px solid #eee',
  fontSize: '0.9rem',
  '& ul': {
    margin: '0.5rem 0',
    paddingLeft: '1.5rem',
    listStyleType: 'disc',
  },
}
