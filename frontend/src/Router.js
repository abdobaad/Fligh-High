import React ,{useEffect}from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import {connect} from "react-redux"
import App from './Components/FlightsContainer/App';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import SettingsComp from './Components/SettingsComp/SettingsComp';
import Testcomp from './Components/Testcomp/Test';
import SignOut from './Components/SignOut/SignOut';
import UserSign from './Components/UserSign/UserSign';
import { AuthenticatedUser } from './Actions/UserActions/UserAction';
import { DarkModeState } from './Actions/AppActions/AppAction';

const PrivateRoute = ({ component: Component, ...rest }) => {
   
    return rest.user ? (
      rest.user.data.Auth ? (
        <Route exact {...rest} component={Component} />
      ) : null
    ) : null;
  };
  
  const LogRoute = ({ component: Component, ...rest }) =>{
  
   return rest.user ? (
      rest.user.data.Auth ? (
        <Redirect to="/" />
      ) : (
        <Route exact {...rest} component={Component} />
      )
    ) :  <Route exact {...rest} component={Component} />}

const Router = (props) => {
   
    
     useEffect(() => {
        const fetch = async () => {
          const DarkFromLocal = await localStorage.getItem("dark-mode") === 'true';
          await props.dispatch(DarkModeState(DarkFromLocal,'fetch'));
          await props.dispatch(AuthenticatedUser());
         
          
        };
    
        fetch();
      }, []); 
   
      
    return (
       
       <Switch> 
           <Route exact path="/" component={App} />
           <Route exact path="/settings" component={SettingsComp} />
           <LogRoute exact path="/sign-up" {...props} component={UserSign} />
           <LogRoute exact path="/sign-in" {...props} component={Login}/>
           <PrivateRoute exact path="/profile" {...props} component={Profile} />
           <PrivateRoute exact path="/sign-out" {...props} component={SignOut}/>
           {/* <Route exact path="/test" component={Testcomp}/> */}
       </Switch>
     
       
    );
};

const mapStateToProps = (state) => {
    return {
      user: state.UserReducer.AuthUser,
    };
  };
  
  export default connect(mapStateToProps)(Router);