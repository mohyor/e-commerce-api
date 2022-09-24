const mongoose = require("mongoose");
const { CartModel } = require("../../models/cart");
const Database = require("../database");

class CartRepository {
  #model;

  constructor() {
    this.#model = CartModel;
  }

  async cartExist(andFilter = {}, orFilter = {}) {
    try {
      const dbInstance = new Database(this.#model);

      let query = {};

      if (Object.keys(andFilter).length) {
        query["$and"] = await dbInstance.buildClause(andFilter);
      }

      if (Object.keys(orFilter).length) {
        query["$or"] = await dbInstance.buildClause(orFilter);
      }

      return await dbInstance.exist(query);
    } catch (err) {
      throw new Error(err);
    }
  }

  async createCart(userID, products) {
    try {
      let obj = { userID, products };
      obj["_id"] = new mongoose.Types.ObjectId();

      await new this.#model(obj).save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCarts() {
    try {
      return await this.#model.find().exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCart(cartID) {
    try {
      return await this.#model.findById(cartID).exec();
    } catch (err) {
      throw new Error(err);
    }
  }
  
  async getUserCart(filter) {
    try {
      return await this.#model.findOne({ filter }).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateCart(filter = {}, data = {}, confirmed = {}) {
    try {
      return await this.#model.findOneAndUpdate(filter, data, confirmed);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteCart(filter = {}) {
    try {
      return await this.#model.findOneAndDelete(filter).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

}

module.exports = CartRepository;
