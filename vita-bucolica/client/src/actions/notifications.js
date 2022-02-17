import {
  FETCH_NEW_POSTS_NOTIFICATIONS,
  ADD_RECIEVED_NOTIFICATION,
  DELETE_FROM_RECIEVED_NOTIFICATIONS,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getLastPostsNotifications = () => async (dispatch) => {
  try {
    const lastAccess = await JSON.parse(
      localStorage.getItem("lastNotificationLog")
    );
    const {
      data: { data },
    } = await api.fetchLastPostsNotifications(lastAccess);
    dispatch({ type: FETCH_NEW_POSTS_NOTIFICATIONS, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const addRecievedNotification =
  (recievedNotification) => async (dispatch) => {
    try {
      const data = recievedNotification;
      dispatch({ type: ADD_RECIEVED_NOTIFICATION, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteFromRecievedNotification =
  (notificationToDeleteId) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_FROM_RECIEVED_NOTIFICATIONS,
        payload: notificationToDeleteId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
