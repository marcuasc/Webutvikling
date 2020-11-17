import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
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

const getStateFromCookies = (): UserInfo => {
  let userInStorage = localStorage.getItem("currentUser");
  if (userInStorage !== null) {
    const currentTime = new Date();
    if (JSON.parse(userInStorage).expires < currentTime.getTime()) {
      localStorage.removeItem("currentUser");
      userInStorage = null;
    }
  }
  if (userInStorage !== null) {
    return {
      loggedIn: true,
      loading: false,
      error: "",
      user: JSON.parse(userInStorage),
      viewingUser: {
        username: "",
        userID: "",
        reviews: [],
      },
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
      viewingUser: {
        username: "",
        userID: "",
        reviews: [],
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
    case FETCH_USER_REQUEST:
      return {
        ...state,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        viewingUser: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
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
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      localStorage.removeItem("currentUser");
      return {
        ...state,
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
    default:
      return state;
  }
};

export default userReducer;
