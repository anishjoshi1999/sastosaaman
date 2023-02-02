const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const dotenv = require("dotenv").config()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const methodOverride = require('method-override')
// Importing Routes
const allSaaman = require('./routes/index')

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.mfsduzy.mongodb.net/${process.env.MONGODB_ATLAS_COLLECTION}`
// Connection to Database
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Serving on port 8000")
        })
        console.log("connected to Mongodb Atlas")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


// Routes
app.get('/',(req,res)=> {
    res.redirect('/saaman')
})

// Saaman Routes
app.use('/saaman', allSaaman)