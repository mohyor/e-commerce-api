const router = require("express").Router();
const {
  getCurrentUser,
  createUser,
  loginUser,
  updateUser,
} = require("../../../controllers/user");

 const { userAuthMiddleware } = require("../../../middlewares/authentication/user");

router
  // api/v1/user/
  .post("/", createUser)

  // api/v1/user/login
  .post("/login", loginUser);

router
  .use(userAuthMiddleware)

  // api/v1/user
  .get("/", getCurrentUser)

  .put("/", updateUser)

module.exports = router;
