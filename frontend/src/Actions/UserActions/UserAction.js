import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from "../types";

import axios from "axios"


export const LoginUser = async data => {
   const User = await axios.post('/users/login',data);
   return {
       type:LOGIN_USER,
       payload:User.data
   }
}
export const AuthenticatedUser  = async () => {
    const AuthedUser =  await axios.get('/users/auth');
    return {
        type:AUTH_USER,
        payload:AuthedUser
    }
}
export const RegisterUser = async data => {
    const NewUser = await axios.post("/users/register",data);

    return {
        type:REGISTER_USER,
        payload:NewUser.data
    }
}

export const SignMeOut = async () => {
    const logoutUser = await axios.get("/users/logout");

    return{
        type:LOGOUT_USER,
        payload:logoutUser.data
    }
}
