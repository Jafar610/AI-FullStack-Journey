const createQuestionWithVectorService = async payload =>{
    const {userId, title, content} = payload;

    const insertQuestionSql = 'INSERT INTO questions (question_hash, user_id, title, content) VALUES (?,?,?,?)';

    const questionHash = generateQuestionHash();
    let questionResult;
    try {
        const questionResult = await safeExecute(insertQuestionSql, [
        questionHash,
        userId,
        title,
        content
    ]);

    } catch (error) {
        if(error?.code === 'ER_NO_REFERENCED_ROW_2'){
            throw new BadRequestError('User does not exist.');
        }

        throw error;
    }
}