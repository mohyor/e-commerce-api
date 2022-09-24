const router = require("express").Router();

const { adminAuthMiddleware } = require("../../../middlewares/authentication/admin");

const {
  getCart,
  getCarts,
 } = require("../../../controllers/admin/cart");


 router
 .use(adminAuthMiddleware)

 // Protected Routes for Carts.

 .get('/', getCarts)  

 .get('/cart/:cartID', getCart)

module.exports = router;
