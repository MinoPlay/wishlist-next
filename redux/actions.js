import { LOGIN, LOGIN_DIALOG } from "./actionTypes";

export const loginAction = loginId => ({
  type: LOGIN,
  payload: { loginId }
});

export const loginDialogAction = showLoginDialog => ({
  type: LOGIN_DIALOG,
  payload: { showLoginDialog }
});
