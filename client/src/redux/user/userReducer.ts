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
import Cookies from "universal-cookie";

const getStateFromCookies = (): UserInfo => {
  const cookies = new Cookies();
  const userInCookie = cookies.get("currentUser");
  if (userInCookie !== undefined) {
    return {
      loggedIn: true,
      loading: false,
      error: "",
      user: userInCookie,
    };
  } else {
    return {
      loggedIn: false,
      loading: false,
      error: "",
      user: {
        username: "",
        userID: "",
        token: "",
        expires: 0,
      },
    };
  }
};

const initialState: UserInfo = getStateFromCookies();

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
        loggedIn: true,
        loading: false,
        user: action.payload,
        error: "",
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
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
        loggedIn: true,
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
