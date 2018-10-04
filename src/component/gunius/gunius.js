import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(state=>state.chatuser,{getUserList})
class Gunius extends React.Component{
    componentDidMount(){
        // 请求boss的信息存在redux里
        this.props.getUserList('boss')
        console.log(this.props.userList)
    }
    render(){
        return <UserCard userlist={this.props.userList}></UserCard>
        // return <h2>老板页面</h2>
    }
}

export default Gunius