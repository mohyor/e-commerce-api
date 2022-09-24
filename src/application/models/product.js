const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, unique: true },
  description: { type: String, },
  price: { type: Number, },
  discount: { type: Number },
  //images: { type: Array, default: [], },
  images: [{
    createdAt: { type: Date, default: Date.now, },
    title: { type: String, required: [true, "Uploaded file must have a name"],},
  }],
  noOfRatings: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0, },
  ratings: [{
   userID: { type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'User' },
   rate: { type: Number, required: true },
  }],
  noOfReviews: { type: Number, default: 0, },
  reviews: [{
   userID: { type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'User' },
   comment: { type: String, },
   images: { type: Array, default: [], },
  }],  
  variant: [{
    size: { type: [String], default: [], },
    colour: { type: [String], default: [],},
    images: { type: Array, default:[], },
  }],
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', },
  quantity: { type: Number, },
  inStock: { type: Boolean, default: false, },
 }, { timestamps: true, }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel, };