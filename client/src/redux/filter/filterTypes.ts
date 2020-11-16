/*

This file creates the necessary types for filter actions. 
It also creates interfaces for the different actions and combines them to a single ActionTypes type which is exported .

Also reates an interface for Filter state.

*/

export const SET_FILTERS = "SET_FILTERS";
export const OPEN_FILTER_DIALOG = "OPEN_FILTER_DIALOG";
export const CLOSE_FILTER_DIALOG = "CLOSE_FILTER_DIALOG";

export const RESET_FILTERS = "RESET_FILTERS";

export interface Filters {
  genre?: Array<string>;
  duration?: {
    gt: number;
    lt: number;
  };
  budget?: {
    gt: number;
    lt: number;
  };
}

export interface Filter {
  open: boolean;
  filters: Filters;
}

interface SetFiltersAction {
  type: typeof SET_FILTERS;
  payload: Filters;
}

interface OpenFilterDialogAction {
  type: typeof OPEN_FILTER_DIALOG;
}

interface CloseFilterDialogAction {
  type: typeof CLOSE_FILTER_DIALOG;
}

interface ResetFiltersAction {
  type: typeof RESET_FILTERS;
}

export type FilterActionTypes =
  | SetFiltersAction
  | OpenFilterDialogAction
  | CloseFilterDialogAction
  | ResetFiltersAction;
