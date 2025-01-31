import { Router } from "express";

import {
  createPost,
  updatePostStatusPut,
  deletePost,
  updatePostPut,
  getPost,
  getPublishedPost,
  getPostWithComments,
  getPublishedPostWithComments,
  getAllPosts,
  getAllPublishedPosts,
  createCommentPost,
  updateCommentPut,
  deleteComment,
} from "../controllers/post.js";

const router = Router();

router.get("/published", getAllPublishedPosts);
router.get("/published/:postId", getPublishedPost);
router.get("/published/:postId/comments", getPublishedPostWithComments);
router.get("/", getAllPosts);
router.get("/:postId", getPost);
router.get("/:postId/comments", getPostWithComments);

router.post("/", createPost);
router.post("/:postId/comments", createCommentPost);

router.put("/:postId", updatePostPut);
router.put("/:postId/status", updatePostStatusPut);
router.put("/comments/:commentId", updateCommentPut);

router.delete("/:postId", deletePost);
router.delete("/comments/:commentId", deleteComment);

export default router;
