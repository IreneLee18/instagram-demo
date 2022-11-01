import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/all.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { DataProvider } from "./utils/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
