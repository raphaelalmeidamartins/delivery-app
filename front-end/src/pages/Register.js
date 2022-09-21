import React from 'react';

function Register() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [disabledButton, setDissabledButton] = useState(true);

  // const handleValidation = () => {
  //   const completedName = 12;
  //   const regexCode = /\S+@\S+\.\S+/;
  //   const minPassword = 6;
  //   const validMail = regexCode.test(email);
  //   if (validMail && password.length >= minPassword && name.length <= completedName) {
  //     setDissabledButton(false);
  //   } else {
  //     setDissabledButton(true);
  //   }
  // };

  // function handleChange({ target: { value } }) {
  //   const registerValues = {
  //     name: () => setName(value),
  //     email: () => setEmail(value),
  //     password: () => setPassword(value),
  //   };
  //   registerValues();
  //   handleValidation();
  // }

  return (
    <div>
      <p>Register</p>
      <input
        type="text"
        name="name"
        placeholder="Seu Nome"
        // value={ name }
        // onChange={ handleChange }
        data-test-id="common_register__input-name"
      />
      <input
        type="email"
        name="email"
        placeholder="seu-email@site.com.br"
        // value={ email }
        // onChange={ handleChange }
        data-test-id="common_register__input-email"
      />
      <input
        type="password"
        name="password"
        placeholder="******"
        // value={ password }
        // onChange={ handleChange }
        data-test-id="common_register__input-password"
      />
      <button
        type="button"
        data-test-id="common_register__button-register"
        // disabled={ disabledButton }
      >
        CADASTRAR
      </button>
    </div>
  );
}

export default Register;
