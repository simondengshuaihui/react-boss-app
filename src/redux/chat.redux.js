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
    console.log(action)
      return {
        ...state,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userid
        ).length,
        users: action.payload.users
      };
    case MSG_READ:
      return {};
    case MSG_RECV:
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0;
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

export function recvMsg() {
  return (dispatch, getState) => {
    const userid = getState().user._id;
    socket.on("recvmsg", function(data) {
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
