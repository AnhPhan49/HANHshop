const express = require("express");
const receiptRoute = express.Router();
const checkLogin = require("../midlewares/loginMidleware");
const checkAdmin = require("../midlewares/AdminMidleware");

const { createReceipt } = require("../controllers/receiptController");
    
receiptRoute.route("/create/:id").post(checkLogin, createReceipt);

// receiptRoute.route('/list/:type').get(checkLogin, checkAdmin, listAccount)

module.exports = receiptRoute;
