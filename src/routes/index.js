const authRoute = require('./authRoute')
const accountRoute = require('./accountRoute')
const categoryRoute = require('./categoryRoute')
const productRoute = require('./productRoute')
const inventoryRoute = require('./inventoryRoute')
const cartRoute = require('./cartRoute')
const route = app =>{
    app.get('/',(req,res)=>res.send('Hello'))
    app.use('/api/auth', authRoute)
    app.use('/api/user', accountRoute)
    app.use('/api/category', categoryRoute)
    app.use('/api/product', productRoute)
    app.use('/api/inventory', inventoryRoute)
    app.use('/api/cart', cartRoute)
}

module.exports = route