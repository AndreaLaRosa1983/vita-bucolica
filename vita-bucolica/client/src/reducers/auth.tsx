import { AUTH, LOGOUT, UPDATE_USER } from "../constants/actionTypes";

const auth = (state = { authData: null }, action: any) => {
  switch (action.type) {
    case UPDATE_USER:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default auth;
