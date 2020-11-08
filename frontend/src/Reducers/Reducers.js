import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import FlightsReducer from "./FlightsReducer"
import AppReducer from "./AppReaducer";

const Reducer = combineReducers({
    UserReducer,
    FlightsReducer,
    AppReducer
})

export default Reducer;