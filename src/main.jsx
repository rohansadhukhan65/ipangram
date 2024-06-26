import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { AppProvider } from "./Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </React.StrictMode>
);
