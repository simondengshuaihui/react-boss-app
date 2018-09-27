const express = require("express");
const utils = require('utility')

const Router = express.Router()
const model=require('./model')
const User=model.getModel('user')
const _filter = {'pwd':0,'__v':0}  //控制返回数据不显示密码，不显示文档号


// console.log('我是user',User.find)

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        // User.remove({},function(e,d){})
		return res.json(doc)
	})
})

Router.post('/login',function(req,res){
    const {user,pwd}=req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        // 设置cookie
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',function(req,res){
    const {user,pwd,type}=req.body
    // 查询用户名重复
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})

    })
})
Router.post('/update',function(req,res){
    // 先查看userid
    const userId=req.cookies.userid
    if(!userId){
        return res.json({code:1})
    }
    const body=req.body
    User.findByIdAndUpdate(userId,body,function(err,doc){
        const data=Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        res.json({code:0,data})
    })
})
Router.get('/info',function(req,res){
    // 如果cookie里没有用户信息
    const {userid}=req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

function md5Pwd(pwd){
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports= Router