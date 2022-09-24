const router = require("express").Router();

// Version 1
// /api/v1
router.use("/v1", require("./v1"));

module.exports = router;
