import {DARK_MODE} from "../types";
export const DarkModeState = (active) => {
    return {
        type:DARK_MODE,
        payload:!active
    }
}