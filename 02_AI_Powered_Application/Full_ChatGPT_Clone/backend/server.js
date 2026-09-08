import "dotenv/config";
import db from "./db/db.config.js";
import express from "express";

const app = express();

app.get('/api/chat/conversations', (req, res)=>{
    res.send('Hello there');
});

app.post('/api/chat/conversations', (req, res)=>{
    console.log('post api routes')
})

const serverListener = async () => {
  try {
    const connection =  await db.getConnection();
    connection.release();
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    throw error;
  }
};

serverListener();