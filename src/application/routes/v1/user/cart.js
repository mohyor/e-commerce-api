const router = require("express").Router();

const {
  deleteCart,
  getUserCart,
  createCart,
  updateCart,
 } = require("../../../controllers/user/cart");

 const { userAuthMiddleware } = require("../../../middlewares/authentication/user");

router
  .use(userAuthMiddleware)

  // Protected Routes for User's Cart.

   // api/v1/cart
 .post("/", createCart)

 .get("/", getUserCart)
 
 .delete("/", deleteCart)

 .put("/", updateCart)

module.exports = router;
