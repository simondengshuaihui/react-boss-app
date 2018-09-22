export function getRedirectPath(type,avatar){
    // 根据用户信息跳转地址
    let url = (type==='bose')?'/boss':'genius'
    if(!avatar){
        url+='info'
    }
    return url
}