const express = require('express')
const accountRoute = express.Router()
const registerValidator = require('./Validators/registerValidator')
const checkLogin = require('../midlewares/loginMidleware')

const {
    createManager
} = require('../controllers/accountController')

accountRoute.route('/create-manager').post(checkLogin, registerValidator,createManager)

module.exports = accountRoute
