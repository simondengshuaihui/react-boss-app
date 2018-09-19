import axios from 'axios'
// type
const REGISTER_SUCCESS='REGISTER_SUCCESS'
const ERROR_MSG='ERROR_MSG'

const initState={
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:''
}
// reducer
export function user(state=initState,action){
    switch(action.type){
        case ERROR_MSG:return {...state,msg:action.msg}
        case REGISTER_SUCCESS:return {...state,isAuth:true,...action.payload}
        default : return state
    }
}

// action
function error_msg(msg){
    return {msg,type:ERROR_MSG}
}
function register_success(data){
    return {type:REGISTER_SUCCESS,payload:data}
}

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!repeatpwd){
        return error_msg('请输入正确的用户名和密码')
    }
    if(pwd!==repeatpwd){
        return error_msg('密码不一致请重新输入')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                console.log(res)
                if(res.status===200&&res.data.code===0){
                    dispatch(register_success({user,pwd,repeatpwd,type}))
                }else{ 
                    dispatch(error_msg(res.date.msg))
                }
            })
    }
}