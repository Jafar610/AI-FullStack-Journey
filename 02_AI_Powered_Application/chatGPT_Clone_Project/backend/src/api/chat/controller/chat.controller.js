import { createConversationService } from "../services/chat.service.js";

export async function createConversationController(req, res){
   try {
        const data = await createConversationService();
        console.log(data);
   } catch (error) {
    
   }
}

export function getConversationController(req, res){
    res.send('Conversation get api');
}
