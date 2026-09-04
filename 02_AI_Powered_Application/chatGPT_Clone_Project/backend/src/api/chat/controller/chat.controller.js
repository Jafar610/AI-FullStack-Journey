import { createConversationService, getRecentConversations } from "../services/chat.service.js";


export async function createConversationController(req, res) {
  try {
    const { question } = req.body;

    const result = await createConversationService(question);
    res.status(201).json({
      status: true,
      message: "create conversation api success",
      data: result,
    });
  } catch (error) {
    throw error;
  }
}

export async function getConversationController(req, res) {
  try {
    const result = await getRecentConversations(100)
    res.status(201).json({
      status: true,
      message: "Get conversation api success",
      data: result,
    });
  } catch (error) {
    throw error;
  }
  
}
