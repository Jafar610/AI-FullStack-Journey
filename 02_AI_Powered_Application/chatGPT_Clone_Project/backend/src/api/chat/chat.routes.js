import express from 'express';
import { createConversationController, getConversationController } from './controller/chat.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
const chatRouter = express.Router();
chatRouter.post('/conversations',protect, createConversationController);


chatRouter.get('/conversations', protect, getConversationController);


export default chatRouter;