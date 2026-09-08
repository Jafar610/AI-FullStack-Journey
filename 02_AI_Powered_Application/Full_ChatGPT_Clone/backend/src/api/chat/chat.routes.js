import express from 'express'
import { createConversationsController, getConversationsController } from './controller/chat.controller.js';
const chatRoutes = express.Router()

chatRoutes.get('/conversations',getConversationsController);



chatRoutes.post('/conversations',createConversationsController);

export default chatRoutes;