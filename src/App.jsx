import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

import Landing from './components/Landing/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

const lightTheme = createTheme();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [baseUrl] = useState('http://localhost:4200/api/v1');

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <Switch>
          <Route path='/' exact>
            <Landing token={token} />
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
