import express from 'express'
import { createQuestionController } from '../controller/question.controller';
const questionRouter = express.Router();

questionRouter.post('/', createQuestionController)

questionRouter = get('/', (req, res)=>{
    res.send('Get request');
})