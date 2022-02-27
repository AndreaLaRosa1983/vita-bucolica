import {
  FETCH_ALL,
  FETCH_ALL_SEARCH,
  FETCH_ALL_TAG,
  GET_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import Post from "../models/post";


const post = (
  state = {
    posts: [],
    openPost: undefined,
    numberOfPostsByTag: 0,
    numberOfPostsSeenByTag: 0,
    numberOfPostsBySearch: 0,
    numberOfPostsSeenBySearch: 0,
    numberOfPages: 0,
  },
  action: any
) => {
  switch (action.type) {
    case FETCH_ALL_TAG:
      return {
        ...state,
        posts: action.payload.data,
        numberOfPostsByTag: action.payload.numberOfPostsByTag,
        numberOfPostsSeenByTag: action.payload.numberOfPostsSeenByTag,
      };
    case FETCH_ALL_SEARCH:
      return {...state,
        posts: action.payload.data,
        numberOfPostsBySearch: action.payload.numberOfPostsBySearch,
        numberOfPostsSeenBySearch: action.payload.numberOfPostsSeenBySearch,};
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        numberOfPages: action.payload.numberOfPages,
      };
    case GET_POST:
        return {
          ...state,
          openPost: action.payload.data[0],
        };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post: Post) =>
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
