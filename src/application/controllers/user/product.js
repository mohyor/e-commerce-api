const { 
  validateCreateProductRating, 
  validateUpdateProductRating, 
  validateCreateOrUpdateProductReview } = require("../../validation/product");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const ProductRepository = require("../../repository/product");

const productInstance = new ProductRepository();

const createProductRating = async (req, res) => {

  try {

    let data = {};

    let { productID, userID, rate } = req.body.data;
 
    const validate = await mapValidation(
      { productID, userID, rate }, validateCreateProductRating
    );
    
    if (validate != null) return errorResponse(res, 422, validate);
    
    if (productID) data.productID = productID;
 
    if (userID) data.userID = userID;
 
    if (rate) data.rate = rate;
    
 
    if (!(await productInstance.productExist({ _id: productID }, {}))) {
      return errorResponse(res, 200, "Product doesn't exist");
    } else {

      const rating = { userID: req.authUserID, rate: Number(rate) };
      
      const product = await productInstance.getProduct({ _id: productID });

      const isRated = product.ratings.find((rat) => rat.userID.toString() === req.authUserID.toString())

      if (isRated) {
        return errorResponse(res, 200, "Rating already exists");
      } else {
        product.ratings.push(rating);
        product.noOfRatings = product.ratings.length 
      }

      let avgRating = 0;

      product.ratings.forEach((rat) => { avgRating += rat.rate })

      product.averageRating = Math.round(avgRating / product.ratings.length);

      await product.save();
      
      return successResponse(res, 200, "Product Rating Created");
    }
 
  } catch (err) {
    return catchError(err, res);
  }
 }; 

const updateProductRating = async (req, res) => {

 try {
  
   let data = {};

   let { productID, ratingID, userID, rate } = req.body.data;

   const validate = await mapValidation(
     { productID, ratingID, userID, rate }, validateUpdateProductRating
   );
   
   if (validate != null) return errorResponse(res, 422, validate);
     
   if (productID) data.productID = productID;

   if (ratingID) data.ratingID = ratingID;

   if (userID) data.userID = userID;

   if (rate) data.rate = rate;

   if (!(await productInstance.productExist({ _id: productID, 'ratings.userID': userID }, {}))) {
     return errorResponse(res, 200, "Product doesn't exist");
   } else {
    // update user's product rating
    await productInstance.updateProductRating({ _id: productID }, 
      { 'ratings._id': ratingID }, { $set: { 'ratings.$.rate': rate } });

      // update average rating
      const product = await productInstance.getProduct({ _id: productID });
      
      product.averageRating = Math.ceil(product.ratings.reduce((acc, item) => acc + item.rate, 0)
                              / product.ratings.length)

      await product.save();
      
      return successResponse(res, 200, "Product Rating Updated");
   }
 } catch (err) {
   return catchError(err, res);
 }
}; 

const getUserProductRating = async (req, res) => {

  try {
    const product = await productInstance.getProductById(req.params.productID);

    const userRating = product.ratings.find((rat) => rat.userID.toString() === req.authUserID.toString())

    if (typeof userRating === 'undefined') {
      return errorResponse(res, 200, `User ${req.authUserID} hasn't rated ${product.name}.`)
    } else {
    return successResponse(res, 200, `User ${req.authUserID}'s Rating for ${product.name}`, userRating) 
    }
  } catch (err) {
    return catchError(err, res);
  }
}

const createOrUpdateProductReview = async (req, res) => {

 try {

   let data = {};

   let { productID, userID, comment, images } = req.body.data;

   const validate = await mapValidation(
     { productID, userID, comment, images}, validateCreateOrUpdateProductReview
   );
   
   if (validate != null) return errorResponse(res, 422, validate);

   if (productID) data.productID = productID;

   if (userID) data.userID = userID;

   if (comment) data.comment = comment;

   if (images) data.images = images;

   if (!(await productInstance.productExist({ productID }, {}))) {
     
    return errorResponse(res, 200, "Product doesn't exist");

   } else if (await productInstance.productExist({ productID }, {})) {

    const review = { userID: req.authUserID, comment, images };
      
    const product = await productInstance.getProduct({ _id: productID });

    const isReviewed = product.reviews.find((item) => item.userID.toString() === req.authUserID.toString())

    if (isReviewed) {
      // update the review
      product.reviews.forEach((rev) => {
        if (rev.userID.toString() === req.authUserID.toString())
          (rev.comment = comment), (rev.images = images);
      });

      await product.save();

      return successResponse(res, 200, "Product Review Updated", data);

    } else {
      // create a new review
      product.reviews.push(review);
      product.noOfReviews = product.reviews.length;

      await product.save();

      return successResponse(res, 200, "Product Review Created");
    }
   }
 } catch (err) {
   return catchError(err, res);
 }
}; 

const getUserProductReview = async (req, res) => {

  try {
    const product = await productInstance.getProductById(req.params.productID);

    const userReview = product.reviews.find((rev) => rev.userID.toString() === req.authUserID.toString());

    if (typeof userReview === 'undefined') {
      return errorResponse(res, 200, `User ${req.authUserID} hasn't reviewed ${product.name}.`)
    } else {
    return successResponse(res, 200, `User ${req.authUserID}'s Review for ${product.name}`) 
    }
  } catch (err) {
    return catchError(err, res);
  }
}

const deleteProductRating = async (req, res) => {

  try {
    if (!(await productInstance.productExist({ _id: req.params.productID, 'ratings.userID': req.authUserID }, {}))) {
      return errorResponse(res, 200, 'Product rating not found');
    } else {
      const product = await productInstance.getProductByIdAndUpdate(req.params.productID, 
        { $pull: { ratings : { userID: req.authUserID }}}, { multi: true });
      
      return successResponse(res, 200, `User Rating for ${product.name} Deleted`);
    }
  } catch (err) {
    return catchError(err, res);
  }
}

const deleteProductReview = async (req, res) => {

  try {
    if (!(await productInstance.productExist({ _id: req.params.productID, 'reviews.userID': req.authUserID }, {}))) {
      return errorResponse(res, 200, 'Product review not found');
    } else {
      const product = await productInstance.getProductByIdAndUpdate(req.params.productID, 
        { $pull: { reviews : { userID: req.authUserID }}}, { multi: true });

      return successResponse(res, 200, `User Review for ${product.name} Deleted`);
    }
  } catch (err) {
    return catchError(err, res);
  }
}

module.exports = {
  createProductRating,
  updateProductRating,
  createOrUpdateProductReview,
  getUserProductRating,
  getUserProductReview,
  deleteProductRating,
  deleteProductReview,
};
