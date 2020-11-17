import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../../redux/rootReducer";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import MovieContainer from "../../MovieContainer";

//creates a store for the provider
const store = createStore(rootReducer, applyMiddleware(thunk));

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <MovieContainer
            id={"1"}
            title={"title1"}
            posterPath={"posterpath1"}
          />
        </Router>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
