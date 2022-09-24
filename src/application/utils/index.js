const { errorResponse } = require("./response");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { PASSWORD_SECRET, JWT_SECRET, JWT_EXPIRY_TIME } = require("./constants");
const { logger } = require("../../logger");

// Catch Error
exports.catchError = (err, res) => {
  logger.error("error", err.message)
  if (err.kind === "ObjectId") {
    return errorResponse(res, 404, err.message);
  }

  return errorResponse(res, 500, err.message);
};

// Map Validation
exports.mapValidation = async (data, type) => {
  const { error } = await type(data);
  return error ? error.details[0].message : error;
};

// Encrypt Password
exports.encryptPassword = async (password) => {
  return CryptoJS.AES.encrypt(password, PASSWORD_SECRET).toString();
};

// Decrypt Password
exports.decryptPassword = async (password) => {
  let decrypt = CryptoJS.AES.decrypt(password, PASSWORD_SECRET).toString(
    CryptoJS.enc.Utf8
  );

  return decrypt;
};

// Generate JWT Auth Token
exports.generateAuthToken = (data = {}) => {
  let token = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRY_TIME });

  return token;
};

// Veriry and decode JWT Auth Token
exports.verifyAuthToken = (token) => {
  let verify = jwt.verify(token, JWT_SECRET);

  return verify;
};
