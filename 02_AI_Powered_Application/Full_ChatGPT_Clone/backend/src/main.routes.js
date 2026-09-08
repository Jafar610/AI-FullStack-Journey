import express from 'express'
import chatRoutes from './api/chat/chat.routes.js';
import adminRoutes from './api/admin/admin.routes.js';

const mainRoutes = express.Router();

mainRoutes.use('/chat', chatRoutes);

mainRoutes.use('/admin', adminRoutes)

export default mainRoutes;