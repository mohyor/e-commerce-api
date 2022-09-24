const {  validateGetCart, } = require("../../validation/index");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const CartRepository = require("../../repository/cart");

const cartInstance = new CartRepository();

// Protected Methods for Admin.

const getCart = async (req, res) => {
 try {
   const cart = await cartInstance.getCart(req.params.cartID);

   if (await cartInstance.cartExist({ _id: req.params.cartID })) {
     return successResponse(res, 200, "Cart", cart);
   } else {
    return errorResponse(res, 200, "Cart not found");
   }
 } catch (err) {
   return catchError(err, res);
 }
};

const getCarts = async (req, res) => {
 try {
   const carts = await cartInstance.getCarts();

   if (Array.isArray(carts) && carts.length) {
    return successResponse(res, 200, "Cart", carts);    
  } else {
   return errorResponse(res, 200, "Carts not found");
  }
 } catch (err) {
   return catchError(err, res);
 }
};

module.exports = {
 getCart,
 getCarts,
};
