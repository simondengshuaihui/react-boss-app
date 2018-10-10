const mongoose = require('mongoose')
// console.log(mongoose)
// db=mongoose.createConnection('mongodb://127.0.0.1:27017/my-bossapp')


mongoose.connect('mongodb://127.0.0.1:27017/my-bossapp');
var db=mongoose.connection
db.on("error",function(error){
    console.log("数据库连接失败:"+error);
});
db.once("open",function(){
    console.log("数据库连接成功");
});

// db.on('connected',function(){
//     console.log('mongo链接成功123')
// })
// db.on('error',function(res){
//     console.log('mongo 失败',res)
// })
const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}
	},
	chat:{
		'chatid':{'type':String,'require':true},
		'from':{'type':String,'require':true},
		'to':{'type':String,'require':true},
		'content':{'type':String,'require':true,'default':''},
		'create_time':{'type':Number,'default':Date.now},
		'read':{'type':Boolean,'default':false}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}


module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}


