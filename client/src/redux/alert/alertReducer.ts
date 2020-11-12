import {
  AlertActionTypes,
  AlertInfo,
  CLOSE_ALERT,
  SET_ALERT,
} from "./alertTypes";

const initialState: AlertInfo = {
  open: false,
  alert: {
    type: "success",
    message: "",
  },
};

const alertReducer = (
  state = initialState,
  action: AlertActionTypes
): AlertInfo => {
  switch (action.type) {
    case SET_ALERT:
      return {
        open: true,
        alert: action.payload,
      };
    case CLOSE_ALERT:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
