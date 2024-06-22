import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/styles.css";
import "./app/themes/dark.css"
import "./app/themes/light.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
