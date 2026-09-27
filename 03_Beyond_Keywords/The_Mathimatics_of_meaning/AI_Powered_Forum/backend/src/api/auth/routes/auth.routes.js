import express from 'express'
import { registerController } from '../controller/auth.controller.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

export default router;