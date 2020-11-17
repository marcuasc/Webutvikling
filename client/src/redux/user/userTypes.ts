export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";

export interface UserInfo {
  loggedIn: boolean;
  loading: boolean;
  error: string;
  user: UserObject;
  viewingUser: ViewingUser;
}

export interface ViewingUser {
  username: string;
  userID: string;
  reviews: Array<string>;
}

export interface UserObject {
  username: string;
  userID: string;
  token: string;
  expires: number;
}

interface UserLoginRequestAction {
  type: typeof USER_LOGIN_REQUEST;
}

interface UserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS;
  payload: UserObject;
}

interface UserLoginFailureAction {
  type: typeof USER_LOGIN_FAILURE;
  payload: string;
}

interface UserRegisterRequestAction {
  type: typeof USER_REGISTER_REQUEST;
}

interface UserRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS;
  payload: UserObject;
}

interface UserRegisterFailureAction {
  type: typeof USER_REGISTER_FAILURE;
  payload: string;
}

interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
}

interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: ViewingUser;
}

interface FetchUserFailureAction {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
}

interface DeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST;
  payload: string;
}

interface DeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS;
}

interface DeleteUserFailureAction {
  type: typeof DELETE_USER_FAILURE;
  payload: string;
}

interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

export type UserActionTypes =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction
  | UserRegisterRequestAction
  | UserRegisterSuccessAction
  | UserRegisterFailureAction
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction
  | UserLogoutAction;
