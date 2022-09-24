const router = require("express").Router();

// api/v1/admins
router.use("/", require("./admin"));

router.use("/carts", require("./cart"));

router.use("/categories", require("./category"));

router.use("/orders", require("./order"));

router.use("/products", require("./product"));

router.use("/users", require("./user"));

module.exports = router;
