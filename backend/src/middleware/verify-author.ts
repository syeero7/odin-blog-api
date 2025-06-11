import { RequestHandler } from "express";

const verifyAuthor: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  if (req.user.isAuthor) return next();
  res.sendStatus(403);
};

export default verifyAuthor;
