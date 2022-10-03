import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import UserDetailsList from '../components/UserDetailsList';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import handleManageValidation from '../helpers/handleManageValidation';
import service from '../service';

function Manage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [users, setUsers] = useState([]);

  const { userData } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.get.users(userData.token);

      const { status } = response;
      const data = await response.json();

      if (status === StatusCodes.OK) {
        setUsers(data);
      }
    };

    fetchData();
  }, [userData.token, users]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleManageValidation(email, password, username, role)) {
      const response = await service.post.users(userData.token, {
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
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('');
      }
    }
  };

  return (
    <Wrapper>
      <Header />
      <Box component="form" onSubmit={ handleSubmit }>
        <Typography component="h1" variant="h2" gutterBottom>
          Cadastrar novo usuário
        </Typography>
        <FormControl>
          <TextField
            variant="filled"
            label="Nome"
            required
            type="text"
            name="username"
            placeholder="Nome e sobrenome"
            value={ username }
            onChange={ handleChange }
            inputProps={ { 'data-testid': 'admin_manage__input-name' } }
          />
        </FormControl>
        <FormControl>
          <TextField
            variant="filled"
            label="Email"
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
          <InputLabel htmlFor="select-role-input">Tipo</InputLabel>
          <select
            id="select-role"
            type="role"
            name="role"
            value={ role }
            onChange={ handleChange }
            data-testid="admin_manage__select-role"
          >
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
      <UserDetailsList users={ users } />
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
