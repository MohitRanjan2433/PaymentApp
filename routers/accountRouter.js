const express = require('express');
const { updateAccount, getAccount} = require('../controller/accountController');
const accountRouter = express.Router();

accountRouter.route('/updateAccount')
    .post(updateAccount)
    .get(getAccount)

module.exports = accountRouter;