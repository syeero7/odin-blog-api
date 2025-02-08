import prisma from "../config/prismaClient.js";
import { isTrue } from "./isTrue.js";

export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (email, password, isAuthor) => {
  isAuthor = isTrue(isAuthor);
  await prisma.user.create({ data: { email, password, isAuthor } });
};

export const createPost = async (
  title,
  content,
  createdAt,
  isPublished,
  authorId
) => {
  isPublished = isTrue(isPublished);

  await prisma.post.create({
    data: {
      title,
      content,
      createdAt,
      isPublished,
      author: { connect: { id: authorId } },
    },
  });
};

export const updatePostPublishedStatus = async (isPublished, postId) => {
  postId = parseInt(postId);
  isPublished = isTrue(isPublished);
  await prisma.post.update({ where: { id: postId }, data: { isPublished } });
};

export const deletePost = async (id) => {
  id = parseInt(id);
  await prisma.post.delete({ where: { id } });
};

export const updatePost = async (id, title, content, createdAt) => {
  id = parseInt(id);
  await prisma.post.update({
    where: { id },
    data: { title, content, createdAt },
  });
};

export const getPostById = async (id, includeComments = false) => {
  id = parseInt(id);
  return await prisma.post.findUnique({
    where: { id },
    include: { comments: includeComments },
  });
};

export const getPublishedPostById = async (id, includeComments = false) => {
  id = parseInt(id);
  return await prisma.post.findUnique({
    where: { id, isPublished: true },
    include: { comments: includeComments },
  });
};

export const getAllPostsByAuthorId = async (authorId) => {
  return prisma.post.findMany({ where: { authorId } });
};

export const getAllPublishedPosts = async () => {
  return prisma.post.findMany({ where: { isPublished: true } });
};

export const createComment = async (authorId, postId, content) => {
  postId = parseInt(postId);
  return await prisma.comment.create({
    data: {
      content,
      post: { connect: { id: postId } },
      author: { connect: { id: authorId } },
    },
  });
};

export const deleteComment = async (id) => {
  id = parseInt(id);
  await prisma.comment.delete({ where: { id } });
};

export const updateComment = async (id, content) => {
  id = parseInt(id);
  return await prisma.comment.update({ where: { id }, data: { content } });
};
