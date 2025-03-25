import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type UniqueIdentifier = { id: number } | { email: string };

export const getUser = async (uniqueIdentifier: UniqueIdentifier) => {
  const uniqueId =
    "email" in uniqueIdentifier
      ? { email: uniqueIdentifier.email }
      : { id: uniqueIdentifier.id };

  return await prisma.user.findUnique({ where: uniqueId });
};

export const createUser = async (email: string, password: string, isAuthor: boolean) => {
  await prisma.user.create({ data: { email, password, isAuthor } });
};

export const createPost = async (
  title: string,
  content: string,
  createdAt: string,
  isPublished: boolean,
  authorId: number
) => {
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

export const updatePostPublishedStatus = async (isPublished: boolean, postId: number) => {
  await prisma.post.update({ where: { id: postId }, data: { isPublished } });
};

export const deletePost = async (id: number) => {
  await prisma.post.delete({ where: { id } });
};

export const updatePost = async (
  id: number,
  title: string,
  content: string,
  createdAt: string
) => {
  await prisma.post.update({
    where: { id },
    data: { title, content, createdAt },
  });
};

export const getPostById = async (id: number, includeComments = false) => {
  return await prisma.post.findUnique({
    where: { id },
    include: { comments: includeComments },
  });
};

export const getPublishedPostById = async (id: number, includeComments = false) => {
  return await prisma.post.findUnique({
    where: { id, isPublished: true },
    include: { comments: includeComments },
  });
};

export const getAllPostsByAuthorId = async (authorId: number) => {
  return prisma.post.findMany({ where: { authorId } });
};

export const getAllPublishedPosts = async () => {
  return prisma.post.findMany({ where: { isPublished: true } });
};

export const createComment = async (
  authorId: number,
  postId: number,
  content: string
) => {
  return await prisma.comment.create({
    data: {
      content,
      post: { connect: { id: postId } },
      author: { connect: { id: authorId } },
    },
  });
};

export const deleteComment = async (id: number) => {
  await prisma.comment.delete({ where: { id } });
};

export const updateComment = async (id: number, content: string) => {
  return await prisma.comment.update({ where: { id }, data: { content } });
};
