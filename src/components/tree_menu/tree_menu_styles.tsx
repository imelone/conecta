import { SxProps } from '@mui/material'

export const container: SxProps = {
  overflowX: 'hidden',
  marginBottom: '0.1rem',
}

export const header: SxProps = {
  overflowX: 'hidden',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0.1rem 1rem',
}

export const icon: SxProps = {
  marginRight: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.875rem',
}

export const title: SxProps = {
  margin: 0,
  fontSize: '1rem',
}

export const content: SxProps = {
  overflowX: 'hidden',
  padding: '0.1rem 1rem',
  border: 'none',
  display: 'block',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  flexWrap: 'wrap',
  '& li': {
    textAlign: 'left',
  },
}

export const level0: SxProps = {
  marginLeft: 0,
}

export const level1: SxProps = {
  marginLeft: '1rem',
}

export const level2: SxProps = {
  marginLeft: '2rem',
}

export const levelStyles: Record<string, SxProps> = {
  'level-0': level0,
  'level-1': level1,
  'level-2': level2,
}
