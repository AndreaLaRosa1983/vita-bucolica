import {
  UPDATE_LAST_LOG,
  GET_LAST_NOTIFICATION_LOG,
} from "../constants/actionTypes";

import * as api from "../api/index.jsx";

export const getLastNotificationLog =
  (user: {}) => async (dispatch: Function) => {
    try {
      //@ts-ignore
      const id = user.result._id;
      const { data } = await api.getLastNotificationLog(id);
      dispatch({ type: GET_LAST_NOTIFICATION_LOG, payload: data });
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message);
    }
  };

export const updateLastLog = (log: string) => async (dispatch: Function) => {
  try {
    const { data } = await api.createLog(log);
    dispatch({ type: UPDATE_LAST_LOG, payload: { data } });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};
