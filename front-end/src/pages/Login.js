import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Button from '../components/Button';

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

  function handleChange({ target: { name, value } }) {
    const loginValues = {
      email: () => setEmail(value),
      password: () => setPassword(value),
    };
    loginValues[name]();
    handleValidation();
  }

  return (
    <div>
      <p>Login</p>
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
      <button
        type="button"
        disabled={ disabledButton }
        data-test-id="common_login__button-login"
      >
        LOGIN
      </button>
      <Link to="/register">
        <button
          type="button"
          data-test-id="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </Link>

    </div>
  );
}

export default Login;
