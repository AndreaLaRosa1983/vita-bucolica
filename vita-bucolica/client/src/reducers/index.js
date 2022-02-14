import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import notifications from "./notifications";
import logs from "./logs";
import socket from "./socket";

export default combineReducers({
  posts,
  auth,
  notifications,
  logs,
  socket,
});
