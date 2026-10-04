import express from 'express'
import { createQuestionController, getQuestionController } from '../controller/question.controller';
import {authenticateUser} from '../middleware/authentication.js'
import { getQuestionValidation, searchSemanticQuestionValidation } from './question/validation/question.validation.js';
const questionRouter = express.Router();

questionRouter.post('/', authenticateUser, createQuestionController);

questionRouter.get('/',authenticateUser, getQuestionValidation, getQuestionController );
questionRouter.get('/search', authenticateUser, searchSemanticQuestionValidation )