const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 }, { timestamps: true },
);

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = { AdminModel };
