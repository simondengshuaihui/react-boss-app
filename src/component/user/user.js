import React from 'react'
import {Result,List,WhiteSpace,Modal,Button} from 'antd-mobile'
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
        // 改写alert方法
        alert('注销','确认退出登录吗？',[
            {text:'取消',onPress:()=>{console.log('cancel')}},
            {text:'确认',onPress:()=>{
                browserCookies.erase('userid')
                this.props.logoutSubmit()
            }}
        ])
    }
    render(){
        const Item=List.Item
        const Brief=Item.Brief
    //     if (!this.props.user) {
    //         return null
    //    }
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
                        {this.props.salary?<Brief>薪资:{this.props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
				<List>
					<Button type='warning' onClick={this.logout} style={{zIndex:'1'}}>退出登录</Button>
				</List>
            </div>
        ):<Redirect to={this.props.redirectTo}></Redirect>
    }
}

export default User