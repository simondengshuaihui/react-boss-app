import express from "express";
import userRouter from "./user";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"; //使用post请求的时候用到
import model from "./model";
import path from "path";
import { renderToString } from "react-dom/server"; //把jsx语法转换成浏览器可识别的div

import staticPath from '../build/asset-manifest.json'
import csshook from "css-modules-require-hook/preset"; //处理css
import assethook from "asset-require-hook"; //处理图片
assethook({
  extensions: ["png"]
});
import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { applyMiddleware, createStore, compose } from "redux";
import reducers from "../src/reducers";
import App from "../src/app";
import thunk from "redux-thunk";

const Chat = model.getModel("chat");
const app = express();

// 用babelrc文件支持node后端编译JSX语法

// express和socket关联
const server = require("http").Server(app);
const io = require("socket.io")(server);

// io是全局的请求，socket是当前的请求
io.on("connection", socket => {
  // 监听客户端的sendmsg事件，处理传过来的参数
  socket.on("sendmsg", data => {
    // console.log(data)
    // 把data广播到全局
    // io.emit('recvmsg',data)
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join("_");
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit("recvmsg", Object.assign({}, doc._doc));
    });
  });
});

// 新建app
app.use(cookieParser());
app.use(bodyParser.json()); //可以解析post的json
app.use("/user", userRouter);
// 拦截user请求;
app.use(function(req, res, next) {
  // console.log('打印',req)
  if (req.url.startsWith("/user/") || req.url.startsWith("/static/")) {
    return next();
  } else {
    const store = createStore(reducers, compose(applyMiddleware(thunk)));
    let context={}
    const mackup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.usrl} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const pagehtml = `
    <!doctype html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="/manifest.json">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="stylesheet" href="/${staticPath['main.css']}">
        <title>React App</title>
    </head>

    <body><noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${mackup}</div>
        <script type="text/javascript" src="/${staticPath['main.js']}"></script>
    </body>

    </html>
    `;

    res.send(pagehtml)
    // res.sendFile(path.resolve('build/index.html'))
  }
});
// 根目录设置成静态资源
app.use("/", express.static(path.resolve("build")));

//  监听app
server.listen(9093, function() {
  console.log("node app start at localhost:9093");
});
