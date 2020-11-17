import React from "react";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Backbutton from "../BackButton/index";

const store = createStore(rootReducer, applyMiddleware(thunk));

test("it renders without crashing", () => {
  const divTest = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Backbutton />
      </Router>
    </Provider>,
    divTest
  );
  ReactDOM.unmountComponentAtNode(divTest);
});
