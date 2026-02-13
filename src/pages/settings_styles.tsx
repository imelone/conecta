import { SxProps } from '@mui/material'

export const settingsContainer: SxProps = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

export const settingsHeader: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
  '& h1': {
    margin: 0,
    fontSize: '1.5rem',
    color: '#333',
  },
}
