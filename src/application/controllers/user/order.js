const { validateOrder, 
 validateUpdateOrderStatus,
 } = require("../../validation/index");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const OrderRepository = require("../../repository/order");

const orderInstance = new OrderRepository();

const createOrder = async (req, res) => {
 try {
   let { userID, products, shippingPrice, orderPrice, totalQuantity, shippingAddress,  
    status, currentOrder } = req.body.data;
   
   const validate = await mapValidation(
     { userID, products, shippingPrice, orderPrice, totalQuantity, shippingAddress, 
       status, currentOrder },
     validateOrder
   );

   if (validate != null) return errorResponse(res, 422, validate);

   const order = await orderInstance.createOrder(userID, products, shippingPrice, 
    orderPrice, totalQuantity, shippingAddress, status, currentOrder);

   return successResponse(res, 201, "Order Created", order);
 } catch (err) {
   return catchError(err, res);
 }
};

const getUserOrders = async (req, res) => {
 try {
   const order = await orderInstance.getUserOrders({ userID: req.authUserID })

   if (await orderInstance.orderExist()) {
     return successResponse(res, 200, "Order", order);
   }
 } catch (err) {
 return catchError(err, res);
 }
}

const getCurrentOrder = async (req, res) => {
  try {
    const order = await orderInstance.getCurrentOrder({ "currentOrder": true })
    return successResponse(res, 200, "Current Order Returned", order);
  } catch (err) {
    return catchError(err, res);
  }
}

const updateOrder = async (req, res) => {
 try {

   let data = {};

   let { userID, products, shippingPrice, orderPrice, totalQuantity, shippingAddress, 
    status, currentOrder } = req.body.data;

   const validate = await mapValidation(
     { userID, products, shippingPrice, orderPrice, totalQuantity, shippingAddress, status, 
      currentOrder }, validateOrder
   );
   
   if (validate != null) return errorResponse(res, 422, validate);

   if (await orderInstance.orderExist({ products }, {})) {
     return successResponse(res, 200, "Order already exist");
   }
  
   if (userID) data.userID = userID;

   if (products) data.products = products;
      
   if (shippingPrice) data.shippingPrice = shippingPrice;
          
   if (orderPrice) data.orderPrice = orderPrice;
          
   if (totalQuantity) data.totalQuantity = totalQuantity;
          
   if (shippingAddress) data.shippingAddress = shippingAddress;

   if (status) data.status = status;

   if (currentOrder) data.currentOrder = currentOrder;

   await orderInstance.updateOrder( req.params.orderID, data );

   return successResponse(res, 200, "Order", data);
 } catch (err) {
   return catchError(err, res);
 }
};

const updateOrderStatus = async (req, res) => {
 try {

   let data = {};
   let { orderID, status } = req.body.data;

   const validate = await mapValidation(
     { orderID, status }, validateUpdateOrderStatus
   );
   
   if (validate != null) return errorResponse(res, 422, validate);

     
   if (orderID) data.orderID = orderID;

   if (status) data.status = status;

   await orderInstance.updateOrderStatus({ _id: orderID }, data)

   if (!(await orderInstance.orderExist({ orderID }, {}))) {
     return errorResponse(res, 200, "Order doesn't exist");
   } else {
     return successResponse(res, 200, "Order Status Updated", data);
   }

 } catch (err) {
   return catchError(err, res);
 }
}; 

const deleteOrder = async (req, res) => {
 try {
  const orderID = req.params.orderID

  if (!(await orderInstance.orderExist({ _id: orderID }))) {
    return errorResponse(res, 404, "Order Doesn't exist");
  } else {
    await orderInstance.deleteOrder(req.params.orderID );
    return successResponse(res, 200, "Order deleted");
  }
 } catch (err) {
   return catchError(err, res);
 }
};

module.exports = {
 createOrder,
 getUserOrders,
 getCurrentOrder,
 updateOrder,
 deleteOrder,
 updateOrderStatus
};
