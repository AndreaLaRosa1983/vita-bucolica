
import {
  FETCH_ALL,
  FETCH_ALL_SEARCH,
  FETCH_ALL_TAG,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import Post from "../models/post";
const post = (state = { posts: [], numberOfPosts: 0, numberOfPostsToSee: 0, numberOfPages:0 }, action: any) => {
  switch (action.type) {
    case FETCH_ALL_TAG:
      return {
        ...state,
        posts: action.payload.data,
        numberOfPosts: action.payload.numberOfPosts,
        numberOfPostsToSee: action.payload.numberOfPostsToSee,
      };
    case FETCH_ALL_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        numberOfPages: action.payload.numberOfPages,
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post : Post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CREATE:
      return { ...state, posts: [action.payload, ...state.posts] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post: Post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post: Post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default post;
