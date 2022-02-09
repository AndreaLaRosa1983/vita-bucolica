// actions creators
// notare la doppia freccia una funzione che crea una funzione (questo ci è permesso da thunk)
// invece di ritornare l'azione la dispatchamo
import {
  FETCH_ALL,
  FETCH_ALL_TAG,
  FETCH_ALL_SEARCH,
  FETCH_NEW_POSTS_NOTIFICATIONS,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

import * as api from "../api/index.js";



export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsByTag = (tag) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsTag(tag);
    dispatch({ type: FETCH_ALL_TAG, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsSearch(search);
    dispatch({ type: FETCH_ALL_SEARCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
