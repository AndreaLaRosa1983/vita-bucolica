import {
  UPDATE_LAST_LOG,
  GET_LAST_NOTIFICATION_LOG,
} from "../constants/actionTypes";

import * as api from "../api/index.jsx";

export const getLastNotificationLog = (user) => async (dispatch) => {
  try {
    const { data } = await api.getLastNotificationLog(user.result._id);
    dispatch({ type: GET_LAST_NOTIFICATION_LOG, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLastLog = (log) => async (dispatch) => {
  try {
    const { data } = await api.createLog(log);
    dispatch({ type: UPDATE_LAST_LOG, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
