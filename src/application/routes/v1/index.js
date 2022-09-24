const router = require("express").Router();

// api/v1/admin
router.use("/admin", require("./admin")); 

// api/v1/category
router.use("/category", require("./category"));

// api/v1/product
router.use("/product", require("./product"));

// api/v1/user
router.use("/user", require("./user"));

// api/v1/user
//router.use("/cart", require("./cart"));

// api/v1/order
//router.use("/order", require("./order"));

module.exports = router;
