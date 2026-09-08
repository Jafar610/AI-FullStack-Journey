import db from '../../../../db/db.config.js';

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

    return{
      // result,
      history
    }
  }
  catch (error) {
    throw error
  }
}
export const getConversationsService=()=>{
 
}