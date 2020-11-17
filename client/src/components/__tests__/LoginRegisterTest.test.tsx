import { render, screen, waitForElement } from "@testing-library/react";
import React from "react";
import LoginRegisterContainer from "../LoginRegisterContainer/index";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import userEvent from "@testing-library/user-event";

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("LoginForm test", () => {
  it("Test that loginform renders and that inputs ar empty", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <LoginRegisterContainer type="login" />
        </Router>
      </Provider>
    );
    const inputField = getByTestId("username_input");
    expect(inputField).toHaveValue("");
  });

  it("Test that correct username is typed ", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <LoginRegisterContainer type="login" />
        </Router>
      </Provider>
    );

    const inputField = getByTestId("username_input");

    //uses userEvent for typing in a name
    userEvent.type(inputField, "Ola");

    //checks that the correct name was typed
    expect(inputField).toHaveValue("Ola");
  });
});
