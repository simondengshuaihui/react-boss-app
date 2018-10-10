import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import axios from 'axios'

@connect(state=>state.chatuser,{getUserList})
class Gunius extends React.Component{
    constructor(props){
        super(props)
        this.state={data:[]}
    }
    componentDidMount(){
        // 请求boss的信息存在redux里
        this.props.getUserList('boss')
        axios.get('/user/list?type=boss').then(res=>{
            if(res.data.code==0){
                this.setState({
                    data:res.data.data
                })
            }
        })
    }
    render(){
        return <UserCard userlist={this.state.data}></UserCard>
        // return <h2>老板页面</h2>
    }
}

export default Gunius