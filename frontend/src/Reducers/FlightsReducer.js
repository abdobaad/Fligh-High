import { FIND_FLIGHTS, FLIGHTS_AIRPORTS,CURRENCY_PRICE } from "../Actions/types";

export default (state={},action) =>{
    const {type,payload} = action;
    switch(type){
        case FIND_FLIGHTS:
         return {...state, FlightsData:payload}
         break;
        case FLIGHTS_AIRPORTS:
            return {...state,Locations:payload}
            break;
        case CURRENCY_PRICE:
            return {...state,currency:payload}
        default:
         return state;
    }
}