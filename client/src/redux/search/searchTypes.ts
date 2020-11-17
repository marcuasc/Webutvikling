/*

This file creates the necessary types for search actions. 
It also creates interfaces for the different actions and combines them to a single ActionTypes type which is exported .

Also creates an interface for Search state.

*/

export const FETCH_RESULTS_REQUEST = "FETCH_RESULTS_REQUEST";
export const FETCH_RESULTS_SUCCESS = "FETCH_RESULTS_SUCCESS";
export const FETCH_RESULTS_FAILURE = "FETCH_RESULTS_FAILURE";

export const UPDATE_SEARCH_QUERY = "UDATE_SEARCH_QUERY";
export const UPDATE_TOTAL_PAGES = "UPDATE_TOTAL_PAGES";
export const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";

export const RESET_SEARCH = "RESET_SEARCH";

interface FetchResultsRequestAction {
  type: typeof FETCH_RESULTS_REQUEST;
}

interface FetchResultsSuccessAction {
  type: typeof FETCH_RESULTS_SUCCESS;
  payload: Array<any>;
}

interface FetchResultsFailureAction {
  type: typeof FETCH_RESULTS_FAILURE;
  payload: string;
}

interface UpdateSearchQueryAction {
  type: typeof UPDATE_SEARCH_QUERY;
  payload: string;
}

interface UpdateTotalPages {
  type: typeof UPDATE_TOTAL_PAGES;
  payload: number;
}

interface UpdateCurrentPage {
  type: typeof UPDATE_CURRENT_PAGE;
  payload: number;
}

interface ResetSearchAction {
  type: typeof RESET_SEARCH;
}

export interface Search {
  loading: Boolean;
  results: Array<any>;
  error: string;
  query: string;
  totalPages: number;
  currentPage: number;
}

export type SearchActionTypes =
  | FetchResultsRequestAction
  | FetchResultsSuccessAction
  | FetchResultsFailureAction
  | UpdateSearchQueryAction
  | UpdateCurrentPage
  | UpdateTotalPages
  | ResetSearchAction;
