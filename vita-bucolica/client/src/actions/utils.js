
import {
    FETCH_NEW_POSTS_NOTIFICATIONS,
    CREATE_LOG,
    GET_LAST_NOTIFICATION_LOG,
    ADD_RECIEVED_NOTIFICATION,
  } from "../constants/actionTypes";
  
  import * as api from "../api/index.js";
  
  
  export const getLastPostsNotifications = () => async (dispatch) => {
    try {
      const lastAccess = await JSON.parse(localStorage.getItem("lastNotificationLog"));
      const {data: { data }} = await api.fetchLastPostsNotifications(lastAccess);
      dispatch({ type: FETCH_NEW_POSTS_NOTIFICATIONS, payload: { data }  });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const addRecievedNotification = (recievedNotification) => async (dispatch) => {
    try {
      const data = recievedNotification;
      dispatch({ type: ADD_RECIEVED_NOTIFICATION, payload: data});
    } catch (error){
      console.log(error.message);
    }
  }


  export const createLog = (log) => async (dispatch) => {
    try {
      const { data } = await api.createLog(log);
      dispatch({ type: CREATE_LOG, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  }

  export const getLastNotificationLog = (user) => async (dispatch) => {
    try {
      const { data } = await api.getLastNotificationLog(user.result._id);
      dispatch({ type: GET_LAST_NOTIFICATION_LOG, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  }