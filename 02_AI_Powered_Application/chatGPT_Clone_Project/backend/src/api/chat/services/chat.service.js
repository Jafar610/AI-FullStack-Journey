export async function createConversationService(question){
    try {
        if(!question.trim()){
            const error = new Error('Question is required');
            error.status = 400;
            throw error;
        }
    } catch (error) {
        throw error;
    }


}