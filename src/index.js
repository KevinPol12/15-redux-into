import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*1.) With this we have successfully connected our redux store with REACT */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
