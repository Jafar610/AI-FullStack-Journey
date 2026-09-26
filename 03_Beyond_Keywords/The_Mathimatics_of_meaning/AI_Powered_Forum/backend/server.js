import 'dotenv/config';
import express from 'express';
import { errorHandler } from './src/middleware/errorHandler';
const app = express();
const port = process.env.PORT;


app.get('/health', (req, res)=>{
    res.json({message:'hello its working'})
})

app.use(errorHandler);
const serverListener = async() =>{
    try {
        app.listen(port, (err)=>{
            if(err){
                console.log(`Port Faild :${err.message}`);
                process.exit(1);
            }

            console.log(`Server is running on port : http://localhost:${port}`);
        })
    } catch (error) {
        throw error;
    }
}

serverListener();