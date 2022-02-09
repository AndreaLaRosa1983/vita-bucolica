
import {
    FETCH_NEW_POSTS_NOTIFICATIONS,
  } from "../constants/actionTypes";
  
  import * as api from "../api/index.js";
  
  
  export const getLastPostsNotifications = () => async (dispatch) => {
    try {
      const user = await JSON.parse(localStorage.getItem("profile"));
      const { data } = await api.fetchLastPostsNotifications(user);
      dispatch({ type: FETCH_NEW_POSTS_NOTIFICATIONS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
