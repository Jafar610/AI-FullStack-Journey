import "dotenv/config";
import db from "./db/db.config.js";
import express from "express";
import mainRoutes from "./src/main.routes.js";
import errorHandler from "./src/middleware/errorHandler.js";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// /api/chat
app.use('/api', mainRoutes);

app.use(errorHandler);

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