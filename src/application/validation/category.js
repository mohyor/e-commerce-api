const Joi = require("@hapi/joi");

exports.validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.required(),
    description: Joi.required(),
  });

  return schema.validate(data);
};