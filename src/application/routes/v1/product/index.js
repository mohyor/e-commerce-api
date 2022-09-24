const {
 getProductById,
 getProducts,
 getProductRatingsData,
 getProductReviewsData,
} = require("../../../controllers/product");

const router = require("express").Router();

router
 // api/v1/product
 .get("/", getProducts)

 // api/v1/product/:productID
 .get("/:productID", getProductById)

 .get("/:productID/ratings", getProductRatingsData)

 .get("/:productID/reviews", getProductReviewsData)

module.exports = router;
