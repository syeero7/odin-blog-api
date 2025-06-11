import { Router } from "express";
import { registerUserPost, loginUserPost } from "./auth.handler.js";

const router = Router();

router.post("/register", registerUserPost);
router.post("/login", loginUserPost);

export default router;
