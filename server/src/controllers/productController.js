const {validationResult} = require('express-validator')
const cloudinary = require('../config/cloudinary')
const productModel = require('../models/productModel')
module.exports.createProduct = async (req, res) => {
    try {
        let result = validationResult(req)
        if(result.errors.length !== 0){
            let messages = result.mapped()
            let message = ''
            for(m in messages){
                message= messages[m].msg
                break
            }
            throw new Error (message)
        }

        let {name, category, description, price, status, sale_tag} = req.body
        let {file} = req.files
       
        let promiseArr = []
        let productMedia = []
        let price_after_sale = 0

        let checkCateExist = await productModel.findById(category)
        if (!checkCateExist) throw new Error("Đã có lỗi xảy ra với danh mục")

        if(status === "Sale" && (!sale_tag || sale_tag<=0 || sale_tag > 100)){
            throw new Error("Đà có lỗi xảy ra với trạng thái sản phẩm")
        }else if(status ==="Sale" && sale_tag >0 && sale_tag <= 100) {
            price_after_sale = price*(100-sale_tag)/100
        } else sale_tag = 0


        if(file){
            console.log(true)
            if (!file.length) {
                let {type} = file
                console.log(type)
                if (type.split("/")[0] === "image") {
                    const mediaCloud = await cloudinary.uploader.upload(file.path,{folder:'products', resource_type: type.split("/")[0]})
                    productMedia.push({
                        id_image: mediaCloud.public_id,
                        url: mediaCloud.secure_url,
                    })
                }else{
                    throw new Error ("Vui lòng chỉ đăng tải ảnh sản phẩm")
                }
            } else {
                
                for (const element of file) {
                    let {type} = element

                    if (type.split("/")[0] === "image") {
                        promiseArr.push(cloudinary.uploader.upload(element.path,{folder:'products',  resource_type: type.split("/")[0]}).catch(()=>{}))
                    } else {
                        throw new Error ("Vui lòng chỉ đăng tải ảnh sản phẩm")
                    }
                }
                let uploadInf = await Promise.all(promiseArr)
                
                for (let i = 0; i < uploadInf.length; i++) {
                    if (uploadInf[i] === undefined) {
                        
                        listError.push(file[i].name)
                        productMedia.push({
                            id_image: mediaCloud.public_id,
                            url: mediaCloud.secure_url,
                        })
                    
                    }else{

                        let urlCloud =uploadInf[i].secure_url
                        
                        productMedia.push({
                            id_image: mediaCloud.public_id,
                            url: urlCloud,
                        })
                    }
                }
            }

        }

        let newProduct = new productModel({
            name: name,
            category: category,
            description: description,
            price: price,
            available: available,
            sale_tag: sale_tag,
            price_after_sale: price_after_sale,
            image: productMedia,
            status: status,
        })
        
        await newProduct.save()
        
        return res.status(200).json({message: "Tạo thành công"})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        let result = validationResult(req)
        if(result.errors.length !== 0){
            let messages = result.mapped()
            let message = ''
            for(m in messages){
                message= messages[m].msg
                break
            }
            throw new Error (message)
        }
    } catch (err){
        return res.status(400).json({message: err.message})
    }
}