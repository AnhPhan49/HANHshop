const express = require('express')
const authRoute = express.Router()
const loginValidator = require('./validators/loginValidator')
const registerValidator = require('./Validators/registerValidator')

const {
    loginController, 
    registerController, 
    // verifyController, 
    // forgotPasswordController, 
    // verifyResetpassword, 
    // googleLoginController
} = require('../controllers/authController')

authRoute.route('/login').post(loginValidator,loginController)

authRoute.route('/register').post(registerValidator,registerController)

module.exports = authRoute