const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = {  CategoryModel };
