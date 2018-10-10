import React from "react";
import { TabBar } from "antd-mobile";
import PropTyps from "prop-types";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'

@withRouter
@connect(state=>state.chat)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTyps.array.isRequired
  };
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    // console.log(navList)
    const { pathname } = this.props.location;
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            badge={v.path==='/msg'?this.props.unread:0}
            key={v.path}
            title={v.title}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path);
            }}
          />
        ))}
      </TabBar>
    );
  }
}

export default NavLinkBar;
