const { catchError, verifyAuthToken } = require("../../../utils");

exports.adminAuthMiddleware = (req, res, next) => {
  try {
    let token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) throw new Error("Authorization Denied");

    let { _id, email, username } = verifyAuthToken(token);

    // Set decoded data as request global variable
    req.authAdminID = _id;
    req.authAdminEmail = email;
    req.authAdminUsername = username;

    next();
  } catch (err) {
    return catchError(err, res);
  }
};
