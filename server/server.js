const express = require("express");
const userRouter = require('./user')
const cookieParser= require('cookie-parser')
const bodyParser=require('body-parser')//使用post请求的时候用到
// 新建app
const app=express()
app.use(cookieParser())
app.use(bodyParser.json()) //可以解析post的json
app.use('/user',userRouter)


//  监听app
app.listen(9093,function(){
    console.log('node app start at localhost:9093')
}) 