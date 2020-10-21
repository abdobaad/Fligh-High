import React from "react";
import Flights from "../Flights/Flights";
import FlightMap from "../FlightMap/FlightMap";
import "./ResultContainer.scss";

const ResultContainer = () => {
  return (
    <div className="result-contianer">
      <Flights />
      <FlightMap />
    </div>
  );
};

export default ResultContainer;
