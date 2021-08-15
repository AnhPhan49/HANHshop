const express = require('express')
const receiptRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const checkAdmin = require('../midlewares/AdminMidleware')

const {
    
} = require('../controllers/accountController')

// receiptRoute.route('/create-manager').post(checkLogin, checkAdmin, registerValidator,createManager)

// receiptRoute.route('/list/:type').get(checkLogin, checkAdmin, listAccount)

module.exports = receiptRoute
