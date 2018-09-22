import React from 'react'
import Logo from '../../component/logo/logo'
import {InputItem,WingBlank,WhiteSpace,Button,List} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'

@connect(state=>state.user,{login})

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:''
        }
        this.register=this.register.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('./register')
    }
    handleChange(key,val){
        console.log(val)
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={(v)=>{this.handleChange('user',v)}}>用户</InputItem>
                        {/* <WhiteSpace/> */}
                        <InputItem onChange={(v)=>{this.handleChange('pwd',v)}}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
                
            </div>
        )
    }
}

export default Login