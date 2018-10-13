import React from 'react'
import Logo from '../../component/logo/logo'
import {InputItem,WingBlank,WhiteSpace,Button,List,Radio} from 'antd-mobile'
import {register} from '../../redux/user.redux'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

@connect(state=>state.user,{register})
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'
        }
        this.handleRegister=this.handleRegister.bind(this)
    }
    handleChange(key,val){
        // console.log(val)
        this.setState({
            [key]:val
        })
    } 
    handleRegister(){
        this.props.register(this.state)
        // console.log(this.state)
        // Axios.get('/user/info',function(res){ 
        //     console.log(res)
        // })
    }
    render(){
        const RedioItem=Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='err-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={(v)=>this.handleChange('user',v)}>用户名</InputItem>
                        <InputItem type='password' onChange={(v)=>this.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem type='password' onChange={(v)=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RedioItem onChange={()=>this.handleChange('type','genius')} checked={this.state.type==='genius'}>牛人</RedioItem>
                        <RedioItem onChange={()=>this.handleChange('type','boss')} checked={this.state.type==='boss'}>BOSS</RedioItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register