import {
    FETCH_NEW_POSTS_NOTIFICATIONS,
  } from "../constants/actionTypes";
  
  const notifications =  (notifications = [], action) => {
    switch (action.type) {
      case FETCH_NEW_POSTS_NOTIFICATIONS:
        return action.payload;
    default:
        return notifications;
  };
}
  export default notifications;