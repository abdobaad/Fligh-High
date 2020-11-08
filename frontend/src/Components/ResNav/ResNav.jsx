import React from "react";
import { connect } from "react-redux";
import "./ResNav.scss";

const ResNav =(props) => {
  const {data,dark} = props;
  
  return (
    <div style={dark ? {color:"#fff"} : null } className="head-container">
      { data ? 
            data.flights ? 
              <> Results (<span>{data.flights.Quotes.length}</span>) </>
            : null
        :null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.FlightsReducer.FlightsData,
    dark:state.AppReducer.DarkMode
  }
}

export default connect(mapStateToProps)(ResNav);
