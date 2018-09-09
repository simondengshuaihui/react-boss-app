import {counter} from './index.redux.js'
import {auth} from './Auth.redux.js'
import {combineReducers} from 'redux'

// console.log(counter)
export default combineReducers({counter,auth})