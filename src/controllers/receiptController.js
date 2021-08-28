const cartModel = require('../models/cartModel')
const inventoryModel = require('../models/inventoryModel')
const receiptModel = require('../models/receiptModel')

module.exports.createReceipt = async(req, res) => {
    try{
        let {id} = req.params
        let {name, phone, address} = req.body
        let {detail} = req.body ? req.body : ""
        
        let cart = await cartModel.findByIdAndUpdate(id, {
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
            address: address,
            detail: detail
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
        let data = await receiptModel.find({customer: id, in_Process: present},'-product._id').populate('product.id',"name image id_product")
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
        let updateReceipt = await receiptModel.findById(id)
        if (updateReceipt.status.present !== "Đang chờ duyệt" && updateReceipt.status.present !== "Đang vận chuyển") {
          throw new Error("Something went wrong with approve receipt")
        }
        updateReceipt.status.present = "Hủy đơn từ shop" 
        updateReceipt.status.description = description
        updateReceipt.in_Process =  false
        await updateReceipt.save()
        return res.status(200).json({ message: "Successfully", data: updateReceipt });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

module.exports.completeReceipt = async (req, res) => {
    try {
        const { id } = req.params
        let updateReceipt = await receiptModel.findById(id)
        if (updateReceipt.status.present !== "Đang chờ duyệt" && updateReceipt.status.present !== "Đang vận chuyển") {
          throw new Error("Something went wrong with approve receipt")
        }
        updateReceipt.status.present = "Hoàn thành"
        updateReceipt.status.description = ""
        updateReceipt.in_Process =  false
        await updateReceipt.save()
        return res.status(200).json({message: "Successfully", data: updateReceipt})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.search = async (req, res) => {
    try {
        // let { status, in_Process, id_receipt } = req.query
        let search = req.query
        let {page} = search
        page = page - 1
        if (page < 0) throw new Error("Page not found!!")
        delete search.page
        let searchReceipt = await receiptModel.find(search,'-product._id').sort({'createdAt': 'desc'}).populate("product.id","-_id name image price price_after_sale ")
        if(Math.ceil(searchReceipt.length/10) < page + 1){
            return res.status(201).json({message: "Chưa có trang thông báo này"})
        }
        let receiptFilter = searchReceipt.slice(page * 10, page * 10 + 10);
        return res.status(200).json({
          message: "Success",
          data: {
            page: page + 1,
            total_page: Math.ceil(searchReceipt.length / 10),
            receipts: receiptFilter,
          },
        })
    } catch (err) {
        return res.status
    }
}
