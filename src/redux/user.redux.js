import axios from "axios";
import { getRedirectPath } from "../util"; //获取跳转路径
// type
const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
const LOGOUT = "LOGOUT";

const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  user: ""
};
// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case ERROR_MSG:
      return { ...state, msg: action.msg };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case LOGOUT:
      return { ...initState, redirectTo: "/login" };
    default:
      return state;
  }
}

// action
function error_msg(msg) {
  return { msg, type: ERROR_MSG };
}
function authSuccess(data) {
  return { type: AUTH_SUCCESS, payload: data.data };
}
export function update(data) {
  return dispatch => {
    axios.post("/user/update", data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(error_msg(res.data.msg));
      }
    });
  };
}

export function loadData(userInfo) {
  return { type: LOAD_DATA, payload: userInfo };
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !repeatpwd) {
    return error_msg("请输入正确的用户名和密码");
  }
  if (pwd !== repeatpwd) {
    return error_msg("密码不一致请重新输入");
  }
  return dispatch => {
    axios.post("/user/register", { user, pwd, type }).then(res => {
      // console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, repeatpwd, type }));
      } else {
        dispatch(error_msg(res.data.msg));
      }
    });
  };
}
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return error_msg("请输入正确的用户名和密码");
  }
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data));
      } else {
        dispatch(error_msg(res.data.msg));
      }
    });
  };
}

export function logoutSubmit() {
  return { type: LOGOUT };
}
