import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/styles.css";
import "./app/themes/dark.css"
import "./app/themes/light.css"
import { Provider } from "react-redux";
import store from "./store/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>
);
