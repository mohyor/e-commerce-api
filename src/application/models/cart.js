const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ 
   productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
   quantity: { type: Number },
   basePrice: { type: Number, default: 0, },
   totalPrice: { type: Number, default: 0, },
  }],
  noOfProducts:{ type: Number },
  cartPrice: { type: Number, default: 0, },
 }, { timestamps: true, }
 );

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = {  CartModel };