import React from 'react';
import LoadingFlights from "../LoadingFlights/LoadingFlights";

import {connect} from "react-redux";
import "./EmptyResults.scss";


const styles = {
    darkColor:{backgroundColor:"#212121"},
    lightColor:{backgroundColor:"#616161",color:"#fff"}
  }

const EmptyResults = ({loading,text,icon,dark}) => {
    return (
    
        <div style={dark ? styles.lightColor : null} className="empty">
            {!loading ?
            <> 
                <img src={icon} alt="empty"/>
                <h2 style={dark ? {color:"#fff"}:null} >{text}</h2>
            </> 
           :
           <LoadingFlights />}         
        </div>
        
        
    );
};
const mapStateToProps = state => {
    return {
        dark:state.AppReducer.DarkMode
    }
}

export default connect(mapStateToProps)(EmptyResults);