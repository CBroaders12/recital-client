import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

const Landing = (props) => {
  return (
    <div className='App'>
      <h1>Token</h1>
      <Link to='/login'>Sign in</Link>
      <IconButton onClick={props.toggleTheme}>
        {props.isDark ? <DarkMode color='primary' /> : <LightMode />}
      </IconButton>
    </div>
  );
};

export default Landing;
