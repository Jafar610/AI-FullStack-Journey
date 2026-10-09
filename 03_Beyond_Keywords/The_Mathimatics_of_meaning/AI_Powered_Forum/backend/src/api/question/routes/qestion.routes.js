import express from 'express'
import { createQuestionController, getQuestionController } from '../controller/question.controller';
import {authenticateUser} from '../middleware/authentication.js'
import { getQuestionValidation, searchSemanticQuestionValidation } from './question/validation/question.validation.js';
const questionRouter = express.Router();

questionRouter.post('/', authenticateUser, createQuestionController);

questionRouter.get('/',authenticateUser, getQuestionValidation, getQuestionController );
questionRouter.get('/search', authenticateUser, searchSemanticQuestionValidation );

questionRouter.get('/:questionHash', authenticateUser, getSingleQuestionValidation, getSingleQuestionController );
questionRouter.post('/:questionHash/answer-fit', authenticateUser, assessAnswerAgainstQuestionValidation, assessAnswerAgainstQuestionController);

questionRouter.post('/draft-coatch', authenticateUser, generateQuestionDraftCoachValidation, generateQuestionDraftCoachController);