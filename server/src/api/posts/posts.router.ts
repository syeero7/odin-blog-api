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
} from "./posts.handler.js";
import verifyAuthor from "../../middleware/verify-author.js";

const router = Router();

router.get("/published", getAllPublishedPosts);
router.get("/published/:postId", getPublishedPost);
router.get("/published/:postId/comments", getPublishedPostWithComments);
router.get("/", verifyAuthor, getAllPosts);
router.get("/:postId", verifyAuthor, getPost);
router.get("/:postId/comments", verifyAuthor, getPostWithComments);

router.post("/", verifyAuthor, createPost);
router.post("/:postId/comments", createCommentPost);

router.put("/:postId", verifyAuthor, updatePostPut);
router.put("/:postId/status", verifyAuthor, updatePostStatusPut);
router.put("/comments/:commentId", updateCommentPut);

router.delete("/:postId", verifyAuthor, deletePost);
router.delete("/comments/:commentId", deleteComment);

export default router;
