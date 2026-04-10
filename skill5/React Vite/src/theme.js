import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', light: '#42A5F5', dark: '#0D47A1' },
    secondary: { main: '#E91E63' },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    background: { default: '#F5F5F5' },
  },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
    },
  },
})

export default theme
