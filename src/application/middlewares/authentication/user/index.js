const { catchError, verifyAuthToken } = require("../../../utils");

exports.userAuthMiddleware = (req, res, next) => {
  try {
    let token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) throw new Error("Authorization Denied");

    let { _id, email, username } = verifyAuthToken(token);

    // Set decoded data as request global variable
    req.authUserID = _id;
    req.authUserEmail = email;
    req.authUserUsername = username;

    next();
  } catch (err) {
    return catchError(err, res);
  }
};
