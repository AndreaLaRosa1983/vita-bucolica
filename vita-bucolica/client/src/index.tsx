import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.scss";
import { Helmet } from "react-helmet";
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  
    <Provider store={store} >
      <Helmet htmlAttributes={{ lang: "it" }}/ >
      <App />
    </Provider>
  ,
  document.getElementById("root")
);
