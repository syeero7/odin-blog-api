import passport from "passport";

const authenticate = (req, res, next) => {
  if (!req.headers.authorization && req.method === "GET") return next();
  passport.authenticate("jwt", { session: false })(req, res, next);
};

export default authenticate;
