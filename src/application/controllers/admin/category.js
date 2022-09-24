const { validateCategory } = require("../../validation/category");
const { catchError, mapValidation } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/response");
const CategoryRepository = require("../../repository/category");

const categoryInstance = new CategoryRepository();

const createCategory = async (req, res) => {
  try {
    let { name, description } = req.body.data;

    const validate = await mapValidation(
      { name, description }, validateCategory );

    if (validate != null) return errorResponse(res, 422, validate);

    if (await categoryInstance.categoryExist({ name })) {
      return successResponse(res, 200, "Category already exist");
    }

    await categoryInstance.createCategory(name, description);

    return successResponse(res, 200, "Category Created");
  } catch (err) {
    return catchError(err, res);
  }
};

const updateCategory = async (req, res) => {
 try {
  let data = {};

  let { name, description } = req.body.data;

  const validate = await mapValidation({ name, description }, validateCategory );
  if (validate != null) return errorResponse(res, 422, validate);

  if (!(await categoryInstance.categoryExist({ name }))) {
    return successResponse(res, 200, "Category doesn't exist");
  } else {
    const category = await categoryInstance.updateCategory(
      req.params.categoryID, req.body.data );

    return successResponse(res, 200, "Category", category);
  }
 } catch (err) {
   return catchError(err, res);
 }
};

const deleteCategory = async (req, res) => {
 try {
  if (!(await categoryInstance.categoryExist({ name }))) {
    return successResponse(res, 200, "Category doesn't exist");
  } else {
    const category = await categoryInstance.deleteCategory(req.params.categoryID);
    return successResponse(res, 200, "Category Deleted");
  }
 } catch (err) {
   return catchError(err, res);
 }
};

module.exports = {
 createCategory,
 updateCategory,
 deleteCategory,
};