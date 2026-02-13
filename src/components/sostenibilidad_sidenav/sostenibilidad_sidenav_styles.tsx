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
  minWidth: '20pc',
  display: 'flex',
  alignItems: 'center',
  marginRight: '10px',
}

export const label: SxProps = {
  fontSize: '12px',
  color: '#333',
  marginLeft: '8px',
}

export const sidebarLogoImage: React.CSSProperties = {
  maxWidth: '100%',
  height: 'auto',
}
