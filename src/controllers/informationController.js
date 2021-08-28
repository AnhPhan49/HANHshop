const InformationModel = require("../models/InformationModel");
const cloudinary = require('../config/cloudinary')

module.exports.createInformation = async (req, res) => {
    try{
        let data = {
          phone: "0987654321",
          email: "hanhshop99@gmail.com",
          facebook: "https://www.facebook.com/hanh.shop.99/",
          tax_code: "123654789 Công ty TNHH 1 thành viên HANH",
          address: [
            "Chi nhánh chính: 123 Đường 321 Phường A, Quận B, Thành phố C",
            "Chi nhánh 2: 456 Đường 654 Phường A, Quận B, Thành phố C",
          ],
          description: "Shop bán tất cả các món hàng từ trên trời xuống lòng đất"
          
        };
        
        let inf = await InformationModel.findOne()
        return res.send(inf)
    } catch(err){
        return res.status(400).json(err.message)
    }
}

module.exports.updateInformation = async (req, res) => {
    try{
        let data = req.body
        let {file} = req.files
        let inf = await InformationModel.findOne();
        delete data.file
        if(file){
            if (!file.length) {
                let {type} = file
                if (type.split("/")[0] === "image") {
                    const mediaCloud = await cloudinary.uploader.upload(file.path,{folder:'logo', resource_type: type.split("/")[0]})
                    await cloudinary.uploader.destroy(inf.logo.id_logo)
                    let logo = {
                      url: mediaCloud.public_id,
                      id_logo: mediaCloud.secure_url,
                    }
                    data.push(logo)
                }else{
                    throw new Error ("Vui lòng chỉ đăng tải ảnh sản phẩm")
                }
            }
        }
        let newInformation = await InformationModel.findOneAndUpdate({}, data, {new: true})
        return res
          .status(200)
          .json({ message: "Success", data: newInformation });
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}