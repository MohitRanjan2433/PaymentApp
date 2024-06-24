const express = require('express');
const { searchAccount } = require('../controller/accountController');
const searchRouter = express.Router();

searchRouter.route('/searchAccount')
    .get(searchAccount)

module.exports = searchRouter;