const router = require("express").Router();

const { userAuthMiddleware } = require("../../../middlewares/authentication/user");

 const {
  createProductRating,
  updateProductRating,
  createOrUpdateProductReview,
  getUserProductRating,
  getUserProductReview,
  deleteProductRating,
  deleteProductReview,
 } = require("../../../controllers/user/product");

 router
 .use(userAuthMiddleware)

 // Protected Routes for Products.

 .patch("/product/ratings/user/rating/create", createProductRating)

 .patch("/product/ratings/user/rating/update", updateProductRating)
 
 .get('/product/:productID/ratings/user/rating', getUserProductRating)

 .delete('/product/:productID/ratings/user/rating', deleteProductRating)

 .post("/product/reviews/review", createOrUpdateProductReview)
 
 .get('/product/:productID/reviews/user/review', getUserProductReview)

 .delete('/product/:productID/reviews/user/review', deleteProductReview)

module.exports = router;
