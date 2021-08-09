require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
const mongoConnect = require('./src/config/databaseConfig')
const route = require('./src/routes')

mongoConnect()

route(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log( `http://localhost:${port}` )
})