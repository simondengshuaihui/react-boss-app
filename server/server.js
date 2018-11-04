const express = require("express");
const userRouter = require('./user')
const cookieParser= require('cookie-parser')
const bodyParser=require('body-parser')//使用post请求的时候用到
const model  = require('./model')
const Chat = model.getModel('chat')
const app = express()
const path = require('path')

// express和socket关联
const server = require('http').Server(app)
const io = require('socket.io')(server)

// io是全局的请求，socket是当前的请求
io.on('connection',(socket)=>{
    // 监听客户端的sendmsg事件，处理传过来的参数
    socket.on('sendmsg',(data)=>{
        // console.log(data)
         // 把data广播到全局
        // io.emit('recvmsg',data)
        const {from,to,msg}=data
        const chatid=[from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

// 新建app
app.use(cookieParser())
app.use(bodyParser.json()) //可以解析post的json
app.use('/user',userRouter)
// 拦截user请求
app.use(function(req,res,next){
    console.log('打印',req,res,next)
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next()
    }else{
        res.sendFile(path.resolve('build/index.html'))
    }
})
app.use('/',express.static(path.resolve('build')))


//  监听app
server.listen(9093,function(){
    console.log('node app start at localhost:9093')
}) 