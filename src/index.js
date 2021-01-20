import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Loader from "./Components/Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import axios from "axios";
import Nav from './Components/Nav/Nav';

if (localStorage.getItem("token"))
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <App />
        <Loader />
      </Provider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);
