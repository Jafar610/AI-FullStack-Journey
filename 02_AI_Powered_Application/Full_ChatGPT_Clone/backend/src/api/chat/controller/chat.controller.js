import { createConversationsService, getRecentConversations } from "../service/chat.service.js";
export const createConversationsController = async (req, res)=>{
   try {
     const {question} = req.body;
     const result = await createConversationsService(question);
    res.status(201).json({
        success: true,
        message: 'conversations create successfully',
        data: result
    })
   } catch (error) {
    throw error
   }
}









export const getConversationsController = async (req, res)=>{
   try {
     const result = await getRecentConversations(100);

     res.status(200).json({
        success:true,
        message:'Get conversations successfully',
        data: result
     })
   } catch (error) {
    throw error
   }
}