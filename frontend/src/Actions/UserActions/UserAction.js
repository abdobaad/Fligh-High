import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from "./types";

import axios from "axios"


export const LoginUser = async data => {
    console.log(data);
   const User = await axios.post('https://localhost:5000/users/login',data);

   return {
       type:LOGIN_USER,
       payload:User
   }
}