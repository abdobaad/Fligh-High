import React from 'react';
import {CURRENCIES} from "../../Helpers/ListCurrencies";
import "./SettingsComp.scss"
import { useState } from 'react';
import { connect } from 'react-redux';
import { ChooseCurrency } from '../../Actions/FlightsActions/FlightsActions';
import {DarkModeState} from '../../Actions/AppActions/AppAction';
import Layout from '../../HOC/Layout';

const SettingsComp = (props) => {
    const {dark} = props;
    const [currencies,setCurrencies] = useState(CURRENCIES);
    

    const ActiveDarkMode = async () => {
       await props.dispatch(DarkModeState(dark));       
    }
    return (
        <Layout>
        <div className="comp-container">
            
            <div className="settings-container">
            <div className="darkmode">
                        <p className="title">Dark Mode: </p>
                        <span onClick={()=> ActiveDarkMode()} id={dark ? 'active-dark' : ''} className="select-darkmode" />
                    </div>
                    <div className="currencies">
                        <select onChange={(e)=> props.dispatch(ChooseCurrency(e.target.value))}  >
                            {currencies.map(currency=>(
                                <option value={currency.currency} key={currency.currency}>{currency.name}</option>
                            ))}
                        </select>
                    </div>
                   
            </div> 
        </div>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        currency:state.FlightsReducer.currency,
        DarkMode:state.AppReducer.DarkMode,
        dark:state.AppReducer.DarkMode
    }
}

export default connect(mapStateToProps)(SettingsComp);