import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import thunk from "redux-thunk";
import "../../index";

const store = createStore(rootReducer, applyMiddleware(thunk));

// mocks react-dom and its render method

jest.mock("react-dom", () => ({ render: jest.fn() }));

test("renders with root div", () => {
  //creates a div and appends it to the document body
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  require("../../index");

  //checks that the element with id = root
  expect(ReactDOM.render).toBeInTheDocument;
});
