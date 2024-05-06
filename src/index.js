import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
/**This ./store import is a temporal way to just run the code on import for testing */
import "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
