import React,{useEffect} from "react";
import { connect } from "react-redux";
import ReactMapGl,{ Marker} from "react-map-gl"
import AirportIcon from "../../sources/icons/airport.svg"
import "./FlightMap.scss";
import { useState } from "react";
import Axios from "axios";

const FlightMap = ({airports,change}) => {
  const [location,setLocation] = useState({
    form:"",
    to:""
  });

  const [viewPort,setViewPort] =useState({
    longitude:-33,
    latitude:0,
    width:"100%",
    height:"100%",
    zoom:.3})
  useEffect(() => {
    const fetchData = async ()=>{
      
    }
    fetchData();

  }, [airports])
  return (
    <div className="flight_map-container">
      <div className="top">
       {airports ? <> 
        <div className="loc">
          <div className="title">FROM</div>
       <span className="from">{airports.from.name}</span>
        </div> 
        <div className="stops">Non-stop</div>
        <div className="loc">
          <div className="title">TO</div>
          <span className="to">{airports.to.name}</span>
        </div>
        </>
        : null}


      </div>
      {/* <Map /> process.env.REACT_APP_MAPBOX_TOKEN*/}
     
      <ReactMapGl mapStyle="mapbox://styles/abdobaad/ckh1zcuzs17fs19qggu8x9p59" {...viewPort}
                       mapboxApiAccessToken="pk.eyJ1IjoiYWJkb2JhYWQiLCJhIjoiY2p6Ymw0N2NwMDAxdzNscG1xM3l1azRhNCJ9.mek99-fcVGrCZp9-0XBM6w" 
                        onViewportChange={viewPort=> setViewPort(viewPort)}
            >
            {airports &&  <Marker offsetLeft={-20} longitude={airports.from.city[0]} latitude={airports.from.city[1]}>
                <img style={{width:"20px"}} src={AirportIcon} alt="airport" />
                          </Marker>}
            {airports &&  <Marker offsetLeft={-20} longitude={airports.to.city[0]} latitude={airports.to.city[1]}>
                <img style={{width:"20px"}} src={AirportIcon} alt="airport" />
                          </Marker>}
      </ReactMapGl>
     
     {/*  <div className="bottom">
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
      </div> */}
    </div>
  );
};

const mapStateToProps = state => {
  return{
    airports:state.FlightsReducer.Locations
  }
}

export default connect(mapStateToProps)(FlightMap);
