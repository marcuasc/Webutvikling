import React from "react";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBar from "../SearchBar/index";

const store = createStore(rootReducer, applyMiddleware(thunk));

test("it renders without crashing", () => {
  const element = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <SearchBar />
      </Router>
    </Provider>,
    element
  );
  ReactDOM.unmountComponentAtNode(element);
});
