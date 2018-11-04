import React from "react";
import { Route } from "react-router-dom";
import { NavBar } from "antd-mobile";
import { connect } from "react-redux";
import NavLinkBar from "../navlink/navlink";
import Boss from "../boss/boss";
import Genius from "../gunius/gunius";
import { getMsgList,recvMsg } from "../../redux/chat.redux";
import User from "../user/user";
import Msg from "../msg/msg";
import QueueAnim from "rc-queue-anim";

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class DashBoard extends React.Component {
  // 挂载后开始获取用户聊天列表
  componentDidMount() {
    // 没有数据才去请求，避免来回切换重复添加
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg(); //开始接收消息
    }
  }
  render() {
    const { pathname } = this.props.location;
    // console.log(pathname)
    const user = this.props.user;
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type === "genius"
      },
      {
        path: "/genius",
        text: "BOSS",
        icon: "job",
        title: "BOSS列表",
        component: Genius,
        hide: user.type === "boss"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我",
        icon: "user",
        title: "个人中心",
        component: User
      }
    ];
    const page = navList.find(v => v.path === pathname);
    return (
      <div>
        <NavBar className="fixd-header" mode="dark">
          {pathname !== "/" ? page.title : null}
          {/* {navList[0].title} */}
        </NavBar>
        {/* 主体内容 */}
        <div style={{ marginTop: 45 }}>
          {/* <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch> */}
          <QueueAnim type="bottom" duration={500} >
            <Route key={page.path} path={page.path} component={page.component} />

          </QueueAnim>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}

export default DashBoard;
