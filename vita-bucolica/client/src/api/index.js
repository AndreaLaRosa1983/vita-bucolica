import axios from "axios";
/* const url = "https://vita-bucolica.herokuapp.com/posts"; */
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (more) => API.get(`/posts/${more}`);
export const fetchLastPostsNotifications = (user) => API.post("/notifications", user);
export const fetchPostsTag = (tag) => API.get(`/posts/tag/${tag}`);
export const fetchPostsSearch = (search) => API.get(`/posts/search/${search}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
