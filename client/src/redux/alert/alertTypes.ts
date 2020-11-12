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
