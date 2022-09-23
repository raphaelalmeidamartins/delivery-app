const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().optional(),
});

const userValidation = (req, _res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) throw error;
  next();
};

module.exports = userValidation;
