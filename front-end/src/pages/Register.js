import React, { useState } from 'react';
import Button from '../components/Button';

function Register() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledButton, setDissabledButton] = useState(true);

  const handleValidation = () => {
    const completedName = 12;
    const regexCode = /\S+@\S+\.\S+/;
    const minPassword = 6;
    const validMail = regexCode.test(email);
    if (validMail && password.length >= minPassword && user.length >= completedName) {
      setDissabledButton(false);
    } else {
      setDissabledButton(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    const registerValues = {
      user: () => setUser(value),
      email: () => setEmail(value),
      password: () => setPassword(value),
    };
    registerValues[name]();
    handleValidation();
  };

  return (
    <form>
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        placeholder="Seu Nome"
        value={ user }
        onChange={ handleChange }
        data-test-id="common_register__input-name"
      />
      <input
        type="email"
        name="email"
        placeholder="seu-email@site.com.br"
        value={ email }
        onChange={ handleChange }
        data-test-id="common_register__input-email"
      />
      <input
        type="password"
        name="password"
        placeholder="******"
        value={ password }
        onChange={ handleChange }
        data-test-id="common_register__input-password"
      />
      <Button
        title="CADASTRAR"
        data-test-id="common_register__button-register"
        disabled={ disabledButton }
      />
    </form>
  );
}

export default Register;
