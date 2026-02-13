import { SxProps } from '@mui/material'

export const sidebarLogo: SxProps = {
  textAlign: 'center',
  padding: '10px 0',
}

export const sidebarLogoImage: React.CSSProperties = {
  maxWidth: '100%',
  height: 'auto',
}

export const sectionTitle: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '1rem',
  margin: 0,
  fontSize: '24px',
  flex: 1,
}

export const sidebarHeader: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '5rem',
}

export const sidebarPane: SxProps = {
  padding: 0,
}

export const settingsSection: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '10px 0',
}

export const settingsActions: SxProps = {
  marginTop: '10px',
}

export const sidebarLogoutButton: SxProps = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  marginTop: '20px',
  backgroundColor: '#ff6b6b',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#ff4747',
  },
}

export const programItem: SxProps = {
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}

export const homeBackground: SxProps = {
  backgroundImage: "url('/cerro-ballestero-1.png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100%',
  width: '100%',
}
