/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import {
  CLOSE_FILTER_DIALOG,
  FilterActionTypes,
  Filters,
  OPEN_FILTER_DIALOG,
  RESET_FILTERS,
  SET_FILTERS,
} from "./filterTypes";

export const setFilters = (filters: Filters): FilterActionTypes => {
  return {
    type: SET_FILTERS,
    payload: filters,
  };
};

export const openFilterDialog = (): FilterActionTypes => {
  return {
    type: OPEN_FILTER_DIALOG,
  };
};

export const closeFilterDialog = (): FilterActionTypes => {
  return {
    type: CLOSE_FILTER_DIALOG,
  };
};

export const resetFilters = (): FilterActionTypes => {
  return {
    type: RESET_FILTERS,
  };
};
