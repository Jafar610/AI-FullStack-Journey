import express from 'express'

const adminRoutes = express.Router();

adminRoutes.get('/home', (req, res)=>{
    res.send('Admin home page routes.')
});

export default adminRoutes