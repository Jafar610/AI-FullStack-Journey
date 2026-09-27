import express from 'express'
import router from './auth/routes/auth.routes';
const mainRoutes = express.Router();

mainRoutes.get('/api', router)