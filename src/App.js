import React, { Component } from 'react';
import {Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {addGun,removeGun,addGunAsync} from './index.redux'

class App extends React.Component {
  
  render() {
    console.log(this.props,'app')
    return (
      <div>
        <div>还有{this.props.num}把枪</div>
        <Button onClick={this.props.addGun}>加一把枪</Button>
        <Button onClick={this.props.removeGun}>减一把枪</Button>
        <Button onClick={this.props.addGunAsync}>等2秒再加一把枪</Button>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {num:state.counter}
}
const mapDispatchToProps={addGun,removeGun,addGunAsync}
App=connect(mapStateToProps,mapDispatchToProps)(App)
export default App;
