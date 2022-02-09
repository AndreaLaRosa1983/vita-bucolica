
import {
    FETCH_NEW_POSTS_NOTIFICATIONS,
  } from "../constants/actionTypes";
  
  import * as api from "../api/index.js";
  
  
  export const getLastPostsNotifications = () => async (dispatch) => {
    try {
      const user = await JSON.parse(localStorage.getItem("profile"));
      console.log({userglp:user})
      const { data } = await api.fetchLastPostsNotifications(user);
      console.log({dataglp:data});
      dispatch({ type: FETCH_NEW_POSTS_NOTIFICATIONS, payload: data });
      console.log({dataglp:data});
    } catch (error) {
      console.log(error.message);
    }
  };