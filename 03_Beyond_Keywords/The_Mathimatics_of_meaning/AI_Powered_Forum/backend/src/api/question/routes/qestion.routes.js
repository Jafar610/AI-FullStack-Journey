import express from 'express'

const questionRouter = express.Router();

questionRouter.post('/', (req, res)=>{
    res.send('welcome to question router.')
})