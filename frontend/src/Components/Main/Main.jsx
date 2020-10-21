import React, { useState } from "react";
import axios from "axios";
import ResNav from "../ResNav/ResNav";
import ResultContainer from "../ResultContainer/ResultContainer";
import LocationIcon from "../../sources/icons/location.svg";
import TransferIcon from "../../sources/icons/transfer.svg";
//import ScheduleIcon from "/images/schedule.svg";
import TravellerIcon from "../../sources/icons/user.svg";
import FirstClass from "../../sources/icons/first-class.svg";
import UpIcon from "../../sources/icons/up-arrow.svg";
import DownIcon from "../../sources/icons/down-arrow.svg";
import Alert from "../Alert/Alert";
import { autoComplete } from "../../Helpers/autoComplete";

import "./Main.scss";
const Main = () => {
  const TripTypes = ["one way", "round trip", "multi city"];
  const TripClasses = ["economy", "besiness", "first"];

  //States

  //from location state:
  const [fromLocation, setFromLocation] = useState("");
  const [matchingCitiesfrom, setMatchingCitiesfrom] = useState([]);
  const [hidecitiesfrom, setHidecitiesfrom] = useState(true);

  //to location state:
  const [toLocation, setToLocation] = useState("");
  const [MatchingCitiesto, setMatchingCitiesto] = useState([]);
  const [hidecitiesto, setHidecitiesto] = useState(false);

  //flight type:
  const [tripType, setTripType] = useState("one way");
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
  const [choseCity, setShoseCity] = useState(false);

  const ChangeTripType = (name) => {
    setTripType(name);
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
      setToLocation(fromLocation);
      setFromLocation(z);
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

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
      const filters = await {
        form: fromLocation,
        to: toLocation,
        date: startDate,
        travellers: NumOfTraveller,
        type: tripType,
        class: flightClass,
      };

      console.log(filters);
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        setError([]);
      }, 3000);
    }
  };

  const closeHandler = () => {
    setError([]);
    setAlert(false);
  };

  const addToForm = (city, type) => {
    setShoseCity(true);
    if (type === "from" && hidecitiesfrom !== true) {
      setHidecitiesfrom(true);
      setFromLocation(city);
    } else if ((type = "to" && hidecitiesto !== true)) {
      setHidecitiesto(true);
      setToLocation(city);
    }
  };

  return (
    <div className="main_container">
      {alert ? <Alert closeError={() => closeHandler()} err={errors} /> : null}
      <div className="search-section">
        <div className="search_top">
          <div className="location-container">
            <div className="loc from-loc">
              <img id="loc-icon" src={LocationIcon} alt="location" />
              <input
                type="text"
                placeholder="from"
                onChange={(e) => FromCity(e)}
                value={fromLocation}
                onBlur={() =>
                  setTimeout(() => {
                    setHidecitiesfrom(true);
                  }, 500)
                }
              />

              {matchingCitiesfrom.length !== 0 &&
              fromLocation !== "" &&
              !hidecitiesfrom ? (
                <div className="cities_search--container-1">
                  {matchingCitiesfrom.map((city) => (
                    <div
                      onClick={() =>
                        addToForm(city.PlaceId.slice(0, 3), "from")
                      }
                      className="city-matching"
                    >
                      {`${city.PlaceName} (${city.PlaceId.slice(0, 3)})`}
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
                value={toLocation}
                onBlur={() =>
                  setTimeout(() => {
                    setHidecitiesto(true);
                  }, 500)
                }
              />
              {MatchingCitiesto.length !== 0 &&
              toLocation !== "" &&
              !hidecitiesto ? (
                <div className="cities_search--container-2">
                  {MatchingCitiesto.map((city) => (
                    <div
                      onClick={() => addToForm(city.PlaceId.slice(0, 3), "to")}
                      className="city-matching"
                    >
                      {`${city.PlaceName} (${city.PlaceId.slice(0, 3)})`}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="traveller_date-container right-container">
            <div onClick={startDate} className="small calendar">
              {/*  <img id="icon" src={ScheduleIcon} alt="schedule" /> */}
              {/*  <div className="date">29 Oct 2020</div> */}
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="date"
              />
            </div>
            <div
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
          <div className="flight_type--container">
            {TripTypes.map((type, i) => (
              <div
                key={`${type}-${i}`}
                onClick={() => ChangeTripType(type)}
                className={`type ${type === tripType ? "active" : null}`}
              >
                {type.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="class_search-container right-container">
            <div className="small class">
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
      <ResultContainer />
    </div>
  );
};

export default Main;
