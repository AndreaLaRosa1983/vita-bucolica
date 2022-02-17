import { AUTH } from "../constants/actionTypes";
import { getLastNotificationLog } from "./logs";
import * as api from "../api/index.jsx";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
