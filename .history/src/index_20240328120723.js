const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require('cors');
// const routes = require('./routes')
dotenv.config();

const app = express()
const port = process.env.PORT || 3005

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

// routes(app)

mongoose.connect(`mongodb+srv://datntgcs200227:<password>@cluster.smyjdv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`)
    .then(() => {
        console.log('Connect Db success!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})