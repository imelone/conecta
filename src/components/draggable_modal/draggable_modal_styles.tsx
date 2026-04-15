import { SxProps } from '@mui/material'

export const modalContainer: SxProps = {
  position: 'absolute',
  top: '0.1rem',
  zIndex: 2000,
  left: { xs: 0, sm: 0, md: '26.4rem' },
  width: { xs: '100%', sm: '100%', md: '30.125rem' },
  maxWidth: { xs: '100vw', md: 'none' },
}

export const draggableHandle: SxProps = {
  display: 'flex',
  justifyContent: 'end',
  cursor: 'move',
  backgroundColor: '#fff',
  padding: '0.1rem',
}

export const minimizeButton: SxProps = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '0.2rem',
  padding: 0,
  fontSize: '1.8rem',
  fontFamily: 'monospace',
  width: '2rem',
  height: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'grey',
  '&:hover': {
    color: 'darkgrey',
  },
}
