import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsTag,
  getPostsSearch,
  getPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/:page", getPosts);
router.get("/post/:id", getPost);
router.get("/tag/:tag/:more", getPostsTag);
router.get("/search/:search/:more", getPostsSearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
