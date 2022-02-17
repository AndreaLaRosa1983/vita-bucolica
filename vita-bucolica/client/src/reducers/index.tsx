import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import notifications from "./notifications";
import logs from "./logs";
import socket from "./socket";

export const rootReducer = combineReducers({
  posts:  posts,
  auth:  auth,
  notifications:  notifications,
  logs:  logs,
  socket:  socket,
});

export type RootState = ReturnType<typeof rootReducer>
