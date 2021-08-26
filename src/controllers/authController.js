const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const cartModel =require('../models/cartModel')

const AccountModel = require('../models/accountModel')

module.exports.loginController =  async (req, res) => {
    try{

        let result = validationResult(req)
        if(result.errors.length === 0){
            let {phone, password} = req.body
            let account = await AccountModel.findOne({phone: phone})
            if (!account){
                throw new Error("Wrong email or password")
            }
            if (account.blocked) throw new Error("Tài khoản của bạn đã bị khóa")
            let passwordMatch = await bcrypt.compare(password, account.password)
            if(!passwordMatch){
                return res.status(400).json({message: "Wrong email or password"})
            }
            const {JWT_SECRET} = process.env
            jwt.sign({
                id:account.id,
            },JWT_SECRET,{
                expiresIn:'7h'
            },(err,token)=>{
                if(err) throw err
                return res.status(200).json({
                    message: "Login success",
                    data: token
                })
            })
        }else{
            let messages = result.mapped()
            let message = ''
            for(m in messages){
                message= messages[m].msg
                break
            }
            throw new Error (message)
        }
    }
    catch (err) {
        return res.status(400).json({message : err.message})
    }
}

module.exports.registerController = async (req, res) =>{
    try{
        let result = validationResult(req)
        if(result.errors.length !== 0){
            let messages = result.mapped()
            let message = ''
            for(m in messages){
                message = messages[m].msg
                break
            }
            throw new Error (message)
        }
        let {phone, firstname, lastname, address, password} = req.body
        let fullname = firstname + " " + lastname
        let checkExist = await AccountModel.findOne({phone: phone})
        if (checkExist) {
            throw new Error ('Số điện thoại này đã được xử dụng')
        }
        let password_hash = await bcrypt.hash(password,10)
        let account = new AccountModel({
            phone: phone,
            fullname: fullname,
            firstname: firstname,
            lastname: lastname,
            address: address,
            password: password_hash,
        })
        await account.save()
    
        let newCart = new cartModel({
            customer: account._id,
            product:[]
        })
        newCart.save()
        res.status(200).json({message:"Register success."})
    } catch (err) {
        return res.status(400).json({message:err.message})
    }
}