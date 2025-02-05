import { validationResult } from "express-validator";

import { validateComment, validatePost } from "../utils/validation.js";
import * as db from "../utils/queries.js";

export const createPost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { title, content, createdAt, isPublished } = req.body;

    await db.createPost(title, content, createdAt, isPublished, req.user.id);
    res.sendStatus(201);
  },
];

export const updatePostStatusPut = async (req, res) => {
  await db.updatePostPublishedStatus(req.body.isPublished, req.params.postId);
  res.sendStatus(204);
};

export const deletePost = async (req, res) => {
  await db.deletePost(req.params.postId);
  res.sendStatus(204);
};

export const updatePostPut = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { title, content, createdAt } = req.body;

    await db.updatePost(req.params.postId, title, content, createdAt);
    res.sendStatus(204);
  },
];

export const getPost = async (req, res) => {
  const post = await db.getPostById(req.params.postId);
  res.json({ post });
};

export const getPublishedPost = async (req, res) => {
  const post = await db.getPublishedPostById(req.params.postId);
  res.json({ post });
};

export const getPostWithComments = async (req, res) => {
  const post = await db.getPostById(req.params.postId, true);
  res.json({ post });
};

export const getPublishedPostWithComments = async (req, res) => {
  const post = await db.getPublishedPostById(req.params.postId, true);
  res.json({ post });
};

export const getAllPosts = async (req, res) => {
  const posts = await db.getAllPostsByAuthorId(req.user.id);
  res.json({ posts });
};

export const getAllPublishedPosts = async (req, res) => {
  const posts = await db.getAllPublishedPosts();
  res.json({ posts });
};

export const createCommentPost = [
  validateComment,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const comment = await db.createComment(
      req.user.id,
      req.params.postId,
      req.body.comment
    );
    res.json({ comment });
  },
];

export const updateCommentPut = [
  validateComment,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const comment = await db.updateComment(
      req.params.commentId,
      req.body.comment
    );
    res.json({ comment });
  },
];

export const deleteComment = async (req, res) => {
  await db.deleteComment(req.params.commentId);
  res.sendStatus(204);
};
