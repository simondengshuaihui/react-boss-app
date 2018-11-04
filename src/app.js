import React from "react";
import Login from "./container/login/login";
import Register from "./container/register/Register";
import AuthRouter from "./component/authRouter/authRouter";
import BossInfo from "./container/bossInfo/bossInfo";
import GeniusInfo from "./container/geniusInfo/geniusInfo";
import Chat from "./component/chat/chat";
import Dashboard from "./component/dashboard/dashboard";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErr: false
    };
  }
  //   捕捉错误显示
  componentDidCatch(err, info) {
    console.log(err, info);
    this.setState({
      hasErr: true 
    });
  }
  render() {
    return this.state.hasErr ? (
      <h1 className="err-content">出错啦，请检查</h1>
    ) : (
      <div>
        {/* 去任何路由都要先进行权限验证，先获取用户信息 */}
        <AuthRouter />
        <Switch>
          <Route path="/bossInfo" component={BossInfo} />
          <Route path="/geniusInfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:userid" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
