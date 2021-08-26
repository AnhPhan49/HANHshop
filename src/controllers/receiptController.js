const cartModel = require('../models/cartModel')
const inventoryModel = require('../models/inventoryModel')
const receiptModel = require('../models/receiptModel')

module.exports.createReceipt = async(req, res) => {
    try{
        let id = req.user.id
        let {name, phone, address} = req.body
        let cart = await cartModel.findOneAndUpdate({customer: id}, {
            product:[],
            total_price: 0
        })
        if (cart.total_price === 0) throw new Error("Something went wrong with cart!!")
        let newReceipt = new receiptModel({
            customer: req.user.id,
            product: cart.product,
            total_price: cart.total_price,
            name: name,
            phone: phone,
            address: address
        })
        newReceipt.save()
        return res.status(200).json({message: "Success", data: newReceipt}) 
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.cancelReceipt = async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body ? req.body : ""
        let updateReceipt = await receiptModel.findById(id)
        if (updateReceipt.status.present === "Đang vận chuyển")
          throw new Error("Hàng đã được vận chuyển nên không thể hủy đơn")
        else if (updateReceipt.status.present !== "Đang chờ duyệt") {
          throw new Error("Something went wrong with cancel receipt");
        }
        updateReceipt.status.present = "Hủy đơn từ khách"
        updateReceipt.status.description = description
        updateReceipt.in_Process = false
        await updateReceipt.save()
        return res.status(200).json({ message: "Successfully", data: updateReceipt })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

module.exports.getReceipts = async (req, res) => {
    try {
        const id = req.user.id
        let {present} = req.query? req.query : false
        let data = await receiptModel.find({customer: id, in_Process: present})
        return res.status(200).json({message: "Successfully", data: data})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.approveReceipt = async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body ? req.body : ""
        let updateReceipt = await receiptModel.findById(id)
        if (updateReceipt.status.present !== "Đang chờ duyệt") {
          throw new Error("Something went wrong with approve receipt")
        }
        updateReceipt.status.present = "Đang vận chuyển"
        updateReceipt.status.description = description
        await updateReceipt.save();
        return res.status(200).json({ message: "Successfully", data: updateReceipt });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

module.exports.cancelReceiptByAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body ? req.body : ""
        const { status } = req.body ? req.body : "Hủy đơn từ shop" 
        let updateReceipt = await receiptModel.findById(id)
        if (updateReceipt.status.present !== "Đang chờ duyệt" && updateReceipt.status.present !== "Đang vận chuyển") {
          throw new Error("Something went wrong with approve receipt")
        }
        updateReceipt.status.present = status
        updateReceipt.status.description = description
        updateReceipt.in_Process =  false
        await updateReceipt.save()
        return res.status(200).json({ message: "Successfully", data: updateReceipt });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}