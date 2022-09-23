const errorHandler = (err, _req, res, _next) => {
  const { name, message, status } = err;
  switch (name) {
    case 'UnauthorizedError': 
      return res.status(status).json({ message });
    case 'ValidationError':
      return res.status(401).json({ message });
    default:
      res.status(500).json({ message });
  }
};

module.exports = errorHandler;