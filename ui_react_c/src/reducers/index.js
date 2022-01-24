import { combineReducers } from "redux";
import loggedReducer from "./isLogged";
import counterReducer from "./counter";
import authReducer from "./authReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  logged: loggedReducer,
  auth: authReducer,
});

export default allReducers;
