import { SxProps } from '@mui/material'

export const dataAnalysisMenu: SxProps = {
  display: 'flex',
  flexFlow: 'column',
  maxHeight: 'calc(100vh - 70px)',
  width: { xs: '100%', sm: '100%', md: '30.125rem' },
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .25)',
  background: '#fff',
  transition: 'transform .3s linear',
  position: 'relative',
  zIndex: 1,
}

export const tabHeader: SxProps = {
  display: 'flex',
  background: '#333',
}

export const tabLink: SxProps = {
  flex: 1,
  padding: { xs: '0.6rem 0.4rem', md: '1rem' },
  textAlign: 'center',
  color: 'black',
  background: '#7a7a7a',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s',
  '& p': { margin: 0, fontSize: { xs: '12px', md: '14px' } },
}

export const tabLinkActive: SxProps = {
  ...tabLink as object,
  background: '#FFFFFF',
}

export const tabContent: SxProps = {
  flexGrow: 1,
  overflowY: 'auto',
  border: 'none',
}

export const tabPane: SxProps = {
  display: 'none',
}

export const tabPaneActive: SxProps = {
  display: 'block',
}

export const tabPaneNoPadding: SxProps = {
  display: 'none',
  margin: 0,
  padding: 0,
}

export const tabPaneNoPaddingActive: SxProps = {
  display: 'block',
  margin: 0,
  padding: 0,
}

export const chartContainer: SxProps = {
  textAlign: 'center',
  margin: '1rem 0',
}

export const gridContainer: SxProps = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  '& .MuiDataGrid-root': {
    border: '1px solid #ddd',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid #ddd',
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
}

export const dataGrid: SxProps = {
  flex: 1,
  height: '100%',
}

export const imageContainer: SxProps = {
  margin: '1rem',
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
  marginBottom: '0.5rem',
  padding: 0,
  fontSize: '1.8rem',
  fontFamily: 'monospace',
  width: '2.4rem',
  height: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'grey',
  '&:hover': {
    color: 'darkgrey',
  },
}

export const link: SxProps = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  gap: { xs: '4px', md: '8px' },
  fontSize: { xs: '0.85rem', md: '1rem' },
  wordBreak: 'break-word',
  '&:hover': {
    color: '#007bff',
  },
}

// cuida_tu_bosque specific styles
export const informacionItem: SxProps = {
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  padding: { xs: '12px', md: '20px' },
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
}

export const informacionItemTitle: SxProps = {
  margin: '0 0 20px 0',
  fontSize: { xs: '15px', md: '18px' },
  fontWeight: 700,
  borderBottom: '2px solid #4B9CD3',
  paddingBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  color: '#333',
  wordBreak: 'break-word',
}

export const colorIndicator: React.CSSProperties = {
  display: 'inline-block',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  marginRight: '8px',
  border: '1px solid #000',
}

export const informacionContent: SxProps = {
  marginLeft: { xs: '8px', md: '20px' },
}

export const documentTitle: SxProps = {
  fontSize: { xs: '14px', md: '16px' },
  color: '#333',
  paddingLeft: { xs: '4px', md: '10px' },
}

export const documentList: SxProps = {
  listStyleType: 'none',
  paddingLeft: 0,
}

export const documentItem: SxProps = {
  marginBottom: '8px',
  listStyle: 'none',
  backgroundColor: '#f9f9f9',
  transition: 'transform 0.2s ease',
  border: 'none',
  padding: { xs: '4px', md: '0' },
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}

export const documentLink: SxProps = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#0066cc',
  fontWeight: 500,
}
