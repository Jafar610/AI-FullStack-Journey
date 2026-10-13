const mapAswer = row =>({
    id: row.id,
    questionId: row.questionId,
    content: row.content,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    author:{
        id:row.userId,
        firstName: row.firstName,
        lastName: row.lastName
    }
});

const updateAnswerService = async({
    answerId, userId, content
})=>{
    const asnwer = await getAnwerOwner (answerId);

    if(asnwer.user_id !== userId){
        throw new UnauthenticatedError(
            `You are not authoriazed to update this anwers.`
        )
    }

    await safeExecute(`
        UPDATE answers SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE answer_id = ?
        `, [content, answerId]);
        return getSingleAnswerService(answerId);
}

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

const getSingleAnswerService = async answerId =>{
    const sql = `
    SELECT 
    a.answer_id AS id,
    a.question_id AS questionId,
    a.content,
    a.created_at AS createdAt,
    a.updated_at AS updatedAt,
    u.user_id AS userId,
    u.first_name AS firstName,
    u.last_name AS lastName 
    FROM answers a 
    JOIN users u ON u.user_id = a.user_id WHERE a.user_id = ?
    LIMIT 1
    `;

    const rows = await safeExecute(sql, [answerId]);

    if(rows.length === 0){
        throw new NotFoundError('Answer not found');
    }

    return mapAswer(rows[0]);
}