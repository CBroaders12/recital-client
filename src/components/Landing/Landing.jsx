import React from 'react';

import { Link } from 'react-router-dom';

const Landing = (props) => {
  return (
    <div className='App'>
      <h1>Token</h1>
      <Link to='/login'>Sign in</Link>
    </div>
  );
};

export default Landing;
