const { validateCreateCategory } = require("../../validation/index");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const CategoryRepository = require("../../repository/category");

const categoryInstance = new CategoryRepository();

const getCategories = async (req, res) => {
  try {
    const category = await categoryInstance.getCategories();

    if (Array.isArray(category) && category.length) {
      return successResponse(res, 200, "Category", category);
    } else {
      return errorResponse(res, 200, "Categories not found");
    }
  } catch (err) {
    return catchError(err, res);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await categoryInstance.getCategory(req.params.categoryID);

    
   if (await categoryInstance.categoryExist({ name: category.name })) {
    return successResponse(res, 200, "Category", category);
   } else {
    return errorResponse(res, 200, "Category not found");
   }
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports = {
  getCategories,
  getCategory,
};
