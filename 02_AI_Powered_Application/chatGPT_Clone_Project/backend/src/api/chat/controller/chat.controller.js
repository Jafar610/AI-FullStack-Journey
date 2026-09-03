import { errorHandler } from "../../../middleware/error-handler.js";
import { createConversationService } from "../services/chat.service.js";

export async function createConversationController(req, res){
   try {
        const {question} = req.body;
        const data = await createConversationService(question);
        res.status(201).json({
            status: true,
            message: "create conversation api success",
            result: data
        })
   } catch (error) {
       throw error
   }
}

export function getConversationController(req, res){
    res.send('Conversation get api');
}
