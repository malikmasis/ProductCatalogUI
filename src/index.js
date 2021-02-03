import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import { Provider } from "react-redux";
import axios from "axios";

import App from "./App";
import store from "./Redux/Store";
import CustomNav from './Components/Nav/CustomNav';

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.getItem("token"))
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <CustomNav />
        <App />
        <Loader />
      </Provider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);
