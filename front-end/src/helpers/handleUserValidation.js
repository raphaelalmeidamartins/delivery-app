const handleUserValidation = (email, password, username) => {
  const minLengthName = 12;
  const regexCode = /\S+@\S+\.\S+/;
  const minLengthPassword = 6;
  const validMail = regexCode.test(email);
  if (username) {
    return !(
      validMail
      && password.length >= minLengthPassword
      && username.length >= minLengthName
    );
  }
  return !(validMail && password.length >= minLengthPassword);
};

export default handleUserValidation;
