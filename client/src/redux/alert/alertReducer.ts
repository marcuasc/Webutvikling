import {
  AlertActionTypes,
  AlertInfo,
  CLOSE_ALERT,
  SET_ALERT,
} from "./alertTypes";

// Uses AlertInfo interface for state.
// The initial state of the reducer is set to:
const initialState: AlertInfo = {
  open: false,
  alert: {
    type: "success",
    message: "",
  },
};

// Reducer takes in state and action and returns a state in the form of the AlertInfo interface.
const alertReducer = (
  state = initialState,
  action: AlertActionTypes
): AlertInfo => {
  // Switch an the type of action it takes in.
  // The different cases are quite self-explanetory
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
