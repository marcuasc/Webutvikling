import React from "react";
import { render } from "@testing-library/react";
import App from "../../App";
import ReactDOM from "react-dom";

test("renders Search-button", () => {
  const { getByText } = render(<App />);
  const SearchButton = getByText("Search");
  expect(SearchButton).toBeInTheDocument();
});

test("it renders without crashing", () => {
  const element = document.createElement("div");
  ReactDOM.render(<App />, element);
  ReactDOM.unmountComponentAtNode(element);
});
