import {
    DELETE_NOTIFICATION_AFTER_CLICK,
    FETCH_NEW_POSTS_NOTIFICATIONS,
  } from "../constants/actionTypes";
  
  const notifications =  (notifications = [], action) => {
    switch (action.type) {
      case FETCH_NEW_POSTS_NOTIFICATIONS:
        return action.payload;
/*       case DELETE_NOTIFICATION_AFTER_CLICK:
          return notifications.filter((notification) =>
          notification._id !== action.payload.id
        );; */
    default:
        return notifications;
  };
}
  export default notifications;