import { combineReducers } from "redux";
import loginDialogReducer from "./loginDialogReducer";
import loginReducer from "./loginReducer";

export default combineReducers({ loginReducer, loginDialogReducer });
