import express from 'express'
import { registerController, loginController } from '../controller/auth.controller.js';
import { registerValidator, loginValidation } from '../validations/auth.validation.js';
const router = express.Router();

router.post('/register', registerValidator, registerController);
router.post('/login',loginValidation, loginController);

export default router;