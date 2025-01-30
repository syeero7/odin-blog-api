import prisma from "../config/prismaClient.js";

export const getUserById = async (id) => {
  id = parseInt(id);
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (email, password, isAuthor) => {
  isAuthor = isAuthor === "true";
  await prisma.user.create({ data: { email, password, isAuthor } });
};
