import {
  FETCH_NEW_POSTS_NOTIFICATIONS,
  ADD_RECIEVED_NOTIFICATION,
  DELETE_FROM_RECIEVED_NOTIFICATIONS,
} from "../constants/actionTypes";

import * as api from "../api/index.jsx";
import { getFromLocalStorageOrNull } from "./utils";

export const getLastPostsNotifications = () => async (dispatch:Function) => {
  try {
    const lastAccess = getFromLocalStorageOrNull("lastNotificationLog");
    const {
      data: { data },
    } = await api.fetchLastPostsNotifications(lastAccess);
    dispatch({ type: FETCH_NEW_POSTS_NOTIFICATIONS, payload: { data } });
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log(message);
  }
};

export const addRecievedNotification =
  (recievedNotification:{}) => async (dispatch:Function) => {
    try {
      const data = recievedNotification;
      dispatch({ type: ADD_RECIEVED_NOTIFICATION, payload: data });
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      console.log(message);
    }
  };

export const deleteFromRecievedNotification =
  (notificationToDeleteId:string) => async (dispatch:Function) => {
    try {
      dispatch({
        type: DELETE_FROM_RECIEVED_NOTIFICATIONS,
        payload: notificationToDeleteId,
      });
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      console.log(message);
    }
  };
