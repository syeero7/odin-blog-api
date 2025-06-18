import { Router } from "express";
import * as handlers from "./handlers.ts";

const router = Router();

router.post("/sign-up", handlers.signUp);
router.post("/login", handlers.login);

export default router;
