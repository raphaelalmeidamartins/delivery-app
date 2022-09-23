const md5 = require('md5');

const generateEncryptedPassword = (password) => md5(password);

module.exports = { generateEncryptedPassword };
