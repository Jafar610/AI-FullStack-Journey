import express from 'express'
import authRoutes from './auth/routes/auth.routes.js';
import {authenticateUser} from '../middleware/authentication.js'
import { getQuestionValidation } from './question/validation/question.validation.js';
const mainRoutes = express.Router();

mainRoutes.use('/auth', authenticateUser, getQuestionValidation, authRoutes);

mainRoutes.use('/search', authenticateUser,(req,res)=>{
    res.send('search page.')
})

export default mainRoutes