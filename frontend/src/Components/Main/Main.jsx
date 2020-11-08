import React, { useState } from "react";
import ResNav from "../ResNav/ResNav";
import ResultContainer from "../ResultContainer/ResultContainer";
import LocationIcon from "../../sources/icons/location.svg";
import TransferIcon from "../../sources/icons/transfer.svg";
import TravellerIcon from "../../sources/icons/user.svg";
import FirstClass from "../../sources/icons/first-class.svg";
import UpIcon from "../../sources/icons/up-arrow.svg";
import DownIcon from "../../sources/icons/down-arrow.svg";
import Alert from "../Alert/Alert";
import { autoComplete } from "../../Helpers/autoComplete";


import { SearchFlights,AirportsLocation } from "../../Actions/FlightsActions/FlightsActions";
import { connect } from "react-redux";
import Axios from "axios";
import "./Main.scss";


const styles = {
  darkColor:{backgroundColor:"#212121"},
  lightColor:{backgroundColor:"#616161",color:"#fff"},

}

const Main = (props) => {
  const {dark} = props;

  const TripTypes = ["one way", "round trip", "multi city"];
  const TripClasses = ["economy", "besiness", "first"];
  const [isLoading,setIsLoading] = useState(false)
  //States
  const [clickSearch,setClickSearch] = useState(false);
  //from location state:
  const [fromLocation, setFromLocation] = useState("");
  const [fromAirCity,setFromCity] = useState("");
  const [locPlace,setLocPlace] = useState("");
  const [matchingCitiesfrom, setMatchingCitiesfrom] = useState([]);
  const [hidecitiesfrom, setHidecitiesfrom] = useState(true);
  //to location state:
  const [toLocation, setToLocation] = useState("");
  const [toAirCity,setToCity] = useState("");
  const [distPlace,setDistPlace] = useState("");
  const [MatchingCitiesto, setMatchingCitiesto] = useState([]);
  const [hidecitiesto, setHidecitiesto] = useState(false);
  //flight type:
  const [tripType, setTripType] = useState("one-way");
  // travellers state:
  const [NumOfTraveller, setNumOfTraveller] = useState(1);
  const [travellerOnChange, setTravellerOnChange] = useState(false);
  //flight date start:
  const [startDate, setStartDate] = useState("");
  //flight class:
  const [flightClass, setFlightClass] = useState("economy");
  //alert and errors
  const [alert, setAlert] = useState(false);
  const [errors, setError] = useState([]);
  const [choseCity, setChoseCity] = useState(false);
 
  const ChangeTripType = (name) => {
    const trip = name.split(" ").join("-");
    setTripType(trip);
  };

  const ChangeTravellerNum = (type) => {
    switch (type) {
      case "Down":
        if (NumOfTraveller !== 1) {
          return setNumOfTraveller(NumOfTraveller - 1);
        }
        break;
      case "Up":
        return setNumOfTraveller(NumOfTraveller + 1);
    }
  };

  const FromCity = async (e) => {
    setHidecitiesfrom(false);
    setFromLocation(e.target.value);
    setLocPlace(e.target.value);
    let mydata;
    if (e.target.value) {
      mydata = await autoComplete(e.target.value);
    }
    if (mydata) {
      setMatchingCitiesfrom(mydata);
    }
  };

  const toCity = async (e) => {
    setHidecitiesto(false);
    setToLocation(e.target.value);
    setDistPlace(e.target.value)

    let mydata;
    if (e.target.value) {
      mydata = await autoComplete(e.target.value);
    }
    if (mydata) {
      setMatchingCitiesto(mydata);
    }
  };

  const transferLocations = () => {
    if (fromLocation || toLocation) {
      const z = toLocation;
      const y = toAirCity;
      const a = distPlace;
      setToLocation(fromLocation);
      setToCity(fromAirCity);
      setDistPlace(locPlace);
      setFromLocation(z);
      setFromCity(y);
      setLocPlace(a)
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setClickSearch(!clickSearch)

    if (!fromLocation) {
      await errors.push("start location");
    }

    if (!toLocation) {
      await errors.push("end location");
    }

    if (!startDate) {
      await errors.push(" date ");
    }

    if (errors.length === 0) {
      const data = await {
        from: fromLocation,
        to: toLocation,
        date: startDate,
        travellers: NumOfTraveller,
       // toDate:"5-20-2020",
        type: tripType,
        classType: flightClass,
        currency: props.currency ? props.currency : "USD" 
      };
  await props.dispatch(AirportsLocation({
    from:{
      name:fromLocation,
      city:fromAirCity
    },
    to:{
      name:toLocation,
      city:toAirCity
    }
  }))
   await props.dispatch(SearchFlights(data));
   setClickSearch(false);
   setIsLoading(false);
   //console.log(flights);
    } else {
      setAlert(true);
      setIsLoading(false)
      setTimeout(() => {
        setAlert(false);
        setError([]);
      }, 3000);
    }
  };
  const SearchCoordinates =async (loc,type) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoiYWJkb2JhYWQiLCJhIjoiY2p6Ymw0N2NwMDAxdzNscG1xM3l1azRhNCJ9.mek99-fcVGrCZp9-0XBM6w`;
   const citylocation = await  Axios.get(url);
   if(type==="from"){
    setFromCity(citylocation.data.features[0].geometry.coordinates);
   }else if(type==="to"){
    setToCity(citylocation.data.features[0].geometry.coordinates);
   }

 
  }

  const closeHandler = () => {
    setError([]);
    setAlert(false);
  };

  const addToForm =async (city,loc, type) => {
    setChoseCity(true);
    const id = await city.split("-")[0];
    SearchCoordinates(loc,type);
    if (type === "from" && hidecitiesfrom !== true) {
     
      setHidecitiesfrom(true);
      setFromLocation(id);
      setLocPlace(`(${id})-${loc}`);
    } else if ((type === "to" && hidecitiesto !== true)) {
      
      setHidecitiesto(true);
      setToLocation(id);
      setDistPlace(`(${id})-${loc}`);
    }
  };

  return (
    <div className="main_container">
      {alert ? <Alert closeError={() => closeHandler()} err={errors} /> : null}
      <div style={dark ? styles.darkColor : null} className="search-section">
        <div className="search_top">
          <div  style={dark ? styles.lightColor : null } className="location-container">
            <div className="loc from-loc">
              <img id="loc-icon" src={LocationIcon} alt="location" />
              <input
                type="text"
                
                placeholder="from"
                onChange={(e) => FromCity(e)}
                value={locPlace}
                onBlur={() =>
                  setTimeout(() => {
                    setHidecitiesfrom(true);
                  }, 500)
                }
              />

              {matchingCitiesfrom.length !== 0 &&
              fromLocation !== "" &&
              !hidecitiesfrom ? (
                <div id={dark ?  `dark`  : null} style={dark ? styles.lightColor : null} className="cities_search--container-1">
                  {matchingCitiesfrom.map((city,i) => (
                    <div 
                    id={dark ?  `activeDark`  : null}
                    style={dark ? styles.lightColor : null}
                      key={i}
                      onClick={() =>
                        addToForm(city.PlaceId,city.PlaceName, "from")
                      }
                      className="city-matching"
                    >  
                      {`${city.PlaceName} (${city.PlaceId})`}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div onClick={() => transferLocations()} className="middle-icon">
              <img id="icon" src={TransferIcon} alt="transform" />
            </div>
            <div className="loc to-loc">
              <img id="loc-icon" src={LocationIcon} alt="location" />
              <input
                type="text"
                placeholder="to"
                onChange={(e) => toCity(e)}
                value={distPlace}
                onBlur={() =>
                  setTimeout(() => {
                    setHidecitiesto(true);
                  }, 500)
                }
              />
              {MatchingCitiesto.length !== 0 &&
              toLocation !== "" &&
              !hidecitiesto ? (
                <div   style={dark ? styles.lightColor : null}  id={dark ?  `dark`  : null} className="cities_search--container-2">
                  {MatchingCitiesto.map((city,i) => (
                    <div
                    id={dark ?  `activeDark`  : null}
                      style={dark ? styles.lightColor : null}
                     key={i}
                      onClick={() => addToForm(city.PlaceId,city.PlaceName, "to")}
                      className="city-matching"
                    >
                      {`${city.PlaceName} (${city.PlaceId})`}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="traveller_date-container right-container">
            <div    style={dark ? styles.lightColor : null} onClick={()=>startDate} className="small calendar">
              <input
               style={dark ? {color:"#fff"} : null}
               
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                data-date-format="YYYY MMMM DD"
                className="date"
              />
            </div>
            <div
                style={dark ? styles.lightColor : null}            
              onMouseLeave={() => setTravellerOnChange(false)}
              onClick={() => setTravellerOnChange(true)}
              className="small traveller"
            >
              <img id="icon" src={TravellerIcon} alt="traveller" />
              <div className="number_of">
                {travellerOnChange ? (
                  <>
                    <span className="num">
                      {NumOfTraveller < 10
                        ? "0" + NumOfTraveller
                        : NumOfTraveller}
                    </span>
                    <div className="change">
                      <img
                        onClick={() => ChangeTravellerNum("Up")}
                        className="arrow"
                        src={UpIcon}
                        alt="up"
                      />
                      <img
                        onClick={() => ChangeTravellerNum("Down")}
                        className="arrow"
                        src={DownIcon}
                        alt="down"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <span>{NumOfTraveller}</span>{" "}
                    {NumOfTraveller > 1 ? "Tavellers" : "Taveller"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="search_bottom">
          <div    style={dark ? styles.lightColor : null} className="flight_type--container">
            {TripTypes.map((type, i) => (
              <div
                key={`${type}-${i}`}
                onClick={() => ChangeTripType(type)}
                className={`type ${type.split(" ").join("-") === tripType ? "active" : null}`}
              >
                {type.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="class_search-container right-container">
            <div   style={dark ? styles.lightColor : null}  className="small class">
              <img id="icon" src={FirstClass} alt="class" />
              <select onChange={(e) => setFlightClass(e.target.value)}>
                {TripClasses.map((trip, i) => (
                  <option key={`${trip}-${i}`} value={trip}>
                    {trip.toUpperCase()} CLASS
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={(e) => SubmitHandler(e)}
              type="submit"
              className="small search"
      
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <ResNav />
      <ResultContainer loading={isLoading} refrech={clickSearch} />
    </div>
  );
};

const mapStateToProps = state => {
  return{
     flights:state.FlightsReducer.FlightsData,
     currency:state.FlightsReducer.currency,
     dark:state.AppReducer.DarkMode
  }
}

export default connect(mapStateToProps)(Main);
