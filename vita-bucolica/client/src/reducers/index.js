import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import notifications from "./notifications";
export default combineReducers({
  posts,
  auth,
  notifications,
});
