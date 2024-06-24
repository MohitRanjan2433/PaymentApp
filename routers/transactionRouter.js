const express = require('express');
const { doTransaction } = require('../controller/transactionController');
const transactionRouter = express.Router();


transactionRouter.route("/createTransaction")
    .post(doTransaction)

module.exports = transactionRouter;