import {
  FETCH_NEW_POSTS_NOTIFICATIONS,
  ADD_RECIEVED_NOTIFICATION,
  DELETE_FROM_RECIEVED_NOTIFICATIONS,
} from "../constants/actionTypes";

const notification = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case FETCH_NEW_POSTS_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.data,
      };
    case ADD_RECIEVED_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case DELETE_FROM_RECIEVED_NOTIFICATIONS:
      const notificationsFilteredFromRecieved = state.notifications.filter(
        (x) => x.id !== action.payload
      );
      return { ...state, notifications: notificationsFilteredFromRecieved };
    default:
      return state;
  }
};
export default notification;
