const router = require("express").Router();

const { adminAuthMiddleware } = require("../../../middlewares/authentication/admin");

 const {
  deleteProduct,
  createProduct,
  updateProduct,

  uploadProductImage
 } = require("../../../controllers/admin/product");

 router
 .use(adminAuthMiddleware)

 // Protected Routes for Products.

   // api/v1/product
 .post("/product", createProduct)

 // api/v1/product/:productID
 .delete("/product/:productID", deleteProduct)

 .put("/product/:productID", updateProduct)

 .post('/product/upload', uploadProductImage);

module.exports = router;
