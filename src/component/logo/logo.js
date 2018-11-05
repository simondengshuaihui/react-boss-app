import React from 'react'
import './logo.css'

class Logo extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return (
            <div className='logo-contanier'>
                <img src={require('./job.png')} alt="logo"/>
            </div>
        )
    }
}

export default Logo