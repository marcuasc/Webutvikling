import React from "react";
import { render } from "@testing-library/react";
import App from "../../App";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

test("renders Search-button", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const SearchButton = getByText("Search");
  expect(SearchButton).toBeInTheDocument();
});

test("it renders without crashing", () => {
  const divTest = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    divTest
  );
  ReactDOM.unmountComponentAtNode(divTest);
});
