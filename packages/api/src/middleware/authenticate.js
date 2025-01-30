import passport from "passport";

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

export default authenticate;
