const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const mongoose = require('mongoose')
// const {OAuth2Client} =  require('google-auth-library')
// const client = new OAuth2Client("713987113089-v6kssliis8c1m004jdlbfumnd4b51chd.apps.googleusercontent.com")
// const oAuth2Client = require('../config/googleapis')

const AccountModel = require('../models/accountModel')
// const cloudinary = require('../config/cloudinary')

module.exports.loginController =  async (req, res) => {
    try{

        let result = validationResult(req)
        if(result.errors.length === 0){
            let {email, password} = req.body
            let account = await AccountModel.findOne({email: email, type_account: "email"})
            
            if (!account){
                throw new Error("Wrong email or password")
            }

            let passwordMatch = await bcrypt.compare(password, account.password)
            
            if(!passwordMatch){
                return res.status(400).json({message: "Wrong email or password"})
            }
            
            if(account.status === false){
                return res.status(400).json({message: "Unverified account. Please check your email for email verification"})
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
        let {email, firstname, lastname, password} = req.body
        var token = crypto.randomBytes(48).toString('hex')
        let fullname = firstname + " " + lastname
        
        let checkExist = await AccountModel.findOne({email: email, type_account: "email"})

        if (checkExist) {
            throw new Error ('This email has already registered')
        }

        let password_hash = await bcrypt.hash(password,10)
        let account = await new AccountModel({
            email: email,
            fullname: fullname,
            firstname: firstname,
            lastname: lastname,
            type_account: "email",
            password: password_hash,
            tokenVerify: token,
        })
        await account.save()
    
        // const accessToken = await oAuth2Client.getAccessToken()

        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         type: 'OAuth2',
        //         user: process.env.EMAIL,
        //         clientId: process.env.GG_ID,
        //         clientSecret: process.env.GG_SECRET,
        //         refreshToken: process.env.REDIRECT_TOKEN,
        //         accessToken: accessToken
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // })

        // let link_verify = `${process.env.PATH_HOST}/verify-email/${token}`
        // var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        //     from: process.env.EMAIL,
        //     to: email,
        //     subject: 'Account verification',
        //     html: `<div style="border:6px solid #d500f9;padding:16px">
        //     <h1>Welcome to Lượm Message!</h1>
        //     <p style="font-size:20px">To activate your account on the new website, click on the “activate my account” button.</p>
        //     <a href=${link_verify} target=_blank style="display:inline-block;color:#fff;text-decoration:none;font-weight:600;font-size:20px;padding:12px 6px;border-radius:4px;background-color:#d500f9;box-shadow:5px 4px 12px 1px rgba(0,0,0,0.28)">Activate my account</a>`
        // }
        
        // await transporter.sendMail(mainOptions)
           
        res.status(200).json({message:"A verification link has seen to your email account. Please click the link to verify your email and continue the registration process."})
        
    } catch (err) {
        return res.status(400).json({message:err.message})
    }
}