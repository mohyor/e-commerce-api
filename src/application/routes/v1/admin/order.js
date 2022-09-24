const router = require("express").Router();

const { adminAuthMiddleware } = require("../../../middlewares/authentication/admin");

const {
  getOrders,
  getOrder
 } = require("../../../controllers/admin/order");

router
 .use(adminAuthMiddleware)

 // Protected Routes for Orders.

 .get("/", getOrders)

 .get('/order/:orderID', getOrder)

module.exports = router;
