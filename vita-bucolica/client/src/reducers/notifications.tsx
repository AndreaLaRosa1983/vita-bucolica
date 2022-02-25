import {
  FETCH_NEW_POSTS_NOTIFICATIONS,
  ADD_RECIEVED_NOTIFICATION,
  DELETE_FROM_RECIEVED_NOTIFICATIONS,
} from "../constants/actionTypes";
import NotificationType from "../models/notification";

const notification = (state = { notifications: [] }, action: any) => {
  switch (action.type) {
    case FETCH_NEW_POSTS_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.data,
      };
    case ADD_RECIEVED_NOTIFICATION:
      if (!state.notifications.some( (n:NotificationType) => n.id === action.payload.id)){
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    }
    return {
      ...state,
    };
    case DELETE_FROM_RECIEVED_NOTIFICATIONS:
      const notificationsFilteredFromRecieved = state.notifications.filter(
        (x: any) => x.id !== action.payload
      );
      return { ...state, notifications: notificationsFilteredFromRecieved };
    default:
      return state;
  }
};
export default notification;
