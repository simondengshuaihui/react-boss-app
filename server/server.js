const express = require("express");
const userRouter = require('./user')
// 新建app
const app=express()

app.use('/user',userRouter)

// app.get('/',function(req,res){
//     res.send("<h3>hello world</h3>")
// })
// app.get('/data',function(req,res){
//     res.json({"name":"辉","age":"28"})
// })
//  监听app
app.listen(9093,function(){
    console.log('node app start')
}) 