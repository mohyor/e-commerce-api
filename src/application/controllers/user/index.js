const {
  validateCreateUser,
  validateUserLogin,
  validateUpdateUser,
} = require("../../validation/index");
const {
  catchError,
  mapValidation,
  encryptPassword,
  decryptPassword,
  generateAuthToken,
} = require("../../utils");

const { successResponse, errorResponse } = require("../../utils/response");
const UserRepository = require("../../repository/user");

const userInstance = new UserRepository();

const createUser = async (req, res) => {
  try {
    // req data
    let { name, username, email, password } = req.body.data;

    // validate data
    const validate = await mapValidation(
      { name, username, email, password },
      validateCreateUser
    );
    if (validate != null) return errorResponse(res, 422, validate);

    // check if usename, email exist
    if (await userInstance.userExist({}, { username, email })) {
      return successResponse(res, 200, "Username or email already exist");
    }

    // encrypt password
    let user = await userInstance.createUser(
      name,
      username,
      email,
      await encryptPassword(password)
    );

    return successResponse(res, 200, "User Created");
  } catch (err) {
    return catchError(err, res);
  }
};

const loginUser = async (req, res) => {
  try {
    // req data
    let { username, password } = req.body.data;

    // validate data
    const validate = await mapValidation(
      { username, password },
      validateUserLogin
    );
    if (validate != null) return errorResponse(res, 422, validate);

    // validate email
    if (!(await userInstance.userExist({ username }, {}))) {
      return successResponse(res, 200, "Invalid Credentials");
    }

    // get user
    let userData = await userInstance.getUser({ username });

    // validate password
    if (password !== (await decryptPassword(userData.password))) {
      return successResponse(res, 200, "Invalid Credentials");
    }

    // generate auth token
    let token = generateAuthToken({
      _id: userData._id,
      email: userData.email,
      username: userData.username,
    });

    return successResponse(res, 200, "Login Successful", { token });
  } catch (err) {
    return catchError(err, res);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    if (await userInstance.userExist({ _id: req.authUserID }, {})) {
      let user = await userInstance.getUser({ _id: req.authUserID });
      return successResponse(res, 200, "User Data", { user });
    } else {
      return errorResponse(res, 200, "User not found");
    }
  } catch (err) {
    return catchError(err, res);
  }
};

const updateUser = async (req, res) => {
  try {
    let data = {};

    let { name, username, email, password, picture, address } = req.body.data;

    // validate data
    const validate = await mapValidation(
      { name, username, email, password, picture, address },
      validateUpdateUser
    );
    if (validate != null) return errorResponse(res, 422, validate);

    // check if username, email exist
    if (await userInstance.userExist({ username }, {})) {
      return successResponse(res, 200, "Username already exist");
    }

    if (await userInstance.userExist({ email }, {})) {
      return successResponse(res, 200, "Email already exist");
    }

    if (name) data.name = name;

    if (username) data.username = username;

    if (email) data.email = email;

    if (password) data.password = await encryptPassword(password);

    if (picture) data.picture = picture;

    if (address) data.address = address;

    const user = await userInstance.updateUser(req.authUserID, data);

    return successResponse(res, 200, "User Updated");
  } catch (err) {
    return catchError(err, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userInstance.deleteUser(
      req.params.userID
    );

    if (await userInstance.userExist({ _id: req.authUserID })) {
      return successResponse(res, 200, "User", user);
    }
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  loginUser,
  updateUser,
  deleteUser,
};
