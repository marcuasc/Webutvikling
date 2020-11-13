import Axios from "axios";
import { Dispatch } from "redux";
import { closeAlert, setAlert } from "../alert/alertActions";
import { fetchReviews } from "../review/reviewActions";
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UserActionTypes,
  UserObject,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  ViewingUser,
} from "./userTypes";

const userLoginRequest = (): UserActionTypes => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

const userLoginSuccess = (userObject: UserObject): UserActionTypes => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userObject,
  };
};

const userLoginFailure = (error: string): UserActionTypes => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
  };
};

const userRegisterRequest = (): UserActionTypes => {
  return {
    type: USER_REGISTER_REQUEST,
  };
};

const userRegisterSuccess = (userObject: UserObject): UserActionTypes => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: userObject,
  };
};

const userRegisterFailure = (error: string): UserActionTypes => {
  return {
    type: USER_REGISTER_FAILURE,
    payload: error,
  };
};
const fetchUserRequest = (): UserActionTypes => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (viewingUser: ViewingUser): UserActionTypes => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: viewingUser,
  };
};

const fetchUserFailure = (error: string): UserActionTypes => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const userLogout = (): UserActionTypes => {
  return {
    type: USER_LOGOUT,
  };
};

export const loginUser = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(userLoginRequest());
    Axios.post("http://localhost:5000/user/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        const userObject: UserObject = {
          username: response.data.username,
          userID: response.data.userID,
          token: response.data.token,
          expires: response.data.expires,
        };
        dispatch(
          setAlert({ type: "success", message: "Successfully logged in!" })
        );
        dispatch(userLoginSuccess(userObject));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(setAlert({ type: "error", message: errorMsg }));
        dispatch(userLoginFailure(errorMsg));
      });
  };
};

export const registerUser = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(userRegisterRequest());
    Axios.post("http://localhost:5000/user/register", {
      username: username,
      password: password,
    })
      .then((response) => {
        const userObject: UserObject = {
          username: response.data.username,
          userID: response.data.userID,
          token: response.data.token,
          expires: response.data.expires,
        };
        dispatch(
          setAlert({
            type: "success",
            message: "Successfully registered user!",
          })
        );
        dispatch(userRegisterSuccess(userObject));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(setAlert({ type: "error", message: errorMsg }));
        dispatch(userRegisterFailure(errorMsg));
      });
  };
};

export const fetchUser = (userID: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUserRequest());
    Axios.get("http://localhost:5000/user/" + userID)
      .then((response) => {
        const viewingUser: ViewingUser = {
          username: response.data.username,
          userID: response.data._id,
          reviews: response.data.reviews,
        };
        dispatch(fetchUserSuccess(viewingUser));
        dispatch(fetchReviews("user", viewingUser.userID) as any);
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(setAlert({ type: "error", message: errorMsg }));
        dispatch(fetchUserFailure(errorMsg));
      });
  };
};
