import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./bootstrap";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { OnlineStatusProvider } from "./useOnlineStatus";

ReactDOM.render(
  <React.StrictMode>
    <OnlineStatusProvider>
      <App />
    </OnlineStatusProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
