import React, { useState, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { formReducer } from '../../lib/reducers';
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
  width: '100%',
}));

const initalFormState = {
  email: '',
  password: '',
  cPassword: '',
};

const Register = (props) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.cPassword === formState.password) {
      setError('');

      const response = await fetch(`${props.url}/users/register`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(formState),
      });

      const json = await response.json();

      if (json.status === 'success') {
        resetForm();
        props.updateToken(json.data.token);
      } else {
        setError(json.data.message);
      }
    } else {
      setError('Passwords must match');
    }
  };

  if (props.token) return <Redirect to='/' />;
  return (
    <Container fixed maxWidth='sm'>
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant='h4' gutterBottom>
          Register
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
        <StyledField>
          <InputLabel htmlFor='cPassword'>Confirm Password</InputLabel>
          <Input
            name='cPassword'
            id='cPassword'
            type='password'
            value={formState.cPassword}
            onChange={(e) => handleInputChange(e)}
          />
        </StyledField>
        <Button type='submit' variant='contained' color='primary'>
          Register
        </Button>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
        {error ? <p>{error}</p> : null}
      </StyledForm>
    </Container>
  );
};

export default Register;
