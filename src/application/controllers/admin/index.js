const { validateAdmin } = require("../../validation/admin");

const {
  catchError,
  mapValidation,
  encryptPassword,
  decryptPassword,
  generateAuthToken,
} = require("../../utils");

const { successResponse, errorResponse } = require("../../utils/response");
const AdminRepository = require("../../repository/admin");

const adminInstance = new AdminRepository();

const createAdmin = async (req, res) => {
  try {
    // req data
    let { name, username, email, password } = req.body.data;

    // validate data
    const validate = await mapValidation(
      { name, username, email, password },
      validateCreateAdmin
    );
    if (validate != null) return errorResponse(res, 422, validate);

    // check if usename, email exist
    if (await adminInstance.adminExist({}, { username, email })) {
      return successResponse(res, 200, "Username or email already exist");
    }

    // encrypt password
    let admin = await adminInstance.createAdmin(
      name,
      username,
      email,
      await encryptPassword(password)
    );

    return successResponse(res, 200, "Admin Created");
  } catch (err) {
    return catchError(err, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    // req data
    let { username, password } = req.body.data;

    // validate data
    const validate = await mapValidation(
      { username, password },
      validateAdminLogin
    );
    if (validate != null) return errorResponse(res, 422, validate);

    // validate email
    if (!(await adminInstance.adminExist({ username }, {}))) {
      return successResponse(res, 200, "Invalid Credentials");
    }

    // get admin
    let adminData = await adminInstance.getAdmin({ username });

    // validate password
    if (password !== (await decryptPassword(adminData.password))) {
      return successResponse(res, 200, "Invalid Credentials");
    }

    // generate auth token
    let token = generateAuthToken({
      _id: adminData._id,
      email: adminData.email,
      username: adminData.username,
    });

    return successResponse(res, 200, "Login Successful", { token });
  } catch (err) {
    return catchError(err, res);
  }
};

const getAdmin = async (req, res) => {
  try {
    let admin = await adminInstance.getAdmin({ _id: req.authAdminID });

    if (!(await adminInstance.adminExist({ username: admin.username }, {}))) {
      return successResponse(res, 200, "Admin doesn't exist");
    } else {
      return successResponse(res, 200, "Admin Data", { admin });
    }
  } catch (err) {
    return catchError(err, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    let data = {};

    let { name, username, email, password } = req.body.data;

    // validate data
    const validate = await mapValidation(
      { name, username, email, password },
      validateUpdateAdmin
    );
    if (validate != null) return errorResponse(res, 422, validate);

    // check if usename, email exist
    if (await adminInstance.adminExist({ username }, {})) {
      return successResponse(res, 200, "Username already exist");
    }

    if (await adminInstance.adminExist({ email }, {})) {
      return successResponse(res, 200, "Email already exist");
    }

    if (name) data.name = name;

    if (username) data.username = username;

    if (email) data.email = email;

    if (password) data.password = await encryptPassword(password);

    const admin = await adminInstance.updateAdmin(req.authAdminID, data);

    return successResponse(res, 200, "Admin Updated");
  } catch (err) {
    return catchError(err, res);
  }
};

module.exports = {
  createAdmin,
  getAdmin,
  loginAdmin,
  updateAdmin,
};
