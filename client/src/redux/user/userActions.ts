import Axios from "axios";
import { Dispatch } from "redux";
import {
  UserActionTypes,
  UserObject,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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

export const userLogout = (): UserActionTypes => {
  return {
    type: USER_LOGOUT,
  };
};

export const loginUser = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(userLoginRequest());
    Axios.post("http://localhost:5000/movie", {
      username: username,
      password: password,
    })
      .then((response) => {
        const data = response.data;
        dispatch(userLoginSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(userLoginFailure(errorMsg));
      });
  };
};

export const registerUser = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(userRegisterRequest());
    Axios.post("http://localhost:5000/movie", {
      username: username,
      password: password,
    })
      .then((response) => {
        const data = response.data;
        dispatch(userRegisterSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(userRegisterFailure(errorMsg));
      });
  };
};
