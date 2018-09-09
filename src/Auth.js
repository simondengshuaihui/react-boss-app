import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login,logout,getUserData} from './Auth.redux'
import {Button} from 'antd-mobile'


class Auth extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
        this.props.getUserData()
    }
    render(){
        console.log(this.props,'auth')
        return (
            <div>
                我是{this.props.auth.name}年龄{this.props.auth.age}
                {this.props.isAuth?<Redirect to='./Dashboard.js'></Redirect>:null}
                <h2>需要登录才能看到更多信息</h2> 
                <Button type='danger' onClick={this.props.login}>登录</Button>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {...state}
}
const mapDispatchToProps={
    login,logout,getUserData
}
Auth=connect(mapStateToProps,mapDispatchToProps)(Auth)
export default Auth