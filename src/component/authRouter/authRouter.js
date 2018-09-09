import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
@withRouter
class AuthRouter extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
    }
    componentDidMount(){
        axios.get('/user/info').then(res=>{
            if(res.status===200){
                console.log(res.data)
            }
        })
    }
    render(){
        return (
            <h1>授权由检测</h1>
        )
    }
}

export default AuthRouter