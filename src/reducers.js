import {combineReducers} from 'redux'
import {user} from './redux/user.redux'
import {chatuser} from './redux/chatuser.redux'
import {chat} from './redux/chat.redux'
// console.log(counter)
export default combineReducers({user,chatuser,chat})