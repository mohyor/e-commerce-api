const mongoose = require("mongoose");
const { ProductModel } = require("../../models/product");
const Database = require("../database");

class ProductRepository {
  #model;

  constructor() {
    this.#model = ProductModel;
  }

  async productExist(andFilter = {}, orFilter = {}) {
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
  
  
  async createProduct(name, description, price, discount, images, noOfRatings, averageRating, 
    ratings, noOfReviews, reviews,  variant, categoryID, quantity, inStock ) {
    try {
      let obj = { name, description, price, discount, images, noOfRatings, averageRating, ratings, noOfReviews, 
        reviews, variant, categoryID, quantity, inStock };
      obj["_id"] = new mongoose.Types.ObjectId();

      return await this.#model.create(obj);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProducts() {
    try {
      return await this.#model.find().exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProductById(productID) {
    try {
      return await this.#model.findById(productID);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProduct(filter = {}) {
    try {
      return await this.#model.findOne(filter).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateProductDetails(productID, data = {}) {
    try {
      return await this.#model.findById(productID).updateOne(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  
  async getProductByIdAndUpdate(filter, update = {}, condition = {}) {
    try {
      return await this.#model.findByIdAndUpdate(filter, update, condition);
    } catch (err) {
      throw new Error(err);
    }
  }

  async createProductRating(filter = {}, data = {}) {
    try {
      return await this.#model.findOne(filter).updateOne(data);
    } catch (err) {
      throw new Error(err);
    }
  }
  
  async updateProductRating(filter = {}, filter2 = {}, data = {}) {
    try {
      return await this.#model.findOne(filter).updateOne( filter2, data );
    } catch (err) {
      throw new Error(err);
    }
  }

    async createOrUpdateProductReview(filter) {
      try {
        return await this.#model.findOneAndUpdate({ filter });
      } catch (err) {
        throw new Error(err);
      }
    }
  

  async deleteProduct(productID) {
    try {
      return await this.#model.findByIdAndDelete(productID).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

}

module.exports = ProductRepository;
