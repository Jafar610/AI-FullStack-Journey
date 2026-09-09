import { createConversationsService, getConversationsService } from "../service/chat.service.js";
export const createConversationsController = async (req, res)=>{
   try {
     const {question} = req.body;
     const result = await createConversationsService(question);
    res.status(201).json({
        status: true,
        message: 'conversations create successfully',
        data: result
    })
   } catch (error) {
    throw error
   }
}









export const getConversationsController = async (req, res)=>{
   try {
     const result = await getConversationsService();

     res.status(200).json({
        status:true,
        message:'Get conversations successfully',
        data: result
     })
   } catch (error) {
    throw error
   }
}