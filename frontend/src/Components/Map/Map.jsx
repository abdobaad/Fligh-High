import React, { useRef, useEffect } from "react";
import "./Map.scss";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

const Map = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWJkb2JhYWQiLCJhIjoiY2p6Ymw0N2NwMDAxdzNscG1xM3l1azRhNCJ9.mek99-fcVGrCZp9-0XBM6w";

  const mapContainerRef = useRef(null);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      //  center: [-28.360528.3605 39.7405],
      center:[-28.360528, 81.5101],
      zoom: -1,
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
