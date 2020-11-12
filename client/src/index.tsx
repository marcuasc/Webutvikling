import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

// Strict mode is turned off in the finalized project as it had one issue with material UI, specifically the Dialogs components.
// We researched this quite thoroughly and realized this has in practice no effect on the quality on the project.
// We have developed our application with strict mode on the help us evade bad practices and errors.

ReactDOM.render(
  // Wraps the entire application in the react-redux provider so that every component can access the store.
  // Provider is initialized with the redux store from the redux folder.
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
