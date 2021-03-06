import {
  FETCH_ALL,
  FETCH_ALL_TAG,
  FETCH_ALL_SEARCH,
  GET_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api/index.jsx";
import { getUserCookie } from "./utils";

export const getPosts = (page: number) => async (dispatch: Function) => {
  try {
    const {
      data: { data, numberOfPages },
    } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: { data, numberOfPages } });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

export const getPost = (id: string) => async (dispatch: Function) => {
  try {
    const {
      data: { data },
    } = await api.getPost(id);
    dispatch({ type: GET_POST, payload: { data } });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

export const getPostsByTag =
  (tag: string, more: number) => async (dispatch: Function) => {
    try {
      const {
        data: { data, numberOfPostsByTag, numberOfPostsSeenByTag },
      } = await api.fetchPostsTag(tag, more);
      dispatch({
        type: FETCH_ALL_TAG,
        payload: { data, numberOfPostsByTag, numberOfPostsSeenByTag },
      });
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message);
    }
  };

export const getPostsBySearch =
  (search: string, more: number) => async (dispatch: Function) => {
    try {
      const {
        data: { data, numberOfPostsBySearch, numberOfPostsSeenBySearch },
      } = await api.fetchPostsSearch(search, more);
      dispatch({
        type: FETCH_ALL_SEARCH,
        payload: { data, numberOfPostsBySearch, numberOfPostsSeenBySearch },
      });
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message);
    }
  };

export const createPost = (post: {}) => async (dispatch: Function) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

export const updatePost =
  (id: string, post: {}) => async (dispatch: Function) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message);
    }
  };

export const likePost = (id: string) => async (dispatch: Function) => {
  const user = getUserCookie();
  try {
    //@ts-ignore
    const { data } = await api.likePost(id, user.token);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};

export const deletePost = (id: string) => async (dispatch: Function) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
};
