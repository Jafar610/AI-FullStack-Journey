import express from 'express'
import authRoutes from './auth/routes/auth.routes.js';
import questionRouter from './question/routes/qestion.routes.js';
import answerRoute from './answer/routes/answer.route.js'
const mainRoutes = express.Router();

mainRoutes.use('/auth', authRoutes);


mainRoutes.use('/question', questionRouter);


mainRoutes.use('/answer', answerRoute)

export default mainRoutes