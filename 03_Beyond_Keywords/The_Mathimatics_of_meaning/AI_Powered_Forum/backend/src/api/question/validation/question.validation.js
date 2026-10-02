import {body, query} from 'express-validator';
import {validationErrorHandler} from '../../../middleware/validation-handler.js'
const getQuestionValidation = [
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
]