import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { applyMiddleware,createStore,compose } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk'
import './config'
import Login from './container/login/login'
import Register from './container/register/Register'
import AuthRouter from './component/authRouter/authRouter'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Chat from './component/chat/chat'
import Dashboard from './component/dashboard/dashboard'
import './index.css'


const store=createStore(reducers,compose(applyMiddleware(thunk),window.devToolsExtension?window.devToolsExtension():f=>f))

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/* 去任何路由都要先进行权限验证，先获取用户信息 */}
                <AuthRouter></AuthRouter>
                <Switch>
                    <Route path='/bossInfo' component={BossInfo}></Route>
                    <Route path='/geniusInfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
