const { 
 validateGetOrder, } = require("../../validation/index");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const OrderRepository = require("../../repository/order");

const orderInstance = new OrderRepository();
// Protected Methods for Admin.

const getOrder = async (req, res) => {
 try {

   const order = await orderInstance.getOrder(req.params.orderID);

   if (await orderInstance.orderExist({ _id: req.params.orderID })) {
     return successResponse(res, 200, "Order", order);
   } else {
    return errorResponse(res, 200, "Order not found");
   }
 } catch (err) {
   return catchError(err, res);
 }
};

const getOrders = async (req, res) => {
 try {
   const orders = await orderInstance.getOrders();

   if (Array.isArray(orders) && orders.length) {
    return successResponse(res, 200, "Order", orders);
   } else {
    return errorResponse(res, 200, "Order's don't exist");
   }
 } catch (err) {
   return catchError(err, res);
 }
};

module.exports = {
 getOrder,
 getOrders,
};
