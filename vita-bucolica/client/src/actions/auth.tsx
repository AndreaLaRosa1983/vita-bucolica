import { AUTH } from "../constants/actionTypes";
import { getLastNotificationLog } from "./logs";
import * as api from "../api/index.jsx";

export const signin = (formData:{}, navigate:Function) => async (dispatch:Function) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData:{}, navigate:Function) => async (dispatch:Function) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    //@ts-ignore//
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
