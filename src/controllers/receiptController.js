const cartModel = require('../models/cartModel')
const inventoryModel = require('../models/inventoryModel')
const receiptModel = require('../models/receiptModel')

module.exports.createReceipt = async(req, res) => {
    try{
        let {id} = req.params
        let cart = await cartModel.findByIdAndUpdate(id, {
            product:[],
            total_price: 0
        })
        if (cart.total_price === 0) throw new Error("Something went wrong with cart!!")
        let newReceipt = new receiptModel({
            customer: req.user.id,
            product: cart.product,
            total_price: cart.total_price,
        })
        newReceipt.save()
        return res.status(200).json({message: "Success", data: newReceipt}) 
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}