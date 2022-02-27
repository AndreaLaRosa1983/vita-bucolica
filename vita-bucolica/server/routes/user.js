import express from "express";
import { signin, signup, update, updatePassword } from "../controllers/users.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/update", update);
router.post("/updatePassword", updatePassword);

export default router;
