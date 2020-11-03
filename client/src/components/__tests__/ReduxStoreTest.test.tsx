import MovieDialog from "../MovieDialog/index";
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import { openResultModal } from "../../redux/result/resultActions";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store"; //ES6 modules

// Definerer mockstore-funksjonen med thunk
const middlewares: any = [thunk];
const mockStore = configureStore(middlewares);

//Definerer initial state
const initialState = {
  search: {
    loading: false,
    results: [],
    error: "",
    query: "",
    totalPages: 1,
    currentPage: 1,
  },
  result: {
    open: false,
    loading: false,
    error: "",
    result: {
      genre: [],
      ratings: [],
      _id: "",
      title: "",
      poster_path: "",
      desc: "",
      budget: -1,
      release_date: "",
      duration: -1,
    },
  },
  filter: {
    open: false,
    filters: {},
  },
  sortBy: {
    type: "title",
    descending: true,
  },
  resultInfo: {
    open: false,
    loading: false,
    error: "",
    result: {
      genre: [],
      ratings: [],
      _id: "",
      title: "",
      poster_path: "",
      desc: "",
      budget: -1,
      release_date: "",
      duration: -1,
    },
  },
};

//Definerer store fra ininital state
const store = mockStore(initialState);

test("Dispatches correct action in redux store", () => {
  store.dispatch(openResultModal("heijegerid"));

  const actions = store.getActions();
  const expectedPayload = { type: "OPEN_RESULT_MODAL", payload: "heijegerid" };
  expect(actions).toEqual([expectedPayload]);
});
