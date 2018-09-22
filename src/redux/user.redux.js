import axios from 'axios'
import {getRedirectPath} from '../util'  //获取跳转路径
// type
const REGISTER_SUCCESS='REGISTER_SUCCESS'
const ERROR_MSG='ERROR_MSG'
const LONGIN_SUCCESS='LONGIN_SUCCESS'
const LOAD_DATA='LOAD_DATA'

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
        case REGISTER_SUCCESS:return {...state,isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case LONGIN_SUCCESS:return {...state,isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_DATA:return {...state,...action.payload}
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
function login_success(data){
    return {type:LONGIN_SUCCESS,payload:data}
}

export function loadData(userInfo){
    return {type:LOAD_DATA,payload:userInfo}
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
export function login({user,pwd}){
    if(!user||!pwd){
        return error_msg('请输入正确的用户名和密码')
    }
    return dispatch=>{
        axios.get('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(login_success(res.data))
            }else{
                dispatch(error_msg(res.data.msg))
            }
        })
    }
}