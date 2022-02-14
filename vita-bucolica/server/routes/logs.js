import express from "express";
import {
  postLog,
  getLastNotificationLog,
} from "../controllers/logs.js";

const router = express.Router();

router.post("/", postLog);
router.get("/:user", getLastNotificationLog)
export default router;