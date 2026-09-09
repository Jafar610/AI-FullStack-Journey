import db from '../../../../db/db.config.js';
import { GoogleGenAI } from '@google/genai';


const getRecentConversations = async (limit = 5)=>{
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
  
  return result;
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
     const history =  await getRecentConversations(5);
    // save data
    const [result] = await db.execute('INSERT INTO conversations (content) VALUES (?)', [question]);

    const rowData = await getMessageById(result.insertId);
    const assistantAnswer = await generateAssistantAnswer(history, question);
    
    return{
      // result,
      // history,
      // assistantAnswer

      rowData
    }
  }
  catch (error) {
    throw error
  }
}




export const getConversationsService=()=>{
 
}