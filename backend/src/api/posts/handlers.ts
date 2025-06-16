import { Request } from "express";
import { validationResult, body, param } from "express-validator";
import asyncHandler from "express-async-handler";
import prisma from "@/prisma-client.ts";

export const getAllPublishedPosts = asyncHandler(async (_req, res) => {
  const posts = await prisma.post.findMany({ where: { published: true } });

  res.json({ posts });
});

export const getAllPosts = asyncHandler(async (_req, res) => {
  const posts = await prisma.post.findMany();

  res.json(posts);
});

type PostParams = Request["params"] & { postId: number };

export const getPublishedPost = [
  param("postId").toInt().isNumeric(),
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return void res.sendStatus(404);

    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        published: true,
      },
    });
    if (!post) return void res.sendStatus(404);

    res.json({ post });
  }),
];

export const getPublishedPostWithComments = [
  param("postId").toInt().isNumeric(),
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return void res.sendStatus(404);

    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        published: true,
      },
      include: { comments: true },
    });
    if (!post) return void res.sendStatus(404);

    res.json({ post });
  }),
];

export const getPostById = [
  param("postId").toInt().isNumeric(),
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return void res.sendStatus(404);

    const { postId } = req.params;
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return void res.sendStatus(404);

    res.json({ post });
  }),
];

export const getPostWithComments = [
  param("postId").toInt().isNumeric(),
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return void res.sendStatus(404);

    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { comments: true },
    });
    if (!post) return void res.sendStatus(404);

    res.json({ post });
  }),
];

const postValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Post must be within 50 characters"),
  body("content")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content must be within 1000 characters"),
];

export const createPost = [
  ...postValidation,
  body("published")
    .toBoolean()
    .isBoolean()
    .withMessage("Published must be a boolean value"),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const formatted = result.formatWith(({ msg }) => msg);
      return void res.status(400).json({ errors: formatted.mapped() });
    }

    const userId = req.user!.id;
    const { title, content, published } = req.body;
    await prisma.post.create({
      data: {
        title,
        content,
        published,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.sendStatus(201);
  }),
];

export const updatePost = [
  param("postId").toInt().isNumeric(),
  ...postValidation,
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const mapped = result.formatWith(({ msg }) => msg).mapped();
      if (mapped["postId"]) return void res.sendStatus(404);
      return void res.status(400).json({ errors: mapped });
    }

    const { postId } = req.params;
    const { title, content } = req.body;
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });

    res.sendStatus(204);
  }),
];

export const updatePostStatus = [
  param("postId").toInt().isNumeric(),
  body("published")
    .toBoolean()
    .isBoolean()
    .withMessage("Published must be a boolean value"),
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const mapped = result.formatWith(({ msg }) => msg).mapped();
      if (mapped["postId"]) return void res.sendStatus(404);
      return void res.status(400).json({ errors: mapped });
    }

    const { postId } = req.params;
    const { published } = req.body;
    await prisma.post.update({
      where: { id: postId },
      data: { published },
    });

    res.sendStatus(204);
  }),
];

export const deletePost = [
  param("postId").toInt().isNumeric(),
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return void res.sendStatus(404);

    const { postId } = req.params;
    await prisma.post.delete({ where: { id: postId } });

    res.sendStatus(204);
  }),
];

const commentValidation = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage("Comment must be within 300 characters"),
];

export const createComment = [
  param("postId").toInt().isNumeric(),
  ...commentValidation,
  asyncHandler<PostParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const mapped = result.formatWith(({ msg }) => msg).mapped();
      if (mapped["postId"]) return void res.sendStatus(404);
      return void res.status(400).json({ errors: mapped });
    }

    const { postId } = req.params;
    const { content } = req.body;
    await prisma.comment.create({
      data: {
        content,
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    res.sendStatus(201);
  }),
];

type CommentParams = Request["params"] & { commentId: number };

export const updateComment = [
  param("commentId").toInt().isNumeric(),
  ...commentValidation,
  asyncHandler<CommentParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const mapped = result.formatWith(({ msg }) => msg).mapped();
      if (mapped["commentId"]) return void res.sendStatus(404);
      return void res.status(400).json({ errors: mapped });
    }

    const { commentId } = req.params;
    const { content } = req.body;
    await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    res.sendStatus(204);
  }),
];

export const deleteComment = [
  param("commentId").toInt().isNumeric(),
  asyncHandler<CommentParams>(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return void res.sendStatus(404);

    const { commentId } = req.params;
    await prisma.comment.delete({ where: { id: commentId } });

    res.sendStatus(204);
  }),
];
