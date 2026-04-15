import { SxProps } from '@mui/material'

export const logoContainer: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  overflow: 'hidden',
}

export const sidebarLogoImage: React.CSSProperties = {
  width: '100%',
  maxWidth: '260px',
  height: 'auto',
  objectFit: 'contain',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
}
