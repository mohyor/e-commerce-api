///const {} = require("../../validation/index");

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

const getUsers = async (req, res) => {
 try {
   const users = await userInstance.getUsers();

   if (Array.isArray(users) && users.length) {
    return successResponse(res, 200, "Users", users);
   } else {
    return errorResponse(res, 200, "Users not found");
   }
 } catch (err) {
   return catchError(err, res);
 }
};

const getUserById = async (req, res) => {
 try {
   let user = await userInstance.getUserById(req.params.userID);

   if (await userInstance.userExist({ _id: req.params.userID })) {
    return successResponse(res, 200, "User Data", { user });
   } else {
    return errorResponse(res, 200, "User doesn't exist");
   }
 } catch (err) {
   return catchError(err, res);
 }
};

module.exports = {
 getUsers,
 getUserById,
};
