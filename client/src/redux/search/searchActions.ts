/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import Axios from "axios";
import qs from "qs";
import { Dispatch } from "redux";
import { ParamsInterface } from "../../interfaces/ParamsInterface";
import { setAlert } from "../alert/alertActions";
import {
  FETCH_RESULTS_FAILURE,
  FETCH_RESULTS_REQUEST,
  FETCH_RESULTS_SUCCESS,
  RESET_SEARCH,
  SearchActionTypes,
  UPDATE_CURRENT_PAGE,
  UPDATE_SEARCH_QUERY,
  UPDATE_TOTAL_PAGES,
} from "./searchTypes";

const fetchResultsRequest = (): SearchActionTypes => {
  return {
    type: FETCH_RESULTS_REQUEST,
  };
};

const fetchResultsSuccess = (Results: Array<any>): SearchActionTypes => {
  return {
    type: FETCH_RESULTS_SUCCESS,
    payload: Results,
  };
};

const fetchResultsFailure = (error: string): SearchActionTypes => {
  return {
    type: FETCH_RESULTS_FAILURE,
    payload: error,
  };
};

export const updateSearchQuery = (query: string): SearchActionTypes => {
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: query,
  };
};

export const updateTotalPages = (page: number): SearchActionTypes => {
  return {
    type: UPDATE_TOTAL_PAGES,
    payload: page,
  };
};

export const updateCurrentPage = (page: number): SearchActionTypes => {
  return {
    type: UPDATE_CURRENT_PAGE,
    payload: page,
  };
};

export const resetSearch = (): SearchActionTypes => {
  return {
    type: RESET_SEARCH,
  };
};

// Async action that uses axios to fetch results.
export const fetchResults = (params: ParamsInterface) => {
  // Takes in params on the form of ParamsInterface
  return (dispatch: Dispatch) => {
    // First, dispatch a fetchResultsRequest
    dispatch(fetchResultsRequest());
    // Then, try to get on /movie with params serialized by qs.
    Axios.get("http://localhost:5000/movie", {
      params: params,
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    })
      .then((response) => {
        // If it works, extract the data from the response, dispatch ResultsSuccess with the movies as input, and dispatch updateTotalPages with the totalPages
        const data = response.data;
        dispatch(fetchResultsSuccess(data.movies));
        dispatch(updateTotalPages(data.totalPages));
      })
      .catch((error) => {
        // If it fails, dispatch ResultsFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(fetchResultsFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(
          setAlert({
            type: "error",
            message: "Something went wrong with your search",
          })
        );
      });
  };
};
