const express = require('express')
const inventoryRoute = express.Router()
const checkLogin = require('../midlewares/loginMidleware')
const {
    search,
    updateInventory,
    listHistoryInventory
} = require('../controllers/inventoryController')

inventoryRoute.route('/search').get(search)

inventoryRoute.route('/update/:id').put(checkLogin, updateInventory)

inventoryRoute.route('/history').get(listHistoryInventory)

module.exports = inventoryRoute