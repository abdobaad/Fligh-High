import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {SignMeOut}from "../../Actions/UserActions/UserAction"
import Layout from '../../HOC/Layout';
import Loading from '../Loading/Loading';

import "./SignOut.scss"

const SignOut = (props) => {
    const history = useHistory();
    const [loading,setLoading] = useState(false)

    const SignOutUser =async () => {
    setLoading(true)
     await  props.dispatch(SignMeOut());
     history.push("/")
    }
    return (<Layout>
       <div className="sign-out_container">
        <div className="data">
        <h3>Do you want to Sign Out ?</h3>
    <button onClick={()=> SignOutUser()}>{loading ? <Loading /> : "Sign Out" }</button>
        </div>
       </div>
    </Layout>
    );
};

const mapStateToProps = state => {
    return{
        logout:state.UserReducer.logedOut
    }
}

export default connect(mapStateToProps)(SignOut);