import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, PropsWithChildren } from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e5deff',
      dark: '#c8bfff',
      light: '#5d4eb7',
      contrastText: '#190064',
    },
    secondary: {
      main: '#5f5c71',
      dark: '#c9c3dc',
      light: '#5f5c71',
      contrastText: '#312e41',
    },
    background: {
      default: '#191c1a',
      paper: '#1c1b1f',
    },
  },
});

const StyledThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default StyledThemeProvider;
