import React,{useEffect,useState} from "react";
import HomeIcon from "../../sources/icons/home.svg";
import SettingsIcon from "../../sources/icons/settings.svg";
import LoginIcon from "../../sources/icons/sign-in.svg";
import LogoutIcon from "../../sources/icons/exit.svg";
import RegisterIcon from "../../sources/icons/sign-up.svg";
import FlightIcon from"../../sources/icons/airplane.svg";
import "./Side.scss";
import { AuthenticatedUser } from "../../Actions/UserActions/UserAction";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const AuthMenu = [
  { name: "Profile", icon: HomeIcon, link: "/profile" },
  { name: "flights", icon: FlightIcon, link: "/" },
  {
    name: "settings",
    icon: SettingsIcon,
    link: "/settings",
  },

  {name:"Sing Out",icon:LogoutIcon,link:"/sign-out"}
];

const NotAuthMenu = [
  { name: "flights", route:"flights", icon: FlightIcon, link: "/" },
  {
    name: "settings",
    route:"settings",
    icon: SettingsIcon,
    link: "/settings",
  },
  {name:"sing In", route:"sign-in",icon:LoginIcon,link:"/sign-in"},
  {name:"sing Up", route:"sign-up",icon:RegisterIcon,link:"/sign-up"}
];

const style = {
  darkColor:{backgroundColor:"#121212"},
  secondDarkColor:{},
  lightColor:{backgroundColor:"#303030"}
}

const Side = (props) => {
  const {dark} = props;
  console.log(props);
  const history = useHistory();

  const [user,setUser] = useState({});
  useEffect(() => {
      const fetchData = async () =>{
          const AuthUser =  await props.dispatch(AuthenticatedUser());
          setUser(AuthUser.payload.data);
      }
  
      fetchData();
  }, [])
  const ShowListMenu = (menu) => {
    return menu.map((item,i)=>(
      <Link
      key={"item-" + i} 
      to={item.link}

    >
      {item.link === history.location.pathname ? null : <div style={dark ?style.darkColor:null}   className="added"></div>}

      <div
   //  onClick={(e) => GoToLink(e, item.name,item.link)} 
        style={item.link === history.location.pathname ? dark ?  style.lightColor : null : null }
       
        id={dark ?`dark-item`:null }
        className={`list-item ${
          item.link === history.location.pathname ? "active" : ""
        }`}
      >
        <img src={item.icon} alt={`icon-${item.name}`} />
        <span style={dark ? {color:"#fff"} : null}>{item.name}</span>
      </div>
    </Link>
    ))
  };
  return (
  
      <div   style={dark ?style.darkColor:null} className="side_container">
            {        
              user ? 
                user.Auth ?
                    <Link to="/profile" className="user">
                      <div className="user-img">
                        <img
                          alt="me"
                          src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg"
                        />
                      </div>
                        <div className="user-name">{user.user.fullName}</div>
                        <div className="user-email">{user.user.email}</div>
                    </Link>
                  : <div style={{height:"30%"}}/> 
              : 
              <div style={{height:"30%"}} />
            }
           <div  className={`menu-footer`} >
              <div  id={dark ? "dark" :null}   className="menu">
               { ShowListMenu(user.Auth ? AuthMenu : NotAuthMenu)}
              </div>
            </div>
      </div>
   
  );
};

const mapStateToProps  = state => {
  return{
      AuthUser:state.UserReducer,
      dark:state.AppReducer.DarkMode
  }
}

export default connect(mapStateToProps)(Side);
