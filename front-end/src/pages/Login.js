import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import handleUserValidation from '../helpers/handleUserValidation';
import service from '../service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const { setUserData } = useContext(AppContext);
  const { palette } = useTheme();

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
      const response = await service.post.login({
        email,
        password,
      });

      const { status } = response;
      const data = await response.json();

      if (status !== StatusCodes.OK) {
        setErrMsg(data.message);
      } else {
        setUserData(data);
        navigate('/customer/products', { replace: true });
      }
    }
  };

  const handleRegister = () => {
    navigate('/register', { replace: true });
  };

  const INPUT_SPACING = '24px';

  return (
    <Wrapper
      sx={ {
        paddingTop: 'unset',
        paddingBottom: 'unset',
      } }
      bgSx={ {
        backgroundColor: palette.background.login,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <Box
        component="form"
        onSubmit={ handleSubmit }
        sx={ {
          display: 'flex',
          flexFlow: 'column nowrap',
          maxWidth: '600px',
          margin: 'auto',
        } }
      >
        <img
          src={ logo }
          alt="Boteco da Dona Menina"
          style={ { maxWidth: '500px', margin: '0 auto' } }
        />
        <FormControl sx={ { marginBottom: INPUT_SPACING } }>
          <TextField
            variant="outlined"
            label="Login"
            required
            type="email"
            name="email"
            placeholder="email@trybeer.com"
            value={ email }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'common_login__input-email' } }
          />
        </FormControl>
        <FormControl sx={ { marginBottom: INPUT_SPACING } }>
          <TextField
            variant="outlined"
            label="Senha"
            required
            type="password"
            name="password"
            placeholder="******"
            value={ password }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'common_login__input-password' } }
          />
        </FormControl>
        <Button
          component="button"
          type="submit"
          variant="contained"
          size="large"
          disabled={ handleUserValidation(email, password) }
          data-testid="common_login__button-login"
          onSubmit={ handleSubmit }
          sx={ { marginBottom: INPUT_SPACING } }
        >
          LOGIN
        </Button>
        <Button
          component="button"
          type="button"
          variant="outlined"
          size="large"
          data-testid="common_login__button-register"
          onClick={ handleRegister }
        >
          Ainda não tenho conta
        </Button>
      </Box>
      {!!errMsg && (
        <Typography
          data-testid="common_login__element-invalid-email"
          variant="body2"
          paragraph
        >
          {errMsg}
        </Typography>
      )}
    </Wrapper>
  );
}

export default Login;
