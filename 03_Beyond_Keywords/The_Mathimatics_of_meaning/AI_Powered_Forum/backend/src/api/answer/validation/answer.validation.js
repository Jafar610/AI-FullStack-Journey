import {body, param, query} from 'express-validator';
import { validationErrorHandler } from '../../../middleware/validation-handler';

const createAnswerValidation = [
    body('questionId')
    .notEmpty()
    .withMessage('Question id is required')
    .isString()
    .withMessage('Answer content must be a strong')
    .isLength({min:20})
    .withMessage('Answer content must be at least 20 characters')
    .trim(),

    validationErrorHandler,
]

const getAnswerValidation = [
    query('questionId')
    .notEmpty()
    .withMessage('QuestionId is required')
    .isIn({min:1})
    .withMessage('QuestionId must be a positive integer')
    .toInt(),

    query('sortBy')
    .optional()
    .isInt(['newest', 'oldest'])
    .withMessage('sortBy must be one of the newest, oldest'),

    validationErrorHandler,
]

const answerIdValidation = [
    param('answerId')
    .isInt({min:1})
    .withMessage('Answer is must be a positive integer')
     
]