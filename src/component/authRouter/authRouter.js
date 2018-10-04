import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import { connect } from 'react-redux';
@withRouter
@connect(null,{loadData})

class AuthRouter extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
    }
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        // 如果直接访问就跳转到相应页面不获取用户信息，不直接访问login和register就需要获取用户信息验证权限
		if (publicList.indexOf(pathname)>-1) {
			return null
        }
        // 
        axios.get('/user/info').then(res=>{
            // console.log(props)
            if(res.status===200){
                if(res.data.code===0){
                    this.props.loadData(res.data.data)
                    // this.props.history.push('/login')
                }else{
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}

export default AuthRouter