import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
   
  } from "../Actions/UserActions/types";


export default  (state = {},action) => {
   const  {type,payload}  = action;

   switch(type){
       case LOGIN_USER:
        return {...state,LoginUser:payload}
        break;
    
        default: 
        return {state}
   }
}