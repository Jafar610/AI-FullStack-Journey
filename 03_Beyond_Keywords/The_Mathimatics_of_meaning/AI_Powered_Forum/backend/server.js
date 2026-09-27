import 'dotenv/config';
import express from 'express';
import { errorHandler } from './src/middleware/errorHandler.js';
import { db } from './db/config.js';
import mainRoutes from './src/api/routes.js';
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/api', mainRoutes)

app.use(errorHandler);
const serverListener = async() =>{
    try {
        const connection = await db.getConnection();
        console.log('Database connection established successfully');
        connection.release();

        app.listen(port, (err)=>{
            if(err){
                console.log(`Port Faild :${err.message}`);
                process.exit(1);
            }

            console.log(`Server is running on port : http://localhost:${port}`);
        })
    } catch (error) {
        console.error(
            'Faild to connect to the database. server is not started.',
            error.message
        )
        process.exit(1);
    }
}

serverListener();