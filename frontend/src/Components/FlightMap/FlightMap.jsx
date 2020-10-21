import React from "react";
import Map from "../Map/Map";
import "./FlightMap.scss";

const FlightMap = () => {
  return (
    <div className="flight_map-container">
      <div className="top">
        <div className="loc">
          <div className="title">FROM</div>
          <span className="from">JFK</span>
        </div>
        <div className="stops">Non-stop</div>
        <div className="loc">
          <div className="title">TO</div>
          <span className="to">MOB</span>
        </div>
      </div>
      <Map />
      <div className="bottom">
        <div className="stops-filter ">
          <div className="stop">NO-STOP</div>
          <div className="stop">ONE-STOP</div>
          <div className="stop">MORE-STOPS</div>
        </div>
        <div className="price-filter">
          <div className="title">price</div>
          <div className="prices-ligne" />
          <div className="min" />
          <div className="max" />
        </div>
      </div>
    </div>
  );
};

export default FlightMap;
