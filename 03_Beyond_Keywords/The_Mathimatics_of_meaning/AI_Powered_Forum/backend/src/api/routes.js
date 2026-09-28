import express from 'express'
import authRoutes from './auth/routes/auth.routes.js';
const mainRoutes = express.Router();

mainRoutes.use('/auth', authRoutes);

export default mainRoutes