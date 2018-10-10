import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import axios from 'axios'

@connect(state=>state.chatuser,{getUserList})
class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        // 请求牛人的信息存在redux里
        this.props.getUserList('genius')
        axios.get('/user/list?type=genius').then(res=>{
            if(res.data.code==0){
                this.setState({
                    data:res.data.data
                })
            }
        })
    }
    render(){
        return <UserCard userlist={this.state.data}></UserCard>
    }
}

export default Boss