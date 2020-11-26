import {DARK_MODE} from "../types";
export const DarkModeState = (active,type) => {
    console.log(active,type);
    return {
        type:DARK_MODE,
        payload: type === 'fetch' ?active : !active
    }
}