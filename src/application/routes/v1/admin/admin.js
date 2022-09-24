const router = require("express").Router();
const {
  getAdmin,
  createAdmin,
  loginAdmin,
  updateAdmin,
} = require("../../../controllers/admin");

const { adminAuthMiddleware } = require("../../../middlewares/authentication/admin");

router
  // api/v1/admin/
  .post("/", createAdmin)

  // api/v1/admin/login
  .post("/login", loginAdmin)

router
  .use(adminAuthMiddleware)

  // api/v1/admin
  .get("/", getAdmin)

  .put("/", updateAdmin)

module.exports = router;
