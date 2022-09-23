import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import handleUserValidation from '../helpers/handleUserValidation';
import service from '../service';

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
    handleUserValidation(email, password);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // implementar a lógica da API aqui
    if (!handleUserValidation(email, password)) {
      const userData = await service.post.login({
        email,
        password,
      });
      setUserData(userData);
      navigate('/customer/products', { replace: true });
    }
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
          disabled={ handleUserValidation(email, password) }
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
