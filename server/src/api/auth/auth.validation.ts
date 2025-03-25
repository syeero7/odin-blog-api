import { body } from "express-validator";
import { isTrue, getLengthErrorMessage } from "@utils/functions.js";
import { getUser } from "@db/queries.js";

export const validateUser = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Email must be formatted properly")
    .custom(async (value) => {
      const user = await getUser({ email: value });
      if (user) throw new Error("E-mail already in use");
    }),
  body("password")
    .trim()
    .isLength({ min: 6, max: 25 })
    .withMessage(`Password ${getLengthErrorMessage(25, 6)}`),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  body("authorPasscode")
    .trim()
    .custom((value, { req }) => {
      if (!isTrue(req.body.isAuthor)) return true;
      return value === process.env.AUTHOR_PASSCODE;
    })
    .withMessage("Author passcode is incorrect"),
];
