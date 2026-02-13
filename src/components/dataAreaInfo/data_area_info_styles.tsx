import { SxProps } from '@mui/material'

export const areaInfoComponent: SxProps = {
  padding: '20px',
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  position: 'relative',
}

export const iconStyle: SxProps = {
  fontSize: '10px',
}

export const headerStyle: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
}

export const titleStyle: SxProps = {
  margin: 0,
  fontSize: '1em',
}

export const textContent: SxProps = {
  marginTop: '10px',
  fontSize: '14px',
  lineHeight: 1.5,
  color: '#333',
}

export const closeIcon: SxProps = {
  fontSize: '1.9em',
  cursor: 'pointer',
  color: '#aaa',
  transition: 'color 0.2s ease-in-out',
  position: 'absolute',
  top: 0,
  right: 0,
  '&:hover': {
    color: '#000',
  },
}

export const colorCircle: SxProps = {
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  width: '13px',
  height: '13px',
  borderRadius: '50%',
  marginRight: '20px',
  position: 'relative',
}
