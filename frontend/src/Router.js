import React from 'react';
import {Switch,Route} from "react-router-dom"
import App from './Components/FlightsContainer/App';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import SettingsComp from './Components/SettingsComp/SettingsComp';
import Side from './Components/Side/Side';
import SignOut from './Components/SignOut/SignOut';
import UserSign from './Components/UserSign/UserSign';

const Router = () => {
    return (
       
       <Switch>
         
           <Route exact path="/" component={App} />
           <Route exact path="/sign-up" component={UserSign} />
           <Route exact path="/sign-in" component={Login}/>
           <Route exact path="/settings" component={SettingsComp} />
           <Route exact path="/profile" component={Profile} />
           <Route exact path="/sign-out" component={SignOut}/>
       </Switch>
     
       
    );
};

export default Router;