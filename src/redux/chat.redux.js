import axios from "axios";
import io from "socket.io-client";
const socket = io("ws://127.0.0.1:9093");

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
};
// 获取聊天列
const MSG_LIST = "MSG_LIST";
// 读信息
const MSG_RECV = "MSG_RECV";
// 标识已读
const MSG_READ = "MSG_READ";

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      // console.log(action);
      return {
        ...state,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userid
        ).length,
        users: action.payload.users
      };
    case MSG_READ:
      // 把所有from===对方id的read都改为true
      const { from, num } = action.payload;
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({
          ...v,
          read: v.from == from ? true : v.read
        })),
        unread: state.unread - num
      };
    case MSG_RECV:
    // 对方发来的消息才加1
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0;
      console.log(action.payload.msg.to,action.payload.userid)
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: state.unread + n
      };
    default:
      return state;
  }
}
function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } };
}
function msgRecv(msg, userid) {
  return { type: MSG_RECV, payload: { msg, userid } };
}
function msgRead(data) {
  return { type: MSG_READ, payload: data }; 
}
export function readMsg(from) {
  return (dispatch, getState) => {
    // 消除的是对方发过来的消息,from为对方的id
    const userid = getState().user._id;
    axios.post("/user/readmsg", {from} ).then(res => {
      // console.log({ userid, from, num: res.data.num })
      if (res.status === 200 && res.data.code === 0) {
        // console.log({ userid, from, num: res.data.num })
        dispatch(msgRead({ userid, from, num: res.data.num }));
      }
    });
  };
}
export function recvMsg() {
  return (dispatch, getState) => {
    
    socket.on("recvmsg", function(data) {
      // getState异步获取数据
      const userid = getState().user._id;
      console.log('获取',getState())
      dispatch(msgRecv(data, userid));
    });
  };
}
export function sendMsg({ to, from, msg }) {
  return dispatch => {
    socket.emit("sendmsg", { to, from, msg });
  };
}
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get("/user/getmsglist").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id;
        dispatch(msgList(res.data.msgs, res.data.users, userid));
      }
    });
  };
}
