const {
  getCategory,
  getCategories,
} = require("../../../controllers/category");

const router = require("express").Router();

router

  .get("/", getCategories)

  .get("/:categoryID", getCategory);

module.exports = router;
