import {
  FETCH_NEW_POSTS_NOTIFICATIONS,
  ADD_RECIEVED_NOTIFICATION,
  DELETE_FROM_RECIEVED_NOTIFICATIONS,
} from "../constants/actionTypes";

import * as api from "../api/index.jsx";

export const getLastPostsNotifications = () => async (dispatch:Function) => {
  try {
    //@ts-ignore
    const lastAccess = await JSON.parse(localStorage.getItem("lastNotificationLog")
    );
    const {
      data: { data },
    } = await api.fetchLastPostsNotifications(lastAccess);
    dispatch({ type: FETCH_NEW_POSTS_NOTIFICATIONS, payload: { data } });
  } catch (error) {
    //@ts-ignore
    console.log(error.message);
  }
};

export const addRecievedNotification =
  (recievedNotification:{}) => async (dispatch:Function) => {
    try {
      const data = recievedNotification;
      dispatch({ type: ADD_RECIEVED_NOTIFICATION, payload: data });
    } catch (error) {
      //@ts-ignore
      console.log(error.message);
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
      //@ts-ignore
      console.log(error.message);
    }
  };
