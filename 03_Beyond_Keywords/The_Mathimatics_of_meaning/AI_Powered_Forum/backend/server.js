import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT;


app.get('/health', (req, res)=>{
    res.json({message:'hello its working'})
})

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