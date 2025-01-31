const verifyAuthor = (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  if (req.user.isAuthor) return next();
  res.sendStatus(403);
};

export default verifyAuthor;
