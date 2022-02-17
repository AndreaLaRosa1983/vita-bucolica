import {
  FETCH_ALL,
  FETCH_ALL_TAG,
  FETCH_ALL_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getPosts = (page) => async (dispatch) => {
  try {
    const {
      data: { data, numberOfPages },
    } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: { data, numberOfPages } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsByTag = (tag, more) => async (dispatch) => {
  try {
    const {
      data: { data, numberOfPosts, numberOfPostsToSee },
    } = await api.fetchPostsTag(tag, more);
    dispatch({
      type: FETCH_ALL_TAG,
      payload: { data, numberOfPosts, numberOfPostsToSee },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (search, more) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsSearch(search, more);
    dispatch({ type: FETCH_ALL_SEARCH, payload: { data } });
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
