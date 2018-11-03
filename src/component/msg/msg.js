import React from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

@connect(state => state)
class Msg extends React.Component {
  constructor(props) {
    super(props);
  }
  getLast(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id;
    // 聊天列表
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    // 聊天列表排序
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_tiem;
      const b_last = this.getLast(b).create_tiem;
      return b_last - a_last;
    });
    return (
      <div>
        {chatList.map(v => {
          const lastMsg = this.getLast(v);
          const unreadNum = v.filter(t => !t.read && t.to === userid).length;
          // 聊天对象的id
          const targetId = v[0].from === userid ? v[0].to : v[0].from;
          return (
            <List key={lastMsg._id}
            onClick={() => {
              console.log(1111);
              this.props.history.push(`/chat/${targetId}`);
            }}
            >
              <Item
                thumb={require(`../img/${
                  this.props.chat.users[targetId].avatar
                }.png`)}
                extra={<Badge text={unreadNum} />}
                arrow="horizontal"
              >
                {lastMsg.content}
                <Brief>{this.props.chat.users[targetId].name}</Brief>
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Msg;
