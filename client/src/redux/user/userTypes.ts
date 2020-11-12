export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";

export interface UserInfo {
  loggedIn: boolean;
  loading: boolean;
  error: string;
  user: UserObject;
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
  | UserLogoutAction;
