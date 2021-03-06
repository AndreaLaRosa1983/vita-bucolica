import { SOCKET_ON } from "../constants/actionTypes";

const clientSocket = (state = { clientSocket: null }, action: any) => {
  switch (action.type) {
    case SOCKET_ON:
      return action.payload;
    default:
      return state;
  }
};

export default clientSocket;
