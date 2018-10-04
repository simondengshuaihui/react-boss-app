import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(state=>state.chatuser,{getUserList})
class Boss extends React.Component{
    componentDidMount(){
        // 请求牛人的信息存在redux里
        this.props.getUserList('genius')
        console.log('用户列表',this.props.userlist)
    }
    render(){
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default Boss