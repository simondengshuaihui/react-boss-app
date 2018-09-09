import React from 'react'
import {Link,Route,Redirect} from 'react-router-dom'
import App from './App'
import {logout} from './Auth.redux'
import {connect} from 'react-redux'
import {Button} from 'antd-mobile'

const mapStateToProps=(state)=>{
    return {isAuth:state.auth.isAuth}
}
const mapDispatchToProps={
    logout
}
function Erying(){
    return <h2>二营</h2>
}
function Qibinglian(){
    return <h2>骑兵连</h2>
}

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
    }
    render(){
        const match=this.props.match;
        const redirecLogin=<Redirect to='/login'/>
        const app=(
            <div>
                {this.props.isAuth?<Button onClick={this.props.logout}>注销</Button>:null}
                <ul>
                    <li>
                        <Link to={`${match.url}`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/erying`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={`${match.url}/`} exact component={App}></Route>
                <Route path={`${match.url}/erying`} component={Erying}></Route>
                <Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
            </div>
        )
        return (
           this.props.isAuth?app:redirecLogin
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)