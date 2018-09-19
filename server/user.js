const express = require("express");
const Router = express.Router()
const model=require('./model')
const User=model.getModel('user')

// console.log('我是user',User.find)

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        // User.remove({},function(e,d){})
		return res.json(doc)
	})
})
// console.log(model)

Router.post('/register',function(req,res){
    const {user,pwd,type}=req.body
    // 查询用户名重复
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }

        User.create({user,pwd,type},function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })
})
Router.get('/info',function(req,res){
    return res.json({code:1})
})

function md5Pwd(pwd){
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports= Router