import React from "react";
import { connect } from "react-redux";
import aeroplane from "../../sources/icons/aeroplane.svg"
import SearchIcon from "../../sources/icons/search-flights.svg"
import EmptyData from "../../sources/icons/box.svg"
import EmptyResults from "../EmptyResults/EmptyResults";
import "./Flights.scss";
import LoadingFlights from "../LoadingFlights/LoadingFlights";




const Flights = (props) => {
  console.log(props);
  const {dark} = props;
  return (
    <div className="flights-container">
      {props.loading ?
         <EmptyResults loading={true} /> :
          props.data ? 
            props.data.flights ?
              props.data.flights.Quotes.length !== 0 ? 
              props.data.flights.Quotes.map((flight,i)=>{
                  if(i<4){
                  return  <div key={`${flight.QuoteId}--${i}`} id={dark && `dark`} className={`flight`}>
            <div className="logo">
              <img alt="logo" src={aeroplane} />
            </div>
            <div className="from_airport airport-data">
                <div className="place">{props.airports.from.name}</div>
                <div className="time"></div>
            </div>
            <div className="name-duration">
                <div className="company_name">{props.data.flights.Carriers.map(carrie=> {
                  if(carrie.CarrierId === flight.OutboundLeg.CarrierIds[0]){return carrie.Name}
                })}</div>
              
              </div>
              <div className="to_airport  airport-data">
                <div className="place">{props.airports.to.name}</div>
                <div className="time">{"10"}</div>
              </div> 
              <div className="flight_booking">
              <div className="price"><span className="currency">{props.data.flights.Currencies[0].Symbol}</span>{flight.MinPrice}</div>
                <button type="submit">Book Now</button>
              </div>
            </div>
                  }
          })
          :<EmptyResults icon={EmptyData} text="Sorry,We couldn't Find any Flight" />
        :
        <EmptyResults icon={SearchIcon} text="Search For Flights" />
      : 
       <EmptyResults icon={SearchIcon} text="Search For Flights" />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.FlightsReducer.FlightsData,
    airports:state.FlightsReducer.Locations,
    dark:state.AppReducer.DarkMode
  }
}

export default connect(mapStateToProps)(Flights);
