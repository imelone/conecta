import { SxProps } from '@mui/material'

export const scrollContainer: SxProps = {
  flexGrow: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
}

export const logoContainer: SxProps = {
  textAlign: 'center',
  margin: '0 auto',
}

export const menu: SxProps = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
}

export const toggleSwitch: SxProps = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '10px',
  width: '100%',
}

export const label: SxProps = {
  fontSize: '12px',
  color: '#333',
  marginLeft: '8px',
  wordBreak: 'break-word',
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
