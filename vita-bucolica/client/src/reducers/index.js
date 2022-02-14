import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import notifications from "./notifications";
import log from "./logs";
import socket from "./socket";

export default combineReducers({
  posts,
  auth,
  notifications,
  log,
  socket,
});
