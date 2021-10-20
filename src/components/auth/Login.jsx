import React, { useState, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { formReducer } from '../../lib/reducers';

const StyledForm = styled('form')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(8),
  padding: theme.spacing(4),
  boxShadow: theme.shadows[10],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledField = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const initalFormState = {
  email: '',
  password: '',
};

const Login = (props) => {
  const [formState, dispatch] = useReducer(formReducer, initalFormState);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    dispatch({
      type: 'HANDLE INPUT',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const resetForm = () => {
    for (let key in formState) {
      dispatch({
        type: 'RESET INPUT',
        field: key,
      });
    }
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(`${props.url}/users/login`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(formState),
      });
      let json = await response.json();

      if (json.status === 'success') {
        resetForm();
        props.updateToken(json.data.token);
      } else {
        setError(json.data.message);
      }
    } catch (error) {
      setError('Unable to login');
    }
  };

  if (props.token) return <Redirect to='/' />;
  return (
    <Container fixed maxWidth='sm'>
      <StyledForm onSubmit={handleLogin}>
        <Typography variant='h4' gutterBottom>
          Login
        </Typography>
        <StyledField>
          <InputLabel htmlFor='email'>Email Address</InputLabel>
          <Input
            name='email'
            id='email'
            type='email'
            value={formState.email}
            onChange={(e) => handleInputChange(e)}
          />
        </StyledField>
        <StyledField>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            name='password'
            id='password'
            type='password'
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
            value={formState.password}
            onChange={(e) => handleInputChange(e)}
          />
        </StyledField>
        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
        {error ? <p>{error}</p> : null}
      </StyledForm>
    </Container>
  );
};

export default Login;
