import express from 'express';
import { createConversationController, getConversationController } from './controller/chat.controller.js';

const chatRouter = express.Router();
chatRouter.post('/conversations', createConversationController);


chatRouter.get('/conversations', getConversationController);


export default chatRouter;