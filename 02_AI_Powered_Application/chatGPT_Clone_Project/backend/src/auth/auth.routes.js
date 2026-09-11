import express from 'express';
import { register } from './controller/auth.controller.js';
const authRoutes = express.Router();

authRoutes.post('/register', register);

export default authRoutes;