import {
    FETCH_NEW_POSTS_NOTIFICATIONS,
    ADD_RECIEVED_NOTIFICATION,
  } from "../constants/actionTypes";
  
  const notification =  (state = { notifications: [] }, action) => {
    switch (action.type) {
      case FETCH_NEW_POSTS_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload.data
        };
      case ADD_RECIEVED_NOTIFICATION:
        // mi arrivano due notifiche da due diverse room, perchè??? 
        return { ...state, notifications: [action.payload, ...state.notifications]};
    default:
        return state;
  };
}
  export default notification;