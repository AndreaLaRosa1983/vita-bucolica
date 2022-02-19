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
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log(message);
  }
};

export const signup = (formData:{}, navigate:Function) => async (dispatch:Function) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log(message);
  }
};
