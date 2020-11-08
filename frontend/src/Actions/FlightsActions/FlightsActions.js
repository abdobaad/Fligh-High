import { FIND_FLIGHTS,FLIGHTS_AIRPORTS,CURRENCY_PRICE} from "../types";

import axios from 'axios';


export const SearchFlights = async data => {
 //  const url = `from=${from}/to=${to}/from_date=${date}/to_date=${toDate? toDate : null}/flight_type=${type}/class_type=${classType}`;
   const flights = await axios.post("/findflights",data);

   return {
       type:FIND_FLIGHTS,
       payload:flights.data
   }
}

export const AirportsLocation =(data)=>{
   return{
     type:FLIGHTS_AIRPORTS,
     payload:data
   }
}

export const ChooseCurrency = curr => {
  return{
    type:CURRENCY_PRICE,
    payload:curr
  }
}