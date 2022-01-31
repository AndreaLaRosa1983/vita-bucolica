import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsTag,
  getPostsSearch,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", getPosts);
router.get("/:tag", getPostsTag);
router.get("/:search", getPostsSearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;