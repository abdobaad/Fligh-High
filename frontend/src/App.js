import React from "react";
import Side from "./Components/Side/Side";
import Main from "./Components/Main/Main";

import "./App.scss";

const App = () => {
  return (
    <div className="app_container">
      <Side />
      <Main />
    </div>
  );
};

export default App;
