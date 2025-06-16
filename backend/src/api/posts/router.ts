import { Router } from "express";
import passport from "passport";
import * as handlers from "./handlers.ts";

const router = Router();

router.get("/published", handlers.getAllPublishedPosts);
router.get("/published/:postId", handlers.getPublishedPost);
router.get(
  "/published/:postId/comments",
  handlers.getPublishedPostWithComments
);

router.use((req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
});

router.post("/:postId/comments", handlers.createComment);
router.put("/comments/:commentId", handlers.updateComment);
router.delete("/comments/:commentId", handlers.deleteComment);

router.use((req, res, next) => {
  if (req.user?.role !== "AUTHOR") return void res.sendStatus(403);
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
