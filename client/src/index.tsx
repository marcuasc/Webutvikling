import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Strict mode is turned off in the finalized project as it had one issue with material UI, specifically the Dialogs components.
// We researched this quite thoroughly and realized this has in practice no effect on the quality on the project.
// We have developed our application with strict mode on the help us evade bad practices and errors.

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
