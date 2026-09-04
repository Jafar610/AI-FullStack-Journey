import db from "../../../../db/db.config.js";
import {GoogleGenAI} from '@google/genai'

//select History
const getRecentConversations = async (limit = 5) => {
  const NormalizationLimit = Number.parseInt(limit, 20);
  const safeLimit =
    Number.isNaN(NormalizationLimit) || NormalizationLimit <= 0
      ? 20
      : NormalizationLimit;

  const [rows] = await db.execute(
    `SELECT id, role, content, created_at FROM conversations ORDER BY id DESC limit ${safeLimit}`,
  );

  return rows.reverse();
};

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const geminiClient = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const generateAssistantAnswer = async({historyRows, question})=>{
  const formattedHistory = historyRows.map(row=>({
    role: row.role === 'assistant'?'model':'user',
    parts: [{text:row.content}]
  }));

  const chat = geminiClient.chats.create({
    model : GEMINI_MODEL,
    history : formattedHistory
  });

  const result = await chat.sendMessage({
    message: question,
  });

   return {
    text: result.text,
    totalTokens: result.usageMetadata.totalTokenCount
   }
}

export async function createConversationService(question) {
  try {
    // validation
    if (!question.trim()) {
      const error = new Error("Question is required");
      error.status = 400;
      throw error;
    }

    const historyRows = await getRecentConversations(5);
    // save data
    const [result] = await db.execute("INSERT INTO conversations (content, role) VALUES (?,'user')", [
      question,
    ]);

    const assistantAnswer = await generateAssistantAnswer({
      historyRows, question
    })

    return {
        // historyRows
        assistantAnswer
    };
  } catch (error) {
    throw error;
  }
}
