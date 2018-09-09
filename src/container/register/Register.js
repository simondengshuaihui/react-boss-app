import React from 'react'
import Logo from '../../component/logo/logo'
import {InputItem,WingBlank,WhiteSpace,Button,List,Radio} from 'antd-mobile'

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
        console.log(val)
        this.setState({
            [key]:val
        })
    }
    handleRegister(){

    }
    render(){
        const RedioItem=Radio.RadioItem
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onClick={(v)=>this.handleChange('user',v)}>用户名</InputItem>
                        <InputItem onClick={(v)=>this.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem onClick={(v)=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RedioItem onClick={()=>this.handleChange('type','genius')} checked={this.state.type==='genius'}>牛人</RedioItem>
                        <RedioItem onClick={()=>this.handleChange('type','boss')} checked={this.state.type==='boss'}>BOSS</RedioItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register