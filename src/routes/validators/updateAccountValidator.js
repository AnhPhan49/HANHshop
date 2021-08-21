const {check} = require('express-validator')

module.exports = [
    check('phone')
    .exists().withMessage('Vui lòng cung cấp số điện thoại')
    .notEmpty().withMessage('Vui lòng không để số điện thoại trống'),

    check('firstname')
    .exists().withMessage('Vui lòng cung cấp tên')
    .notEmpty().withMessage('Vui lòng không để tên tróng'),
 
    check('lastname')
    .exists().withMessage('Vui lòng cung cấp họ')
    .notEmpty().withMessage('Vui lòng không để họ trống'),
]