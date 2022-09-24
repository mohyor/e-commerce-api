const router = require("express").Router();

 const {
  deleteOrder,
  getUserOrders,
  getCurrentOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
 } = require("../../../controllers/user/order");


 const { userAuthMiddleware } = require("../../../middlewares/authentication/user");

router
  .use(userAuthMiddleware)

 // Protected Routes for User's Order.

  // api/v1/order
  .post("/order", createOrder)

  .get('/order/current', getCurrentOrder)

  // api/v1/order/:orderID
  .get("/", getUserOrders)

  // api/v1/order/:orderID
  .delete("/order/:orderID", deleteOrder)

  .put("/order/:orderID", updateOrder)

  .patch('/order/status', updateOrderStatus)

module.exports = router;
