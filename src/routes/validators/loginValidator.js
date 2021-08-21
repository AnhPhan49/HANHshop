const {check} = require('express-validator')

module.exports = [
    check('phone')
    .exists().withMessage('Vui lòng cung cấp số điện thoại')
    .notEmpty().withMessage('Vui lòng không để số điện thoại trống'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu')
    .notEmpty().withMessage('Vui lòng không để trống mật khẩu'),
]