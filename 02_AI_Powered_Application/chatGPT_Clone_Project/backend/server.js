import 'dotenv/config';

import express from "express";
import db from "./db/db.config.js";
import mainRouter from './src/api/main.routes.js'
import authRouter from './src/auth/auth.routes.js'
import { errorHandler } from './src/middleware/error-handler.js';
import cors from 'cors'

const server = express();
server.use(cors({
  origin:'http://localhost:5173'
}));
server.use(express.json());
server.use('/api', mainRouter);
server.use('/auth', authRouter);

server.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release();
    server.listen(3000, (err) => {
      if(err) throw err;
      console.log("Server is running on http://localhost:3000");
    });

  } catch (error) {
    console.log('Error starting server', error.message)
  }
}


startServer();