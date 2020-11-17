import React from "react";
import MovieContainer from "../MovieContainer/index";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import userEvent from "@testing-library/user-event";
import { assert } from "console";
import { TextField } from "@material-ui/core";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("MovieContainer test", () => {
  it("Renders MovieContainer and tests onClick (userEvent)", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <MovieContainer
            id={"1"}
            title={"title1"}
            posterPath={"posterpath1"}
          />
        </Router>
      </Provider>
    );
    const box = screen.getByTestId("boxen");
    userEvent.click(box);
    expect(box).toHaveBeenCalledTimes;
  });
});
