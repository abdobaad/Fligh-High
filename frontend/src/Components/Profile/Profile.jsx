import React,{useEffect} from 'react';
import { useState } from 'react';
import {connect} from "react-redux";
import { AuthenticatedUser } from '../../Actions/UserActions/UserAction';
import Layout from '../../HOC/Layout';
import Side from '../Side/Side';
import  './Profile.scss';

const Profile = (props) => {
   const [user,setUser] = useState({});
    useEffect(() => {
        const fetchData = async () =>{
            const AuthUser =  await props.dispatch(AuthenticatedUser());
            setUser(AuthUser.payload.data);
        }
    
        fetchData();
    }, [])

    return( 
      <Layout>
           <div className="profile-component">
      
      { user ? 
        user.Auth ?
           <div className="profile-container">
              
               <div className="user-data">
                   <div className="user-img">
                       <img src={user.user.avatar} alt="img" />
                   </div>
                   <div className="user-info">
                       <div className="name">{user.user.fullName}</div>
                       <div className="email">{user.user.email}</div>
                   </div>
               </div>
           </div>
       : null 
   :null}
    </div>
      </Layout>
    )
    
};

const mapStateToProps  = state => {
    return{
        AuthUser:state.UserReducer
    }
}

export default connect(mapStateToProps)(Profile);