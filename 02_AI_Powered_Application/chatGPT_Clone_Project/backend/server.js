import 'dotenv/config';

import express from "express";
import db from "./db/db.config.js";
import mainRouter from './src/api/main.routes.js'
const server = express();
server.use(express.json());
server.use('/api', mainRouter);

server.get('api/chat/conversations', (req, res)=>{
  res.send("get chat");
});


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