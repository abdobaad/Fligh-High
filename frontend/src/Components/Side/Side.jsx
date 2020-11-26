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
  { name: "flights", icon: FlightIcon, link: "/" },
  {
    name: "settings",
    icon: SettingsIcon,
    link: "/settings",
  },
  { name: "Profile", icon: HomeIcon, link: "/profile" },
  {name:"Sing Out",icon:LogoutIcon,link:"/sign-out"}
];

const NotAuthMenu = [
  { name: "flights", route:"flights", icon: FlightIcon, link: "/" },
  {
    name: "settings",
  
    icon: SettingsIcon,
    link: "/settings",
  },
  {name:"sing In",icon:LoginIcon,link:"/sign-in"},
  {name:"sing Up",icon:RegisterIcon,link:"/sign-up"}
];

const style = {
  darkColor:{backgroundColor:"#121212"},
  secondDarkColor:{},
  lightColor:{backgroundColor:"#303030"}
}

const Side = (props) => {
  const {dark} = props;
  const history = useHistory();
  const [active,setActive] = useState(window.location.pathname);
  const [isAuth,setIsAuth] = useState(false);
  const [user,setUser] = useState({});
  useEffect(() => {
      const fetchData = async () =>{
          const AuthUser =  await props.dispatch(AuthenticatedUser());
          if(AuthUser.payload.data.Auth === true){
            setIsAuth(true) 
          }else{
            setIsAuth(false)
          }
          setUser(AuthUser.payload.data);
      }
  
      fetchData();
  }, []);
  const ShowListMenu =  (menu) => {
    return menu.map((item,i)=>(
      <Link
        key={"item-" + i} 
        to={item.link}
       
        >
        {item.link === active ? null : <div style={dark ?style.darkColor:null}   className="added"></div>}
        <div
          style={item.link === active ? dark ?  style.lightColor : null : null }
          id={dark ?`dark-item`:null }
          className={`list-item ${item.link === active ? "active" : ""}`}>
            <img src={item.icon} alt={`icon-${item.name}`} />
            <span style={dark ? {color:"#fff"} : null}>{item.name}</span>
        </div>
    </Link>
    ))
  };
  console.log(user);
  return (
  
      <div   style={dark ?style.darkColor:null} className="side_container">
            {        
              user ? 
              user.Auth ?
               <>
                    <Link to="/profile" className="user">
                      <div className="user-img">
                        <img
                          alt="me"
                          src={user.user.avatar}
                        />
                      </div>
                        <div className="user-name">{user.user.fullName}</div>
                        <div className="user-email">{user.user.email}</div>
                    </Link>
                    <div  className={`menu-footer`} >
                        <div  id={dark ? "dark" :null}   className="menu">
                        {ShowListMenu(AuthMenu)}
                        </div>
                    </div>
              </>
                  :
                  <>
                   <div style={{height:"30%"}}/> 
                   <div  className={`menu-footer`} >
                        <div  id={dark ? "dark" :null}   className="menu">
                        {ShowListMenu(NotAuthMenu)}
                        </div>
                    </div>
                 </>
              :
              <div style={{height:"30%"}}/>  
            }    
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
