const express = require('express');
const {func} = require('../controllers/controllers');

const userRoute = express.Router();

userRoute.route('/').get(func);

module.exports = userRoute;