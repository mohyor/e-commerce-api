const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, },
  address: {
    country: { type: String, },
    city: { type: String, },
    number: { type: Number },
    geolocation: {
      lat: { type: Number, default: 0,},
      long: { type: Number, default: 0, },
    }
  },
 }, { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };