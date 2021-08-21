const express = require('express')
const accountRoute = express.Router()
const registerValidator = require('./validators/registerValidator')
const checkLogin = require('../midlewares/loginMidleware')
const checkAdmin = require('../midlewares/AdminMidleware')

const {
    createManager,
    current,
    listAccount,
    blockAccount,
    changePasswordAdmin
} = require('../controllers/accountController')

accountRoute.route('/create-manager').post(checkLogin, checkAdmin, registerValidator,createManager)

accountRoute.route('/list/:type').get(checkLogin, checkAdmin, listAccount)

accountRoute.route('/current').get(checkLogin, current)

accountRoute.route('/block/:id').delete(checkLogin, checkAdmin, blockAccount)

accountRoute.route('/admin/change-password/:id').put(checkLogin, checkAdmin, changePasswordAdmin)

accountRoute.route('/change-password/:id').put(checkLogin, )

module.exports = accountRoute
