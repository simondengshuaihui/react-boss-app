import React from 'react'
import './logo.css'
import LogoImg from './job.png'

class Logo extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='logo-contanier'>
                <img src={LogoImg} alt="logo"/>
            </div>
        )
    }
}

export default Logo