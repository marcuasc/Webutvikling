import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import App from "../../App";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

it("renders correctly when there are no items", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
