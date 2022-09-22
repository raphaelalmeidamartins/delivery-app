import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
// import handleValidation from '../helpers/handleValidation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledButton, setDissabledButton] = useState(true);

  const handleValidation = () => {
    const regexCode = /\S+@\S+\.\S+/;
    const minPassword = 6;
    const validMail = regexCode.test(email);
    if (validMail && password.length >= minPassword) {
      setDissabledButton(false);
    } else {
      setDissabledButton(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    const loginValues = {
      email: () => setEmail(value),
      password: () => setPassword(value),
    };
    loginValues[name]();
    handleValidation();
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/register', { replace: true });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="email@trybeer.com"
        value={ email }
        onChange={ handleChange }
        data-test-id="common_login__input-email"
      />
      <input
        type="password"
        name="password"
        placeholder="******"
        value={ password }
        onChange={ handleChange }
        data-test-id="common_login__input-password"
      />
      <Button
        title="LOGIN"
        disabled={ disabledButton }
        data-test-id="common_login__button-login"
      />
      <Button
        onSubmit={ handleSubmit }
        title="Ainda não tenho conta"
        data-test-id="common_login__button-register"
      />

    </form>
  );
}

export default Login;
