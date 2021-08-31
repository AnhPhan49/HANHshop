const express = require('express')
const accountRoute = express.Router()
const createManagerValidator = require('./validators/creatManagerValidator')
const updateAccountValidator = require('./validators/updateAccountValidator')
const checkLogin = require('../midlewares/loginMidleware')
const checkAdmin = require('../midlewares/AdminMidleware')

const {
    createManager,
    current,
    listAccount,
    blockAccount,
    changePasswordAdmin,
    changePassword,
    updateAccount,
    checkExist
} = require('../controllers/accountController')

accountRoute.route('/create-manager').post(checkLogin, checkAdmin, createManagerValidator,createManager)

accountRoute.route('/list/:type').get(checkLogin, checkAdmin, listAccount)

accountRoute.route('/current').get(checkLogin, current)

accountRoute.route('/block/:id').delete(checkLogin, checkAdmin, blockAccount)

accountRoute.route('/admin/change-password/:id').put(checkLogin, checkAdmin, changePasswordAdmin)

accountRoute.route('/change-password').put(checkLogin, changePassword)

accountRoute.route('/update-account').put(checkLogin, updateAccountValidator, updateAccount)

accountRoute.route('/check-exist').post(checkExist)

module.exports = accountRoute
