import React from "react";
import HomeIcon from "../../sources/icons/home.svg";
import SettingsIcon from "../../sources/icons/settings.svg";
import WalletIcon from "../../sources/icons/wallet.svg";
import StatisticsIcon from "../../sources/icons/analytics.svg";
import ReportsIcon from "../../sources/icons/reports.svg";
import FlightIcon from"../../sources/icons/airplane.svg";

import World from "../../sources/icons/world.svg";
import "./Side.scss";
import { useState } from "react";

const ListMenu = [
  { name: "dashboard", icon: HomeIcon, link: "/me/dashboard" },
  { name: "flights", icon: FlightIcon, link: "/me/dashboard" },
  { name: "wallet", icon: WalletIcon, link: "/me/dashboard" },
  { name: "reports", icon: ReportsIcon, link: "/me/dashboard" },
  {
    name: "statistics",
    icon: StatisticsIcon,
    link: "/me/dashboard",
  },
  {
    name: "settings",
    icon: SettingsIcon,
    link: "/me/dashboard",
  },
];

const Side = () => {
  console.log(process.env.PUBLIC_URL);
  const [activeLink, setActiveLink] = useState("flights");
  const GoToLink = (e, name) => {
    e.preventDefault();
    setActiveLink(name);
  };
  return (
    <div className="side_container">
      <div className="user">
        <div className="user-img">
          <img
            alt="me"
            src="https://coeffee.com/uploads/profilePictures/77/188177/20200327-014740.jpg"
          />
        </div>
        <div className="user-name">Abderrahim Baad</div>
        <div className="user-email">abdobaad9991@gmail.com</div>
      </div>
      <div className="menu-footer">
        <div className="menu">
          {ListMenu.map((item, i) => (
            <a
              key={"item-" + i}
              onClick={(e) => GoToLink(e, item.name)}
              href={item.link}
            >
              {item.name === activeLink ? null : <div className="added"></div>}

              <div
                className={`list-item ${
                  item.name === activeLink ? "active" : ""
                }`}
              >
                <img src={item.icon} alt={`icon-${item.name}`} />
                <span>{item.name}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="footer">
          <img src={World} alt="world map" />
        </div> 
      </div>
    </div>
  );
};

export default Side;
