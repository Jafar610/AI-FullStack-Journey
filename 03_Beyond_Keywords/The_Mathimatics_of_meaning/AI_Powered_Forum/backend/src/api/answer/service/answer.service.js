const  createAnswerService = async({questionId, userId, content})=>{
    const question = await getQuestionOwner(questionId);
    if(question.user_id === userId){
        throw new BadRequestError('You cannot answer your own question');
    }

    const insertSql = `
    INSERT INTO answers (question_id, user_id, content) VALUES (?, ?, ?)
    `;

    const result = await safeExecute(insertSql, [questionId,userId, content]);

    return getSingleAnswerService(result.insertId);
}

const getAnswerSortSql = sortBy =>{
    if(sortBy === 'oldest'){
        return `a.created_at ASC`;
    }

    return `a.created_at DESC`;
}