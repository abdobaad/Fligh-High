import { DARK_MODE } from "../Actions/types";

export default (state={},{type,payload}) => {

    switch(type){
        case DARK_MODE:
            return {...state,DarkMode:payload}
        default:
            return state
    }
}