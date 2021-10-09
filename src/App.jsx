import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

import Landing from './components/Landing/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [baseUrl] = useState('http://localhost:4200/api/v1');
  const [displayDarkTheme, setDisplayDarkTheme] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    if (displayDarkTheme) {
      setCurrentTheme(lightTheme);
    } else {
      setCurrentTheme(darkTheme);
    }
    setDisplayDarkTheme(!displayDarkTheme);
  };

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={currentTheme}>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Landing
              token={token}
              toggleTheme={toggleTheme}
              isDark={displayDarkTheme}
            />
          </Route>
          <Route path='/login' exact>
            <Login updateToken={updateToken} url={baseUrl} token={token} />
          </Route>
          <Route path='/register' exact>
            <Register updateToken={updateToken} url={baseUrl} token={token} />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
