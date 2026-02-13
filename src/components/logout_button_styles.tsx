import { SxProps } from '@mui/material'

export const logoutButton: SxProps = {
  display: 'inline-block',
  padding: '8px 16px',
  backgroundColor: '#ff6b6b',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#ff4747',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.4)',
  },
}
