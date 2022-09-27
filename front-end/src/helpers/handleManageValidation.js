const handleUserValidation = (email, password, username, role) => {
  const minLengthName = 12;
  const regexCode = /\S+@\S+\.\S+/;
  const minLengthPassword = 6;
  const validMail = regexCode.test(email);
  const validRole = role === 'customer' || role === 'seller';
  if (username) {
    return !(
      validMail
      && password.length >= minLengthPassword
      && username.length >= minLengthName
      && validRole
    );
  }
  return !(validMail && password.length >= minLengthPassword);
};

export default handleUserValidation;
