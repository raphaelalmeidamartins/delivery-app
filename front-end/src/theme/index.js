import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#bf360c',
    },
    secondary: {
      main: '#3e2723',
      contrastText: '#fce4ec',
    },
    background: {
      default: '#fce4ec',
      login: '#fbc4ab',
    },
    productCard: {
      main: '#CB5E3C',
      contrastText: '#3e2723',
    },
    chip: {
      main: '#efe9ae',
      contrastText: '#3e2723',
    },
  },
  typography: {
    fontFamily: '"\'Inter Tight\'", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
