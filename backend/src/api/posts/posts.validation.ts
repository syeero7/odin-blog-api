import { body } from "express-validator";
import { getLengthErrorMessage } from "@utils/functions.js";

export const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Title ${getLengthErrorMessage(50)}`),
  body("content")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage(`Content ${getLengthErrorMessage(1000)}`),
];

export const validateComment = [
  body("comment")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage(`Comment ${getLengthErrorMessage(300)}`),
];
