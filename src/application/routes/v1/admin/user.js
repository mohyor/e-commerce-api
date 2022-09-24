const router = require("express").Router();

const { adminAuthMiddleware } = require("../../../middlewares/authentication/admin");

const { getUsers, getUserById } = require("../../../controllers/admin/user");


router
  .use(adminAuthMiddleware)

  // Protected Routes for Users.

  .get('/', getUsers)

  .get('/user/:userID', getUserById)

module.exports = router;
