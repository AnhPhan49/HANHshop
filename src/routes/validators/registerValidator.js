const {check} = require('express-validator')

module.exports = [
    check('phone')
    .exists().withMessage('Vui lòng cung cấp số điện thoại')
    .notEmpty().withMessage('Vui lòng không để số điện thoại trống'),

    check('firstname')
    .exists().withMessage('Vui lòng cung cấp tên')
    .notEmpty().withMessage('Vui lòng không để tên tróng'),
 
    check('address')
    .exists().withMessage('Vui lòng cung cấp địa chỉ')
    .notEmpty().withMessage('Vui lòng không để địa chỉ trống'),

    check('lastname')
    .exists().withMessage('Vui lòng cung cấp họ')
    .notEmpty().withMessage('Vui lòng không để họ trống'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu')
    .notEmpty().withMessage('Vui lòng không để trống mật khẩu')
    .isLength({min:6}).withMessage('Mật khẩu phải tối thiểu 6 ký tự'),
]