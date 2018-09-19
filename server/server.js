const express = require("express");
const userRouter = require('./user')
const cookieParser= require('cookie-parser')
const bodyParder=require('body-parser')
// 新建app
const app=express()
app.use(cookieParser())
app.use(bodyParder.json())
app.use('/user',userRouter)


//  监听app
app.listen(9093,function(){
    console.log('node app start at localhost:9093')
}) 