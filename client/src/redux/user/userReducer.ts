import {
  UserActionTypes,
  UserInfo,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./userTypes";

const initialState: UserInfo = {
  loading: false,
  error: "",
  user: {
    username: "",
    userID: "",
    token: "",
  },
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserInfo => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: initialState.user,
        error: action.payload,
      };
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        user: initialState.user,
        error: action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
