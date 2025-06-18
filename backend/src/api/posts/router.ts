import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import prisma from "@/prisma-client.js";
import * as handlers from "./handlers.js";

const router = Router();

router.get("/published", handlers.getAllPublishedPosts);
router.get("/published/:postId", handlers.getPublishedPost);
router.get(
  "/published/:postId/comments",
  handlers.getPublishedPostWithComments
);

router.use(async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return void res.sendStatus(401);

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET!) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    req.user = user || undefined;

    next();
  } catch (error) {
    next(error);
  }
});

router.post("/:postId/comments", handlers.createComment);
router.put("/comments/:commentId", handlers.updateComment);
router.delete("/comments/:commentId", handlers.deleteComment);

router.use((req, res, next) => {
  if ((req.user as User | undefined)?.role !== "AUTHOR") {
    return void res.sendStatus(403);
  }
  next();
});

router.get("/", handlers.getAllPosts);
router.get("/:postId", handlers.getPostById);
router.get("/:postId/comments", handlers.getPostWithComments);
router.post("/", handlers.createPost);
router.put("/:postId", handlers.updatePost);
router.put("/:postId/status", handlers.updatePostStatus);
router.delete("/:postId", handlers.deletePost);

export default router;
