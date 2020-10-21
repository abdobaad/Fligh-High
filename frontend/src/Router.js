import React from 'react';
import {Switch,Route} from "react-router-dom"
import App from './App';
import Login from './Components/Login/Login';
import UserSign from './Components/UserSign/UserSign';

const Router = () => {
    return (
       <Switch>
           <Route exact path="/" component={App} />
           <Route exact path="/sign-up" component={UserSign} />
           <Route exact path="/sign-in" component={Login}/>
       </Switch>
    );
};

export default Router;