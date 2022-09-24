const router = require("express").Router();

const { adminAuthMiddleware } = require("../../../middlewares/authentication/admin");

 const {
  deleteCategory,
  createCategory,
  updateCategory,
} = require("../../../controllers/admin/category");

router
  .use(adminAuthMiddleware)

  // Protected Routes for Categories.

  // api/v1/category
  .post("/category", createCategory)

  .put("/category/:categoryID", updateCategory)

  .delete("/category/:categoryID", deleteCategory)

module.exports = router;