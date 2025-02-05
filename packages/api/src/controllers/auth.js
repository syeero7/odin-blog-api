import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcryptjs";

import { validateUser } from "../utils/validation.js";
import { createUser } from "../utils/queries.js";

export const registerUser = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { email, password, isAuthor } = req.body;

    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      if (error) return next(error);

      await createUser(email, hashedPassword, isAuthor);
      res.sendStatus(201);
    });
  },
];

export const loginUser = (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error || !user) return sendErrors(res, info.message);

    req.login(user, { session: false }, (error) => {
      if (error) return next(error);

      const token = jwt.sign({ userId: user.id }, process.env.SECRET);

      res.json({ token, author: user.isAuthor, id: user.id });
    });
  })(req, res, next);
};

function sendErrors(res, message) {
  const errors = {};

  if (message.match(/user/i)) errors.email = message;
  if (message.match(/password/i)) errors.password = message;

  return res.status(400).json({ errors });
}
