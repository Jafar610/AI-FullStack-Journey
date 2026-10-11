import express from "express";

const answerRoute = express.Router();

answerRoute.post(
  "/",
  authenticateUser,
  createAnswerValidation,
  createAnswerController,
);

answerRoute.get('/', getAnswerValidation,
    getAnswerController
);

