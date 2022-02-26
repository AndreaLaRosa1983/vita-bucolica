import { AUTH, UPDATE_USER } from "../constants/actionTypes";
import { getLastNotificationLog } from "./logs";
import * as api from "../api/index.jsx";
import {  getUserCookie } from "./utils";


export const signin = (formData:{}, navigate:Function) => async (dispatch:Function) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    const user = getUserCookie();
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
    const user = getUserCookie();
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log(message);
  }
};

export const updateUser = (formData:{}, navigate:Function) => async (dispatch:Function) => {
  try {
    const { data } = await api.updateUser(formData);
    dispatch({ type: UPDATE_USER, data });
    const user = getUserCookie();
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log(message);
  }
};

export const changePassword = (formData:{}, navigate:Function) => async (dispatch:Function) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: UPDATE_USER, data });
    const user = getUserCookie();
    dispatch(getLastNotificationLog(user));
    navigate("/");
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log(message);
  }
};
