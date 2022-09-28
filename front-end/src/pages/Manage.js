import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import handleManageValidation from '../helpers/handleManageValidation';
import service from '../service';
import NavBar from '../components/NavBar';

function Manage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const { setUserData } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    const loginValues = {
      username: () => setUsername(value),
      email: () => setEmail(value),
      password: () => setPassword(value),
      role: () => setRole(value),
    };
    loginValues[name]();
    handleManageValidation(username, email, password, role);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleManageValidation(email, password, username, role)) {
      const response = await service.post.users({
        name: username,
        email,
        password,
        role,
      });

      const { status } = response;
      const data = await response.json();

      if (status !== StatusCodes.CREATED) {
        setErrMsg(data.message);
      } else {
        setUserData(data);
        navigate('/customer/products', { replace: true });
      }
    }
  };

  return (
    <Wrapper>
      <Box component="form" onSubmit={ handleSubmit }>
        <NavBar />
        <Typography component="h1" variant="h2" gutterBottom>
          Cadastrar novo usuário
        </Typography>
        <FormControl>
          <Typography component="p" gutterBottom>
            Nome
          </Typography>
          <TextField
            variant="filled"
            label="Nome e sobrenome"
            required
            type="text"
            name="username"
            placeholder="Seu nome"
            value={ username }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__input-name' } }
          />
        </FormControl>
        <FormControl>
          <Typography component="p" gutterBottom>
            Email
          </Typography>
          <TextField
            variant="filled"
            label="seu-email@site.com.br"
            required
            type="email"
            name="email"
            placeholder="email@trybeer.com"
            value={ email }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__input-email' } }
          />
        </FormControl>
        <FormControl>
          <Typography component="p" gutterBottom>
            Senha
          </Typography>
          <TextField
            variant="filled"
            label="Senha"
            required
            type="password"
            name="password"
            placeholder="******"
            value={ password }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__input-password' } }
          />
        </FormControl>
        <FormControl>
          <Typography component="p" gutterBottom>
            Tipo
          </Typography>
          <select
            label="Tipo"
            required
            type="role"
            name="role"
            placeholder="******"
            value={ role }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__select-role' } }
          >
            <option value="" disabled>Tipo</option>
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
          </select>
        </FormControl>
        <Button
          component="button"
          type="submit"
          variant="contained"
          disabled={ handleManageValidation(email, password, username, role) }
          data-testid="admin_manage__button-register"
          onSubmit={ handleSubmit }
        >
          CADASTRAR
        </Button>
      </Box>
      {!!errMsg && (
        <Typography
          data-testid="admin_manage__element-invalid-register"
          variant="body2"
          paragraph
        >
          {errMsg}
        </Typography>
      )}
    </Wrapper>
  );
}

export default Manage;
