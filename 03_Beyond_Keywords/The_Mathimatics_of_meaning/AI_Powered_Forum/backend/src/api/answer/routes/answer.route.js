import express from "express";
import {authenticateUser} from '../../../middleware/authentication.js'
import {createAnswerValidation, getAnswerValidation} from '../validation/answer.validation.js'
import {createAnswerController, getAnswerController} from '../controller/answer.controller.js'
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

