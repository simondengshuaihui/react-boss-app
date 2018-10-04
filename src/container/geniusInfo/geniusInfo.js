import React from 'react'
import {NavBar,InputItem,TextareaItem,Button,List} from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import {connect} from 'react-redux'
 
@connect(state=>state.user,{update})
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            desc:'',
            avatar:''
        }
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        })
    }
    render(){
        const redirect=this.props.redirectTo
        const path=this.props.location.pathName
        console.log()
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar>牛人完善信息页</NavBar>
                <AvatarSelector selectAvatar={(img)=>{
                    this.setState({
                        avatar:img
                    })
                }}></AvatarSelector>
                <List>
                    <InputItem onChange={(v)=>{this.handleChange('title',v)}}>应聘职位</InputItem>
                    <TextareaItem 
                    onChange={(v)=>{this.handleChange('desc',v)}}
                    title='职位描述' rows={3} autoHeight></TextareaItem>
                </List>
                <Button onClick={()=>{this.props.update(this.state)}} type='primary'>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo