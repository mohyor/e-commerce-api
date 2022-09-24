const router = require("express").Router();

// api/v1/admins
router.use("/", require("./user"));

router.use("/cart", require("./cart"));

router.use("/orders", require("./order"));

router.use("/products", require("./product"));

module.exports = router;
