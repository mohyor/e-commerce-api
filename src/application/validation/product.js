const Joi = require("@hapi/joi");

exports.validateProduct = (data) => {
 const schema = Joi.object({
   name: Joi.string(),
   description: Joi.string(),
   price: Joi.number(),
   discount: Joi.number(),
   images: Joi.array().items(Joi.string()),
   noOfRatings: Joi.number(),
   averageRating: Joi.number(),
   ratings: Joi.array().items(
     Joi.object({
       userID: Joi.required(),
       rate: Joi.number(),
     }
   )),
   noOfReviews: Joi.number(),
   reviews: Joi.array().items(
     Joi.object({
       userID: Joi.required(),
       comment: Joi.string(),
       images: Joi.array().items(Joi.string()),
     }
   )),
   variant: Joi.array().items(
     Joi.object({
       size: Joi.string(),
       colour: Joi.string(),
       images: Joi.array().items(Joi.string()),
     }
   )),
   categoryID: Joi.required(),
   quantity: Joi.number(),
   inStock: Joi.boolean(),
 });

 return schema.validate(data);
}

exports.validateCreateProductRating = (data) => {
 const schema = Joi.object({
   productID: Joi.required(),
   userID: Joi.required(),
   rate: Joi.number(),
 });

 return schema.validate(data);
}

exports.validateUpdateProductRating = (data) => {
 const schema = Joi.object({
   productID: Joi.required(),
   ratingID: Joi.required(),
   userID: Joi.required(),
   rate: Joi.number(),
 });

 return schema.validate(data);
}

exports.validateCreateOrUpdateProductReview = (data) => {
 const schema = Joi.object({
   productID: Joi.required(),
   userID: Joi.required(),
   comment: Joi.string(),
   images: Joi.array().items(Joi.string()),
 });

 return schema.validate(data);
}
