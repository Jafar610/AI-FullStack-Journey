import {body, param, query} from 'express-validator';
import {validationErrorHandler} from '../../../middleware/validation-handler.js'
export const getQuestionValidation = [
    query('search')
    .optional()
    .isString()
    .withMessage('Search must be a boolean')
    .trim(),

    query('mine')
    .optional()
    .isBoolean()
    .withMessage('Mine must be a boolean')
    .toBoolean(),

    validationErrorHandler,
];

const searchSemanticQuestionValidation = [
    query("Query")
    .notEmpty()
    .withMessage("query is required")
    .isString()
    .withMessage("query must be a string")
    .isLength({min:5})
    .withMessage("query must be at least 5 characters")
    .trim(),
    query('k')
    .optional()
    .isInt({min:1, max:20})
    .withMessage('k must be between 1 to 20')
    .toInt(),

    query('threshold')
    .optional()
    .isFloat({min:0, max:1})
    .withMessage('threshold must be between 0 and 1')
    .toFloat(),
    validationErrorHandler,
];

const getSingleQuestionValidation = [
    param('questionHash')
    .isString()
    .withMessage('Question hash is required')
    .matches(/^[a-f0-9]{16}$/)
    .withMessage('Question hash must be a 16-character lowercase hex string'),
    validationErrorHandler
];


const assessAnswerAgainstQuestionValidation = [
    param('questionHash')
    .isString()
    .withMessage('Question hash is required')
    .matches(/^[a-f0-9]{16}$/)
    .withMessage('Question hash must be a 16-character lowercase hex string'),

    body('answerText')
    .notEmpty()
    .withMessage('Answer text is required')
    .isString()
    .withMessage('Answer text must be a string')
    .isLength({min:20})
    .withMessage('Answer text must be at least 20 character for a meaningful fit check')
    .trim(),

    validationErrorHandler
]

