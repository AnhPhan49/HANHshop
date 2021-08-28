const express = require('express')
const inventoryRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const {
    search,
    updateInventory,
    listHistoryInventory
} = require('../controllers/inventoryController')
const managerAllowMidlleware = require('../midlewares/managerAllowMidlleware')

inventoryRoute.route('/search').get(checkLogin, managerAllowMidlleware , search)

inventoryRoute.route('/update/:id').put(checkLogin, managerAllowMidlleware, updateInventory)

inventoryRoute.route('/history').get(checkLogin, managerAllowMidlleware, listHistoryInventory)

module.exports = inventoryRoute