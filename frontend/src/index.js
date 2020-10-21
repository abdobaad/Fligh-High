import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom"
import Reducer from "./Reducers/Reducers";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from "redux-thunk";
import PromiseMiddleware from "redux-promise";
import Router from "./Router";


const storeWithMiddleWare = applyMiddleware(
   ReduxThunk,
   PromiseMiddleware
)(createStore);

ReactDOM.render(
 <Provider store={storeWithMiddleWare(Reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
    <Router />
  </BrowserRouter>
 </Provider>,
  document.getElementById("root")
);
