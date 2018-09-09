import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Auth from './Auth'
import Dashboard from './Dashboard'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import { applyMiddleware,createStore,compose } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk'
import './config'


const store=createStore(reducers,compose(applyMiddleware(thunk),window.devToolsExtension?window.devToolsExtension():f=>f))

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
