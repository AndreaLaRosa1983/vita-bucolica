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

export const fetchPosts = (page) => API.get(`/posts/${page}`);
export const fetchLastPostsNotifications = (lastAccess) => API.post("/notifications", lastAccess);
export const fetchPostsTag = (tag, more) => API.get(`/posts/tag/${tag}/${more}`);
export const fetchPostsSearch = (search, more) => API.get(`/posts/search/${search}/${more}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const createLog = (log) => API.post("/logs", log);
export const getLastNotificationLog = (user) => API.get(`/logs/${user}`); 
