const express = require('express');
const userRouter = express.Router();
const { createUser, loginUser, getLogin, userDetails } = require('../controller/userController')

userRouter.route("/signUp")
    .post(createUser)

userRouter.route("/login")
    .post(loginUser)
    .get(getLogin);

userRouter.route("/userDetails")
    .get(userDetails)
module.exports = userRouter