import db from '../../../../db/db.config.js';
import { GoogleGenAI } from '@google/genai';


export const getRecentConversations = async (limit = 5)=>{
  try {
    const parse = Number.parseInt(limit, 10);

    const safeLimit = Number.isNaN(parse) || parse <= 0 ? 20 : parse;

    const [row] = await db.execute(`SELECT id, role, content,created_at FROM conversations ORDER BY id DESC limit ? `, [safeLimit]);

    return row.reverse();

  } catch (error) {
    throw error;
  }
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const generateAssistantAnswer = async(history, question) =>{
  const formattedHistory = history.map(row=>({
      role : row.role === 'assistant' ? 'model' : 'user',
      parts : [{text:row.content}]
  }));

  const chat = ai.chats.create({
    model : GEMINI_MODEL,
    history: formattedHistory,
  });

  const result = await chat.sendMessage({
    message:question,
  })
  
  return{
    text: result.text,
    totalTokens: result.usageMetadata.totalTokenCount
  };
}


const getMessageById = async (messageId) =>{
    const [row] = await db.execute(
      'SELECT id, role, content, token_count, created_at FROM conversations WHERE id = ? limit 1', [messageId]
    );

    if(!row[0]) return null;
    return {
      id: row[0].id,
      role:row[0].role,
      content: row[0].content,
      tokenCount: Number(row[0].token_count || 0),
      createdAt : row[0].created_at,
    }
}


export const createConversationsService = async (question)=>{
  try {
    if(!question.trim()){
      const error = new Error('Question is required');
      error.status = 400;
      throw error;
    }

    // save data
    const [result] = await db.execute('INSERT INTO conversations (content) VALUES (?)', [question]);




    const history =  await getRecentConversations(5);
    
    const {text, totalTokens} = await generateAssistantAnswer(history, question);

    const [insertAssistantAnswer] = await db.execute(
      'INSERT INTO conversations (role, content, token_count) VALUES (?,?,?) ', ['assistant', text ?? '', totalTokens ?? 0]
    );

     const userConversation = await getMessageById(result.insertId);
     const assistantConversation = await getMessageById(insertAssistantAnswer.insertId)
    
    return{
      userConversation,
      assistantConversation
    }
  }
  catch (error) {
    throw error
  }
}
