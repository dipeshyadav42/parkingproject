const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
const parkingRouter=require('./routers/parkingrouter')
const mongoose=require('mongoose')
const session=require('express-session')
mongoose.connect('mongodb://127.0.0.1:27017/9amparkingproject')



app.use(session({
    secret:'dipesh',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60}

}))
app.use(parkingRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000)