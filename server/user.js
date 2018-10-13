const express = require("express");
const utils = require("utility");

const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");
const Chat = model.getModel("chat");
const _filter = { pwd: 0, __v: 0 }; //控制返回数据不显示密码，不显示文档号

// console.log('我是user',User.find)
// 获取用户列表
Router.get("/list", function(req, res) {
  const { type } = req.query;
  User.find({ type }, function(err, doc) {
    // User.remove({},function(e,d){})
    return res.json({ code: 0, data: doc });
  });
});
// 设置已读消息
Router.post("/readmsg", function(req, res) {
  const { from } = req.body;
  const userid = req.cookies.userid;
  Chat.update(
    { from, to: userid },
    { '$set': { read: true } },
    { 'multi': true }, //多行修改,默认只修改第一个找的
    function(err, doc) {
      if(!err){
        return res.json({code:0,data:doc})
      }
      return res.json({code:1,msg:'信息读取错误'})
    }
  );
});
// 获取消息列表
Router.get("/getmsglist", function(req, res) {
  // 获取登录用户id
  const userid = req.cookies.userid;
  // 获取所有用户信息头像和姓名
  User.find({}, function(err, userdoc) {
    const users = {};
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar };
    });
    Chat.find({ $or: [{ from: userid }, { to: userid }] }, function(err, doc) {
      if (!err) {
        return res.json({ code: 0, msgs: doc, users });
      }
    });
  });
});
// 登录
Router.post("/login", function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或者密码错误" });
    }
    // 设置cookie
    res.cookie("userid", doc._id);
    return res.json({ code: 0, data: doc });
  });
});
// 注册
Router.post("/register", function(req, res) {
  const { user, pwd, type } = req.body;
  // 查询用户名重复
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" });
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function(e, d) {
      if (e) {
        return res.json({ code: 1, msg: "后端出错了" });
      }
      const { user, type, _id } = d;
      res.cookie("userid", _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});
// 跟新用户信息
Router.post("/update", function(req, res) {
  // 先查看userid
  const userId = req.cookies.userid;
  if (!userId) {
    return res.json({ code: 1 });
  }
  const body = req.body;
  User.findByIdAndUpdate(userId, body, function(err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    res.json({ code: 0, data });
  });
});
// 获取用户信息
Router.get("/info", function(req, res) {
  // 如果cookie里没有用户信息
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      res.json({ code: 1, msg: "后端出错了" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

function md5Pwd(pwd) {
  const salt = "imooc_is_good_3957x8yza6!@#IUHJh~~";
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
