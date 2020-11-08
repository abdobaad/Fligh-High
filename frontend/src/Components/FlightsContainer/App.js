import React,{useEffect} from "react";

import {connect} from "react-redux";

import Side from "../Side/Side";
import Main from "../Main/Main";
import Layout from "../../HOC/Layout"
import "./App.scss";
import { AuthenticatedUser } from "../../Actions/UserActions/UserAction";



const App = props => {
 
  useEffect(() => {
    const fetchData = async () =>{
     await props.dispatch(AuthenticatedUser());
    }

    fetchData();
}, [])
  return (
 
      <Layout>
       <Main />
      </Layout>
    

  );
};

const mapStateToProps = state => {
   return{
     AuthUser : state.UserReducer.AuthUser
   }
}

export default connect(mapStateToProps)(App);
