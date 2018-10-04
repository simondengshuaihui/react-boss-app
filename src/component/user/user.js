import React from 'react'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutSubmit} from '../../redux/user.redux'

@connect(state=>state.user,{logoutSubmit})
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout=this.logout.bind(this)
    }
    logout(){
        const alert=Modal.alert

        alert('注销','确认退出登录吗？',[
            {text:'取消',onPress=()=>{console.log('cancel')}},
            {text:'确认',onPress=()=>{
                browserCookies.erase('userid')
                this.props.logoutSubmit
            }}
        ])
    }
    render(){
        const Item=List.Item
        const Brief=Item.Bfief
        return this.props.user?(
            <div>
                <Result img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt="" />}
                        title={this.props.user}
                        message={this.props.type==='boss'?this.props.company:null}
                ></Result>
                <List renderHeader={()=>'简介'}>
                    <Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('/n').map(v=><Brief key={v}>{v}</Brief>)}
                        {this.props.salary?<Brief>薪资:{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.logout}>退出登录</Item>
				</List>
            </div>
        ):<Redirect to={props.redirectTo}></Redirect>
    }
}