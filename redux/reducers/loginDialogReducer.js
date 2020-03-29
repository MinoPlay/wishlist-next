import { LOGIN_DIALOG } from "../actionTypes";

const initialState = true;

const loginDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_DIALOG: {
      console.log("loginDialogReducer case:" + action.payload.showLoginDialog);
      return action.payload.showLoginDialog;
    }
    default: {
      console.log("loginDialogReducer default case:" + state);
      return state;
    }
  }
};

export default loginDialogReducer;
