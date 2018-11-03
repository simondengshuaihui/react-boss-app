import React from "react";
import { List, InputItem, NavBar, Grid, Icon } from "antd-mobile";
import { connect } from "react-redux";
import { getMsgList, sendMsg, recvMsg,readMsg } from "../../redux/chat.redux";
import { getChatId } from "../../util";

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg,readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      msg: [],
      showEmoji: false
    };
  }
  componentDidMount() {
    //   如果没有用户聊天信息再获取msglisg
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  componentWillUnmount(){
    console.log('消除消息')
    // 退出组件之前消除未读消息
    const from=this.props.match.params.userid
    // const from = this.props.user._id
    this.props.readMsg(from)

  }
  handleSubmit(val) {
    // console.log("发送");
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: "",showEmoji:false });
  }
  // 修表情框的bug
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }
  render() {
    const emoji = "😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 "
      .split(" ")
      .filter(v => v)
      .map(v => ({ text: v }));

    const userid = this.props.match.params.userid; //目标用户id
    const users = this.props.chat.users;
    const Item = List.Item;
    // console.log("聊天对象", users);
    // 如果没有用户则不渲染
    if (!users) {
      return null;
    }
    const chatId = getChatId(userid, this.props.user._id);
    // 过滤同chatid的聊天记录
    // console.log('chatId',chatId)
    // console.log("xiaode", this.props.chat.chatmsg);
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid == chatId);
    // console.log('保存',this.props.chat.chatmsg)
    // console.log("过滤后的msgs", chatmsg);
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {/*通过userid查到User用户名*/}
          {users[userid].name}
        </NavBar>
        {chatmsg.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            //  对方发来的
            <List key={v._id}>
              <Item thumb={avatar} >{v.content}</Item>
            </List>
          ) : ( 
            //   自己发的
            <List key={v._id} className="chat-me">
              <Item extra={<img src={avatar} />} >
                {v.content}
              </Item>
            </List>
          );
        })}
        {/* 输入框 */}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v });
              }}
              extra={
                <div>
                  <span
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      this.setState({ showEmoji: !this.state.showEmoji });
                      this.fixCarousel();
                    }}
                  >
                    😃
                  </span>
                  <span
                    onClick={() => {
                      this.handleSubmit(this.state.text);
                    }}
                  >
                    发送
                  </span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({ text: this.state.text + el.text });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Chat;
