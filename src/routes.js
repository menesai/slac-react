import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AppTwo from './components/AppTwo';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

export default (
    <Switch>
        <Route path='/' exact component={AppTwo}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
    </Switch>
)