const { validateCart, } = require("../../validation/index");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const CartRepository = require("../../repository/cart");

const cartInstance = new CartRepository();

const createCart = async (req, res) => {
  try {
    let { userID, products } = req.body.data;
    
    const validate = await mapValidation(
      { userID, products },
      validateCart );

    if (validate != null) return errorResponse(res, 422, validate);

    if (await cartInstance.cartExist({ userID: req.authUserID }, {})) {
      return errorResponse(res, 200, "Cart already exists");
    }

    const cart = await cartInstance.createCart(userID, products);

    return successResponse(res, 200, "Cart Created");
  } catch (err) {
    return catchError(err, res);
  }
};

const getUserCart = async (req, res) => {
  try {
    if (await cartInstance.cartExist({ _id: req.authUserID }, {})) {
      const cart = await cartInstance.getUserCart({ userID: req.authUserID })

      return successResponse(res, 200, "Cart Data Returned", cart);
    } else {
      return errorResponse(res, 200, "Cart Doesn't exist.");
    }
  } catch (err) {
  return catchError(err, res);
  }
}

const updateCart = async (req, res) => {
  try {

    let data = {};

    let { userID, products } = req.body.data;

    const validate = await mapValidation({ userID, products }, validateCart );
    
    if (validate != null) return errorResponse(res, 422, validate);

    if (!(await cartInstance.cartExist({ userID }, {}))) {
      return errorResponse(res, 200, "Access Denied!");
    }
       
    if (userID) data.userID = userID;
   
    if (products) data.products = products;

    const cart = await cartInstance.updateCart({ userID: req.authUserID }, data, { new: true } );

    return successResponse(res, 200, "Cart Updated");
  } catch (err) {
    return catchError(err, res);
  }
};

const deleteCart = async (req, res) => {
  try {
    if (await cartInstance.cartExist({ _id: req.authUserID }, {})) {
      await cartInstance.deleteCart({ userID: req.authUserID });
    } else {
      return successResponse(res, 200, "Cart Deleted!");
    }
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports = {
  createCart,
  getUserCart,
  updateCart,
  deleteCart,
};
