export const createConversationsService = async (question)=>{
  try {
    if(!question.trim()){
      const error = new Error('Question is required');
      error.status(500);
      return error;
    }

    
  }
  catch (error) {
    throw error
  }
}
export const getConversationsService=()=>{
 
}