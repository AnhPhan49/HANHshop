const {check} = require('express-validator')

module.exports = [
    check('name')
    .exists().withMessage('Vui lòng cung cấp danh mục')
    .notEmpty().withMessage('Vui lòng không để tên dục mục trống'),
]