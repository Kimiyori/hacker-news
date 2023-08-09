import Router from 'components/shared/Router/Router';
import StyledThemeProvider from 'context/ThemeContext';

function App() {
  return (
    <StyledThemeProvider>
      <Router />
    </StyledThemeProvider>
  );
}

export default App;
