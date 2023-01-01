import { combineReducers } from "redux";
import { blogReducer } from "./blogReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
});
