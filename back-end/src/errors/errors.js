const unauthorizedError = (message) => {
  const error = new Error(message);
  error.name = 'UnauthorizedError';
  error.status = 401;
  throw error;
};

module.exports = { unauthorizedError };