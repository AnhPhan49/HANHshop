const express = require('express')
const accountRoute = express.Router()
const registerValidator = require('./validators/registerValidator')
const checkLogin = require('../midlewares/loginMidleware')
const checkAdmin = require('../midlewares/AdminMidleware')

const {
    createManager,
    current,
    listAccount,
    blockAccount
} = require('../controllers/accountController')

accountRoute.route('/create-manager').post(checkLogin, checkAdmin, registerValidator,createManager)

accountRoute.route('/list/:type').get(checkLogin, checkAdmin, listAccount)

accountRoute.route('/current').get(checkLogin, current)

accountRoute.route('/block/:id').delete(checkLogin, blockAccount)

module.exports = accountRoute
