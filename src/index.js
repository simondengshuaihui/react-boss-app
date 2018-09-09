import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import { applyMiddleware,createStore,compose } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk'
import './config'
import Login from './container/login/login'
import Register from './container/register/Register';
import AuthRouter from './component/authRouter/authRouter'


const store=createStore(reducers,compose(applyMiddleware(thunk),window.devToolsExtension?window.devToolsExtension():f=>f))

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <AuthRouter></AuthRouter>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Redirect to='/login'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
