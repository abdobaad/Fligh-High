import React from "react";
import "./Flights.scss";

const Flights = () => {
  const flights = [
    {
      com_logo: "hhh",
      com_name: "emirate",
      airport_from_name: "FJK",
      airport_from_time: "13:00",
      airport_to_name: "MKD",
      airport_to_time: "00:00",
      flight_duration: "11h",
      type: "NON-STOP",
      price: 1300,
    },
    {
      com_logo: "hhh",
      com_name: "emirate",
      airport_from: "FJK",
      airport_from_time: "13:00",
      airport_to: "MKD",
      airport_to_time: "00:00",
      flight_duration: "11h",
      type: "NON-STOP",
      price: 1300,
    },
    {
      com_logo: "hhh",
      com_name: "emirate",
      airport_from: "FJK",
      airport_from_time: "13:00",
      airport_to: "MKD",
      airport_to_time: "00:00",
      flight_duration: "11h",
      type: "NON-STOP",
      price: 1300,
    },
    {
      com_logo: "hhh",
      com_name: "emirate",
      airport_from: "FJK",
      airport_from_time: "13:00",
      airport_to: "MKD",
      airport_to_time: "00:00",
      flight_duration: "11h",
      type: "NON-STOP",
      price: 1300,
    },
  ];

  return (
    <div className="flights-container">
      {flights.map((flight, i) => (
        <div className={`flight`}>
          <div className="logo">{flight.com_logo}</div>
          <div className="from_airport airport-data">
            <div className="place">{flight.airport_from_name}</div>
            <div className="time">{flight.airport_from_time}</div>
          </div>
          <div className="name-duration">
            <div className="company_name">{flight.com_name}</div>
            <div className="flight_duration">{flight.flight_duration}</div>
            <div className="flight_stops">{flight.type}</div>
          </div>
          <div className="to_airport  airport-data">
            <div className="place">{flight.airport_to_name}</div>
            <div className="time">{flight.airport_to_time}</div>
          </div>
          <div className="flight_booking">
            <div className="price">{flight.price}</div>
            <button type="submit">Book Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Flights;
