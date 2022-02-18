import io from "socket.io-client";
import { SOCKET_ON } from "../constants/actionTypes";
import { addRecievedNotification } from "./notifications";

export const startClientSocket = (user:{}) => async (dispatch:Function) => {
  try {
    const ENDPOINT = "http://localhost:3000";
    const socket = io(ENDPOINT);
    socket.on("NEWPOST", function (lastNotification) {
      console.log(lastNotification);
      dispatch(addRecievedNotification(lastNotification));
    });
    //@ts-ignore
    socket.emit("connectionTags", user.result.tags);
    dispatch({ type: SOCKET_ON, payload: socket });
  } catch (error) {
    //@ts-ignore
    console.log(error.message);
  }
};
