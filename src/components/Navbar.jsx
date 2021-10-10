import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component={RouterLink}
          to='/'
          color='inherit'
          sx={{ flexGrow: 1, textDecoration: 'none' }}
        >
          RecitaList
        </Typography>

        <Button to='/login' component={RouterLink} color='inherit'>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
