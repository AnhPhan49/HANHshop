const cartModel = require('../models/cartModel')
const inventoryModel = require('../models/inventoryModel')

module.exports.addProduct = async (req, res) =>{
    try{
        let {id, count} = req.body
        let flag = true
        count = Number(count)
        if (!id) throw new Error("Missing id product.")
        if (!count || count < 0) throw new Error("Something wrong with counter product") 
        let {total, product} = await inventoryModel.findOne({product: id}).populate('product')
        if (total < count) throw new Error("Không đủ sản phẩm, xin quý khách hãy giảm số lượng")
        let updateCart = await cartModel.findOne({customer: req.user.id})
        updateCart.total_price = updateCart.total_price + product.price*count
        updateCart.product.forEach(element => {
            if (String(element.id) === id) {
                element.total = element.total + count
                element.total_price = element.total_price + product.price*count
                flag = false
                return
            }
        })
        if (flag) {
            let dataProduct = {
                id: id,
                total: count,
                total_price: product.price*count
            }
            updateCart.product.push(dataProduct)
        }
        updateCart.save()
        return res.status(200).json({message: 'Success', data: updateCart})
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}

module.exports.updateCart = async (req, res) =>{
    try {
        let {product} = req.body
        let flag = []
        const updateCart = await cartModel.findOne({ customer: req.user.id })
        let count = 0
        let billPrice = 0
        for (let element of product ){
            let {total, product} = await inventoryModel.findOne({product: element.id}).populate('product')
            if (total < count){ 
                flag.push(product.name)
            } else {
                const total_price = product.price * element.total
                Object.assign(element, {total_price: total_price})
                billPrice = billPrice + total_price
            }
        }

        const updatedCart = await cartModel.findOneAndUpdate({customer: req.user.id}, {
            product: product,
            total_price: billPrice
        }, {new: true})

        return res
          .status(200)
          .json({ message: "Successfully", data: updatedCart });

    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.getCart = async (req, res) =>{
    try{
        let id = req.user.id
        let dataCart = await cartModel.findOne({customer: id},'-customer').populate("product.id","name price image.url")
        return res.status(200).json({message: "Success", data: dataCart})
    }catch(err){
        return res.status(400).json({message: err.message})
    }
}
