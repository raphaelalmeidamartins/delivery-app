import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import handleValidation from '../helpers/handleValidation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserData } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    const loginValues = {
      email: () => setEmail(value),
      password: () => setPassword(value),
    };
    loginValues[name]();
    handleValidation(email, password);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // implementar a lógica da API aqui
    setUserData({ role: 'customer', username: 'Raphael' });
    navigate('/customer/products', { replace: true });
  };

  const handleRegister = () => {
    navigate('/register', { replace: true });
  };

  return (
    <Wrapper>
      <Box component="form" onSubmit={ handleSubmit }>
        <Typography component="h1" variant="h2" gutterBottom>
          Login
        </Typography>
        <FormControl>
          <TextField
            variant="filled"
            label="Login"
            required
            type="email"
            name="email"
            placeholder="email@trybeer.com"
            value={ email }
            onChange={ handleChange }
            data-testid="common_login__input-email"
          />
        </FormControl>
        <FormControl>
          <TextField
            variant="filled"
            label="Senha"
            required
            type="password"
            name="password"
            placeholder="******"
            value={ password }
            onChange={ handleChange }
            data-testid="common_login__input-password"
          />
        </FormControl>
        <Button
          component="button"
          type="submit"
          variant="contained"
          disabled={ handleValidation(email, password) }
          data-testid="common_login__button-login"
          onSubmit={ handleSubmit }
        >
          LOGIN
        </Button>
        <Button
          component="button"
          type="button"
          variant="outlined"
          data-testid="common_login__button-register"
          onClick={ handleRegister }
        >
          Ainda não tenho conta
        </Button>
      </Box>
    </Wrapper>
  );
}

export default Login;
