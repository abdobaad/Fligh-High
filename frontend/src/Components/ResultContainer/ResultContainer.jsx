import React from "react";
import Flights from "../Flights/Flights";
import FlightMap from "../FlightMap/FlightMap";
import "./ResultContainer.scss";

const ResultContainer = ({refrech,loading}) => {
  return (
    <div className="result-contianer">
      <Flights change={refrech} loading={loading} />
      <FlightMap change={refrech}  />
    </div>
  );
};

export default ResultContainer;
