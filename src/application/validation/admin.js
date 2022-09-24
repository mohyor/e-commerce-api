const Joi = require("@hapi/joi");

exports.validateAdmin = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  });

  return schema.validate(data);
};
