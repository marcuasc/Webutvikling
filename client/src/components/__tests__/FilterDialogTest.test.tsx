import React from "react";
import FilterDialog from "../FilterDialog/index";
import * as filterActions from "../../redux/filter/filterActions";
import * as filterTypes from "../../redux/filter/filterTypes";
import { cleanup, fireEvent, render } from "@testing-library/react";

describe("actions", () => {
  it("should create an action", () => {
    const text = "Finish docs";
    const expectedAction = {
      type: filterTypes.OPEN_FILTER_DIALOG,
    };
    expect(filterActions.openFilterDialog()).toEqual(expectedAction);
  });
});
