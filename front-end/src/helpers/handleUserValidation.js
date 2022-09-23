const handleValidation = (username, email, password) => {
  const maxLengthName = 12;
  const regexCode = /\S+@\S+\.\S+/;
  const minLengthPassword = 6;
  const validMail = regexCode.test(email);
  if (username) {
    return !(
      validMail
      && password.length >= minLengthPassword
      && username.length <= maxLengthName
    );
  }
  return !(validMail && password.length >= minLengthPassword);
};

export default handleValidation;
