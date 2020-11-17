/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import Axios from "axios";
import { Dispatch } from "redux";
import { setAlert } from "../alert/alertActions";
import { fetchReviews } from "../review/reviewActions";
import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
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

Axios.defaults.adapter = require("axios/lib/adapters/http");

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

const deleteUserRequest = (id: string): UserActionTypes => {
  return {
    type: DELETE_USER_REQUEST,
    payload: id,
  };
};

const deleteUserSuccess = (): UserActionTypes => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};

const deleteUserFailure = (error: string): UserActionTypes => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error,
  };
};

export const userLogout = (): UserActionTypes => {
  return {
    type: USER_LOGOUT,
  };
};

const getConfig = (token: string) => {
  return {
    headers: { Authorization: token },
  };
};

// Async action that uses axios to login user.
export const loginUser = (username: string, password: string) => {
  // Takes in username and password
  return (dispatch: Dispatch) => {
    // First dispatch userLoginRequest
    dispatch(userLoginRequest());
    // Then try to post user with axios. Sends the user object.
    return Axios.post("http://localhost:5000/user/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        // If it works
        // Dispatch userLoginSuccess with correct userObject based on response
        const userObject: UserObject = {
          username: response.data.username,
          userID: response.data.userID,
          token: response.data.token,
          expires: response.data.expires,
        };
        dispatch(userLoginSuccess(userObject));
        // Set a success alert with fitting message
        dispatch(
          setAlert({ type: "success", message: "Successfully logged in!" })
        );
      })
      .catch((error) => {
        // If it fails, dispatch userLoginFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(userLoginFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(
          setAlert({ type: "error", message: "Wrong username or password" })
        );
      });
  };
};

// Async action that uses axios to register user.
export const registerUser = (username: string, password: string) => {
  // Takes in username and password
  return (dispatch: Dispatch) => {
    // First dispatch userRegisterRequest
    dispatch(userRegisterRequest());
    // Then try to post user with axios. Sends the user object.
    return Axios.post("http://localhost:5000/user/register", {
      username: username,
      password: password,
    })
      .then((response) => {
        // If it works
        // Dispatch userRegisterSuccess with correct userObject based on response
        const userObject: UserObject = {
          username: response.data.username,
          userID: response.data.userID,
          token: response.data.token,
          expires: response.data.expires,
        };
        dispatch(userRegisterSuccess(userObject));
        // Set a success alert with fitting message
        dispatch(
          setAlert({
            type: "success",
            message: "Successfully registered user!",
          })
        );
      })
      .catch((error) => {
        // If it fails, dispatch userRegisterFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(userRegisterFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(
          setAlert({
            type: "error",
            message: "Could not register user. Username might be taken",
          })
        );
      });
  };
};

// Async action that uses axios to fetch user.
export const fetchUser = (userID: string) => {
  // Takes in userID
  return (dispatch: Dispatch) => {
    // First dispatch fetchUserRequest
    dispatch(fetchUserRequest());
    // Then try to get user with axios.
    return Axios.get("http://localhost:5000/user/" + userID)
      .then((response) => {
        // If it works
        // Dispatch fetchUserSuccess with correct viewingUser based on response
        const viewingUser: ViewingUser = {
          username: response.data.username,
          userID: response.data._id,
          reviews: response.data.reviews,
        };
        dispatch(fetchUserSuccess(viewingUser));
        // Dispatch fetchReviews such that the review state is updated with the users reviews.
        dispatch(fetchReviews("user", viewingUser.userID) as any);
      })
      .catch((error) => {
        // If it fails, dispatch fetchUserFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(fetchUserFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(setAlert({ type: "error", message: "Could not fetch user" }));
      });
  };
};

// Async action that uses axios to login user.
export const deleteUser = (userID: string, token: string) => {
  // Takes in userID and token
  return (dispatch: Dispatch) => {
    // First dispatch deleteUserRequest with userID
    dispatch(deleteUserRequest(userID));
    // Then try to delete user with axios. Sends the config object with token.
    return Axios.delete(
      "http://localhost:5000/user/" + userID,
      getConfig(token)
    )
      .then((response) => {
        // If it works
        // Dispatch deleteUserSuccess
        dispatch(deleteUserSuccess());
        // Dispatch userLogout
        dispatch(userLogout());
        // Set a success alert with fitting message
        dispatch(
          setAlert({ type: "success", message: "User successfully deleted!" })
        );
      })
      .catch((error) => {
        // If it fails, dispatch deleteUserFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(deleteUserFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(setAlert({ type: "error", message: "Could not delete user" }));
      });
  };
};
