import { validationResult, body } from "express-validator";
import asyncHandler from "express-async-handler";
import { User } from "@prisma/client";
import { Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../../prisma-client.js";

export const signUp = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Email must be formatted properly")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      return user === null;
    })
    .withMessage("Email already in use"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters"),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  body("authorPasscode")
    .trim()
    .custom((value, { req }) => {
      if (req.body.role !== "AUTHOR") return true;
      return value === process.env.AUTHOR_PASSCODE;
    })
    .withMessage("Author passcode is incorrect"),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const formatted = result.formatWith(({ msg }) => msg);
      res.status(400).json({ errors: formatted.mapped() });
      return;
    }

    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ email });
  }),
];

export const login = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (error: Error, user: User, info: { message: string }) => {
      if (error) return next(error);
      if (!user) return sendErrorMessage(res, info.message);

      const token = jwt.sign({ id: user.id }, process.env.SECRET!);
      res.json({ token, user: { id: user.id, role: user.role } });
    }
  )(req, res, next);
});

function sendErrorMessage(res: Response, message: string) {
  const errors: { email?: string; password?: string } = {};

  if (message.match(/user/i)) errors.email = message;
  if (message.match(/password/i)) errors.password = message;

  res.status(400).json({ errors });
}
