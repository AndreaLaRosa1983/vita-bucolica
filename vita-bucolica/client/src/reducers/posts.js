import {
  FETCH_ALL,
  FETCH_ALL_SEARCH,
  FETCH_ALL_TAG,
  FETCH_NEW_POSTS_NOTIFICATIONS,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

const post =  (posts = [], action, newPostsNotifications = []) => {
  switch (action.type) {
    case FETCH_ALL_TAG:
      return action.payload;
    case FETCH_ALL_SEARCH:
        return action.payload;
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      return [action.payload, ...posts];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default post;