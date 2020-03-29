import { LOGIN } from "../actionTypes";

const initialState = "";

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log("loginReducer case:" + action.payload.loginId);
      return action.payload.loginId;
    }
    default: {
      console.log("loginReducer default case:" + state);
      return state;
    }
  }
};

export default loginReducer;
