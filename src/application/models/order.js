const mongoose = require("mongoose");
const { ORDER_STATUS } = require("../utils/constants")

const orderSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ 
   productID: { type: String, },
   quantity: { type: Number },
   basePrice: { type: Number, default: 0, },
   totalPrice: { type: Number, default: 0, },
  }],
  noOfProducts: { type: Number },
  shippingPrice: { type: Number, default: 0, },
  orderPrice: { type: Number, default: 0, },
  totalQuantity: { type: Number, default: 0, },
  shippingAddress: {
    country: { type: String, },
    city: { type: String, },
    lga: { type: String },
    zipCode: { type: Number },
    street: { type: String },
    number: { type: Number },
    geolocation: {
      lat: { type: Number, default: 0, },
      long: { type: Number, default: 0, },
    },
  },
  status: { type: String, default: ORDER_STATUS.NotPaid, 
    enum: [ ORDER_STATUS.NotPaid, ORDER_STATUS.ProcessingPayment, ORDER_STATUS.Paid, 
      ORDER_STATUS.ProcessingShipping, ORDER_STATUS.Shipped, ORDER_STATUS.Delivered, ORDER_STATUS.Cancelled
    ]},
  currentOrder:{ type: Boolean, default: true },
 }, { timestamps: true, }
 );

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = {  OrderModel };