const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const ProductRepository = require("../../repository/product");
const UserRepository = require("../../repository/user");
const productInstance = new ProductRepository();

const getProducts = async (req, res) => {
  try {
    const products = await productInstance.getProducts();

    if (products && products.length > 0) {
      return successResponse(res, 200, "Product", products);
    } else {
      return errorResponse(res, 200, "Product's not found");
    }
  } catch (err) {
    return catchError(err, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productInstance.getProductById(req.params.productID);

    if (await productInstance.productExist({ _id: req.params.productID })) {
      return successResponse(res, 200, "Product", product);
    }
  } catch (err) {
    return catchError(err, res);
  }
};

const getProductRatingsData = async (req, res) => {
  try {
    const product = await productInstance.getProductById(req.params.productID);
    
    if (product) {
      const productRatings = product.ratings.map(rat => rat.rate)
      const avgRating = product.averageRating;
      const numRatings = product.noOfRatings;

      let ratingsData = { productRatings, avgRating, numRatings };
      return successResponse(res, 200, `Ratings Data for ${product.name}`, ratingsData);
    }
  } catch (err) {
    return catchError(err, res);
  }
}

const getProductReviewsData = async (req, res) => {
  try {
    const product = await productInstance.getProductById(req.params.productID);

    if (product) {
      const productReviews = await product.populate('reviews.userID', 'name createdAt');
      const prodReviews = productReviews.reviews

      return successResponse(res, 200, `Reviews for ${product.name}`, prodReviews);
    }
  } catch (err) {
    return catchError(err, res);
  }
}

module.exports = {
  getProducts,
  getProductById,
  getProductRatingsData,
  getProductReviewsData,
};
