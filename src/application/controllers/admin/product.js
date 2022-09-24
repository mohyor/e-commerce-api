const { validateProduct, } = require("../../validation/product");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const ProductRepository = require("../../repository/product");
const multer = require("multer");
const path = require('path');
const mongoose = require("mongoose");
const { ProductModel } = require("../../models/product");

const productInstance = new ProductRepository();

app.post('/upload', async (req, res) => {
  const { image } = req.body
  const buffer = Buffer.from(image, "base64");

  var now = new Date();
  var file_name = "product-" + now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() +'.jpg'

  fs.writeFileSync(`pictures/${file_name}`, buffer, (err, res) => {
    if (err) throw err;
  })

  var files = fs.readdirSync(directoryPath);

  const newFile = await File.create({
    name: `${req.protocol}://${req.get('host')}/pictures/${files[1]}`
  })

  res.send({ "data": { newFile }});
});

const uploadProductImage = async (req, res, next) => {
  
};

const createProduct = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return errorResponse(res, 200, "Product Image Missing");

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/src/public/pictures`;
    const images = [`${basePath}${fileName}`];

    let { name, description, price, discount, /*images,*/ noOfRatings, averageRating, ratings, 
      noOfReviews, reviews, variant, categoryID, quantity, inStock } = req.body.data;
    
    const validate = await mapValidation(
      { name, description, price, discount, images, noOfRatings, averageRating, ratings, 
        noOfReviews, reviews, variant, categoryID, quantity, inStock },
      validateProduct
    );
    if (validate != null) return errorResponse(res, 422, validate);

    if (await productInstance.productExist({ name })) {
      return successResponse(res, 200, "Product already exist");
    }

    await productInstance.createProduct(name, description, price, discount, 
      images, noOfRatings, averageRating, ratings, noOfReviews, reviews, variant, 
      categoryID, quantity, inStock );

    return successResponse(res, 200, "Product Created");
  } catch (err) {
    return catchError(err, res);
  }
};

const updateProduct = async (req, res) => {
  try {

    const productID = req.params.productID;
    
    let data = {};

    let { name, description, price, discount, images, noOfRatings, averageRating, ratings, 
      noOfReviews, reviews, variant, quantity, categoryID, inStock } = req.body.data;

    const validate = await mapValidation(
      { name, description, price, discount, images, noOfRatings, averageRating, ratings, noOfReviews, reviews, variant, 
        quantity, categoryID, inStock },
      validateProduct
    );
    
    if (validate != null) return errorResponse(res, 422, validate);

    if (!(await productInstance.productExist({ _id: productID }, {}))) {
      return errorResponse(res, 200, "Product doesn't exist");
    }

    if (name) data.name = name;

    if (description) data.description = description;

    if (price) data.price = price;

    if (discount) data.discount = discount;

    if (images) data.images = images;

    if (noOfRatings) data.noOfRatings = noOfRatings;

    if (averageRating) data.averageRating = averageRating;

    if (ratings) data.ratings = ratings;

    if (noOfReviews) data.noOfReviews = noOfReviews;

    if (reviews) data.reviews = reviews; 

    if (variant) data.variant = variant;

    if (quantity) data.quantity = quantity;

    if (categoryID) data.categoryID = categoryID;

    if (inStock) data.inStock = inStock;

    await productInstance.updateProductDetails(req.params.productID, data);

    return successResponse(res, 200, "Product Updated");
  } catch (err) {
    return catchError(err, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!(await productInstance.productExist({ _id: req.params.productID }, {}))) {
      return errorResponse(res, 200, "Product doesn't exist");
    } else {
      await productInstance.deleteProduct(req.params.productID);
      return successResponse(res, 200, "Product Deleted!");
    }
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
};
