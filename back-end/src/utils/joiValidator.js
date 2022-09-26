function joiValidator(schema) {
  return (data) => {
    const { error, value } = schema.validate(data);
    if (error) {
      error.message = error.details[0].message.replace(/[[\]0-9]{3}/, '');
      throw error;
    }
    return value;
  };
}

module.exports = joiValidator;
