import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
   
  } from "../Actions/types";


export default  (state = {},action) => {
   const  {type,payload}  = action;

   switch(type){
       case LOGIN_USER:
        return {...state,LoginUser:payload}
        break;
       case AUTH_USER:
         return {...state,AuthUser:payload}
        break;
      case LOGOUT_USER:
        return {...state,logedOut:payload}
        default: 
        return {state}
      case "GOOGLE":
        return {...state,googleAuth:payload}
   }
}