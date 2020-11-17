/*

This file creates the necessary types for Alert actions. 
It also creates interfaces for the different actions and combines them to a single ActionTypes type which is exported.

Also creates an interface for AlertInfo state.

*/

export const SET_ALERT = "SET_ALERT";
export const CLOSE_ALERT = "CLOSE_ALERT";

export interface Alert {
  type: "error" | "warning" | "info" | "success";
  message: string;
}

export interface AlertInfo {
  open: boolean;
  alert: Alert;
}

interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: Alert;
}

interface CloseAlertAction {
  type: typeof CLOSE_ALERT;
}

export type AlertActionTypes = SetAlertAction | CloseAlertAction;
