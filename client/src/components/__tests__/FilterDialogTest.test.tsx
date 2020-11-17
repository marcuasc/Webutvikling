import React from "react";
import FilterDialog from "../FilterDialog/index";
import * as filterActions from "../../redux/filter/filterActions";
import * as filterTypes from "../../redux/filter/filterTypes";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBar from "../SearchBar";
import ReactDOM from "react-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("Redux actions", () => {
  it("should create an action for Open Dialog", () => {
    const expectedAction = {
      type: filterTypes.OPEN_FILTER_DIALOG,
    };
    expect(filterActions.openFilterDialog()).toEqual(expectedAction);
  });

  it("should create an action for close Dialog", () => {
    const expectedAction = {
      type: filterTypes.CLOSE_FILTER_DIALOG,
    };
    expect(filterActions.closeFilterDialog()).toEqual(expectedAction);
  });

  it("Dispatches setFilter action in redux store", () => {
    store.dispatch(filterActions.setFilters({}));
    const state = store.getState().filter.filters;
    const expectedPayload = {};
    expect(state).toEqual(expectedPayload);
  });
});

describe("Redux reducer", () => {
  it("state of filterdialog changes after Click", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <SearchBar />
        </Router>
      </Provider>
    );
    fireEvent.click(getByText("Filters"));
    expect(store.getState().filter.open).toEqual(true);
  });
});

describe("FilterDialog; Component tests", () => {
  it("renders FilterDialog", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <FilterDialog />
        </Router>
      </Provider>
    );
    const genres = getByText("Genres");
    expect(genres).toBeInTheDocument();
  });

  it("it renders without crashing", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <FilterDialog />
        </Router>
      </Provider>,
      element
    );
    ReactDOM.unmountComponentAtNode(element);
  });
});
