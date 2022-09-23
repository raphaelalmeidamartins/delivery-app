const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidation = (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) throw error;
  next();
};

module.exports = loginValidation;
