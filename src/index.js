import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
/**This ./store import is a temporal way to just run the code on import for testing */
import store from "./store";

store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({
  type: "customer/createCustomer",
  payload: {
    fullName: "Kevin",
    nationalID: "0105",
    createdAt: new Date().toISOString(),
  },
});
console.log(store.getState());
/*This code above is just for testing if the refactored code under this structure
continues to work */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
