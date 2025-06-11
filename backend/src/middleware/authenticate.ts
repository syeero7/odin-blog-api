import passport from "passport";
import { RequestHandler } from "express";

const authenticate: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization && req.method === "GET") return next();
  passport.authenticate("jwt", { session: false })(req, res, next);
};

export default authenticate;
