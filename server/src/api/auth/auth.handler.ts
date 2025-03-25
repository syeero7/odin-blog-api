import { NextFunction, RequestHandler, Response, Request } from "express";
import { validationResult } from "express-validator";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcryptjs";

import { validateUser } from "./auth.validation.js";
import { createUser } from "@db/queries.js";
import { isTrue } from "@utils/functions.js";

interface LoginErrorMessage {
  email?: string;
  password?: string;
}

export const registerUserPost = [
  ...validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
      return;
    }

    const { email, password, isAuthor } = req.body;

    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      if (error) return next(error);

      await createUser(email, hashedPassword, isTrue(isAuthor));
      res.status(201).json({ user: { email }, message: "New user created" });
    });
  },
];

export const loginUserPost: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (error: Error | null, user: User | undefined, info: { message: string }) => {
      if (error) return next(error);
      if (!user) return sendErrorMessage(res, info.message);

      req.login(user, { session: false }, (error) => {
        if (error) return next(error);

        const token = jwt.sign({ userId: user.id }, process.env.SECRET!);
        res.json({ token, author: user.isAuthor, id: user.id });
      });
    }
  )(req, res, next);
};

function sendErrorMessage(res: Response, message: string) {
  const errors: LoginErrorMessage = {};

  if (message.match(/user/i)) errors.email = message;
  if (message.match(/password/i)) errors.password = message;

  res.status(400).json({ errors });
}
