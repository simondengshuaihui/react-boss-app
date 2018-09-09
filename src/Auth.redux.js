import axios from 'axios'
const LOGIN='LOGIN'
const LOGOUT='LOGOUT'
const GET_USERDATA='GET_USERDATA'


// reducer
export function auth(state={isAuth:false,user:'simon'},action){
    switch(action.type){
        case LOGIN:return {...state,isAuth:true}
        case LOGOUT:return {...state,isAuth:false}
        case GET_USERDATA:return {...state,...action.payload}
        default :return state
    }
}
// action
export function getUserData(){
    return dispatch=>{
        axios.get('/data').then(res=>{
            if(res.status===200){
                // console.log(res.data)
                dispatch(userData(res.data))
            }
        })
    }
}
export function userData(data){
    return {type:GET_USERDATA,payload:data}
}
export function login(){
    return {type:LOGIN}
}
export function logout(){
    return {type:LOGOUT}
}