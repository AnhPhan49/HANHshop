const express = require('express')
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const { createInformation, updateInformation } = require('../controllers/informationController')

const informationRoute = express.Router()

informationRoute.route('/create').post(createInformation)

informationRoute.route("/update").put(multipartMiddleware, updateInformation);

module.exports = informationRoute;