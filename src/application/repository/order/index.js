const mongoose = require("mongoose");
const { OrderModel } = require("../../models/order");
const Database = require("../database");

class OrderRepository {
  #model;

  constructor() {
    this.#model = OrderModel;
  }

  async orderExist(andFilter = {}, orFilter = {}) {
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

  async createOrder(userID, products, shippingPrice, orderPrice, totalQuantity, shippingAddress, status, ) {
    try {
      let obj = { userID, products, shippingPrice, orderPrice, totalQuantity, 
        shippingAddress, status, };
      obj["_id"] = new mongoose.Types.ObjectId();

      return await this.#model.create(obj);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getOrders() {
    try {
      return await this.#model.find().exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getOrder(orderID) {
    try {
      return await this.#model.findById(orderID).exec();
    } catch (err) {
      throw new Error(err);
    }
  }
  
  async getUserOrders(filter = {}) {
    try {
      return await this.#model.find(filter).exec();
    } catch (err) {
      throw new Error(err);
    }
  }
    
  async getCurrentOrder(filter) {
    try {
      return await this.#model.findOne({ filter }).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateOrder(filter, data = {}) {
    try {
      return await this.#model.findById(filter).updateOne(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateOrderStatus(filter = {}, data = {}) {
    try {
      return await this.#model.findOne(filter).updateOne(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteOrder(filter = {}) {
    try {
      return await this.#model.findByIdAndDelete(filter).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

}

module.exports = OrderRepository;
