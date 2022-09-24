const mongoose = require("mongoose");
const { AdminModel } = require("../../models/admin");
const Database = require("../database");

class AdminRepository {
  #model;

  constructor() {
    this.#model = AdminModel;
  }

  async adminExist(andFilter = {}, orFilter = {}) {
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

  async createAdmin(name, username, email, password) {
    try {
      let data = { name, username, email, password };
      data["_id"] = new mongoose.Types.ObjectId();

      await new this.#model(data).save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAdmin(filter = {}) {
    try {
      let data = await this.#model.findOne(filter).exec();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async saveAdmin(data) {
    try {
      const dbInstance = new Database(this.#model);

      return await dbInstance.save(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateAdmin(adminID, data = {}) {
    try {
      let update = await this.#model.findById(adminID).updateOne(data);
      return update;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = AdminRepository;
