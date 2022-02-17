import express from "express";
import { getLastPostsNotifications } from "../controllers/notifications.js";

const router = express.Router();

router.post("/", getLastPostsNotifications);

export default router;
