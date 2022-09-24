const mongoose = require("mongoose");
const { CategoryModel } = require("../../models/category");
const Database = require("../database");

class CategoryRepository {
  #model;

  constructor() {
    this.#model = CategoryModel;
  }

  async categoryExist(andFilter = {}, orFilter = {}) {
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

  async createCategory(name, description) {
    try {
      let obj = { name, description };
      obj["_id"] = new mongoose.Types.ObjectId();

      await new this.#model(obj).save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCategories(where = {}) {
    try {
      return await this.#model.find().exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCategory(categoryID) {
    try {
      return await this.#model.findById(categoryID).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateCategory(categoryID, data = {}) {
    try {
      return await this.#model.findById(categoryID).updateOne(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteCategory(categoryID) {
    try {
      return await this.#model.findByIdAndDelete(categoryID).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

}

module.exports = CategoryRepository;
