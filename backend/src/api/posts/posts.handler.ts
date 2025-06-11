import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { validateComment, validatePost } from "./posts.validation.js";
import * as db from "@db/queries.js";
import { isTrue } from "@utils/functions.js";

export const createPost = [
  ...validatePost,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
      return;
    }
    const { title, content, createdAt, isPublished } = req.body;

    await db.createPost(
      title,
      content,
      createdAt,
      isTrue(isPublished),
      Number(req.user!.id)
    );
    res.sendStatus(201);
  },
];

export const updatePostStatusPut = async (req: Request, res: Response) => {
  await db.updatePostPublishedStatus(
    isTrue(req.body.isPublished),
    Number(req.params.postId)
  );
  res.sendStatus(204);
};

export const deletePost = async (req: Request, res: Response) => {
  await db.deletePost(Number(req.params.postId));
  res.sendStatus(204);
};

export const updatePostPut = [
  ...validatePost,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
      return;
    }
    const { title, content, createdAt } = req.body;

    await db.updatePost(Number(req.params.postId), title, content, createdAt);
    res.sendStatus(204);
  },
];

export const getPost = async (req: Request, res: Response) => {
  const post = await db.getPostById(Number(req.params.postId));
  res.json({ post });
};

export const getPublishedPost = async (req: Request, res: Response) => {
  const post = await db.getPublishedPostById(Number(req.params.postId));
  res.json({ post });
};

export const getPostWithComments = async (req: Request, res: Response) => {
  const post = await db.getPostById(Number(req.params.postId), true);
  res.json({ post });
};

export const getPublishedPostWithComments = async (req: Request, res: Response) => {
  const post = await db.getPublishedPostById(Number(req.params.postId), true);
  res.json({ post });
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await db.getAllPostsByAuthorId(Number(req.user!.id));
  res.json({ posts });
};

export const getAllPublishedPosts = async (_req: Request, res: Response) => {
  const posts = await db.getAllPublishedPosts();
  res.json({ posts });
};

export const createCommentPost = [
  ...validateComment,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
      return;
    }

    const comment = await db.createComment(
      req.user!.id,
      Number(req.params.postId),
      req.body.comment
    );
    res.json({ comment });
  },
];

export const updateCommentPut = [
  ...validateComment,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
      return;
    }

    const comment = await db.updateComment(
      Number(req.params.commentId),
      req.body.comment
    );
    res.json({ comment });
  },
];

export const deleteComment = async (req: Request, res: Response) => {
  await db.deleteComment(Number(req.params.commentId));
  res.sendStatus(204);
};
