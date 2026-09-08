import "dotenv/config";
import db from "./db/db.config.js";
import express from "express";
import mainRoutes from "./src/main.routes.js";
const app = express();

app.use(express.json());

// /api/chat
app.use('/api', mainRoutes);


app.post('/api/chat/conversations', (req, res)=>{
    console.log('post api routes')
});







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