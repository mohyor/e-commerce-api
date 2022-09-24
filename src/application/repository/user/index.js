const mongoose = require("mongoose");
const { UserModel } = require("../../models/user");
const Database = require("../database");

class UserRepository {
  #model;

  constructor() {
    this.#model = UserModel;
  }

  async userExist(andFilter = {}, orFilter = {}) {
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

  async createUser(name, username, email, password) {
    try {
      let data = { name, username, email, password };
      data["_id"] = new mongoose.Types.ObjectId();

      await new this.#model(data).save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUser(filter = {}) {
    try {
      let data = await this.#model.findOne(filter).exec();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
    
  async getUserById(userID) {
    try {
      return await this.#model.findById(userID).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUsers() {
    try {
      let data = await this.#model.find().exec();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async saveUser(data) {
    try {
      const dbInstance = new Database(this.#model);

      return await dbInstance.save(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(userID, data = {}) {
    try {
      let update = await this.#model.findById(userID).updateOne(data);
      return update;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UserRepository;
