const Joi = require("@hapi/joi");

exports.validateCreateUser = (data) => {
  const schema = Joi.object({
    name: Joi.required(),
    username: Joi.required(),
    email: Joi.required(),
    password: Joi.required(),
  });

  return schema.validate(data);
};

exports.validateUpdateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    picture: Joi.string(),
    address: Joi.object(),

  });

  return schema.validate(data);
};

exports.validateUserLogin = (data) => {
  const schema = Joi.object({
    username: Joi.required(),
    password: Joi.required(),
  });

  return schema.validate(data);
};

exports.validateCart = (data) => {
  const schema = Joi.object({
    userID: Joi.required(),
    products: Joi.array().items(
      Joi.object({
        productID: Joi.required(),
        quantity: Joi.number(),
        basePrice: Joi.number(),
        totalPrice: Joi.number(),
      }
    )),
  });

  return schema.validate(data);
}

exports.validateOrder = (data) => {
  const schema = Joi.object({
    userID: Joi.required(),
    products: Joi.array().items(
      Joi.object({
        productID: Joi.required(),
        quantity: Joi.number(),
        basePrice: Joi.number(),
        totalPrice: Joi.number(),
      }
    )),
    shippingPrice: Joi.number(),
    orderPrice: Joi.number(),
    totalQuantity: Joi.number(),
    shippingAddress: Joi.object({
      country: Joi.string(),
      city: Joi.string(),
      lga: Joi.string(),
      zipCode: Joi.number(),
      street: Joi.string(),
      number: Joi.number(),
      geoLocation: Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
      }),
    }),
    status: Joi.number(),
    currentOrder: Joi.boolean(),
  });

  return schema.validate(data);
}

exports.validateUpdateOrderStatus = (data) => {
  const schema = Joi.object({
    orderID: Joi.required(),
    status: Joi.number(),
  });

  return schema.validate(data);
}
