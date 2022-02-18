import {
  GET_LAST_NOTIFICATION_LOG,
  UPDATE_LAST_LOG,
} from "../constants/actionTypes";

const log = (state = { logs: [] }, action: any) => {
  switch (action.type) {
    case GET_LAST_NOTIFICATION_LOG:
      localStorage.setItem(
        "lastNotificationLog",
        JSON.stringify({ ...action?.payload?.data[0] })
      );
      return {
        ...state,
        lastNotificationLog: action.payload.lastNotificationLog,
      };
    case UPDATE_LAST_LOG:
      localStorage.setItem(
        "lastNotificationLog",
        JSON.stringify({ ...action?.payload })
      );
      return log;
    default:
      return log;
  }
};

export default log;
