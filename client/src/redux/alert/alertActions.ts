/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import { Alert, AlertActionTypes, CLOSE_ALERT, SET_ALERT } from "./alertTypes";

export const setAlert = (alert: Alert): AlertActionTypes => {
  return {
    type: SET_ALERT,
    payload: alert,
  };
};

export const closeAlert = (): AlertActionTypes => {
  return {
    type: CLOSE_ALERT,
  };
};
