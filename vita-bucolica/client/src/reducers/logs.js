import {
    GET_LAST_NOTIFICATION_LOG,
    CREATE_LOG,
  } from "../constants/actionTypes";
  
  const logs =  (state = { logs: [] }, action) => {
    switch (action.type) {
      case GET_LAST_NOTIFICATION_LOG:
        localStorage.setItem("lastNotificationLog", JSON.stringify({ ...action?.payload?.data[0] }));
        return {
          ...state,
          lastNotificationLog: action.payload.lastNotificationLog,
        };
      case CREATE_LOG:
        return { ...state, posts: [action.payload, ...state.logs] };
      default:
        return logs;
    }
  };
  
  export default logs;