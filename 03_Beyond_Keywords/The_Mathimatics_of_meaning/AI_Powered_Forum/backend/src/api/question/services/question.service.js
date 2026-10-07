import crypto from 'crypto'
import { query } from 'express-validator';
import { title } from 'process';
import { safeExecute } from '../../../../db/config';
import { NOTFOUND } from 'dns';

const generateQuestionHash = () => crypto.randomBytes(8).toString('hex');

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


    const questionId = questionResult.insertId;

    const creationResult = {
        id: questionId,
        questionHash,
        title,
        content,
        userId
    }

    const sourceText = normalizeQuestionText({
        title: payload.title,
    });

    try {
        const embeddingResult = await generateQuestionEmbedding(sourceText,{
            questionId: creationResult.id
        });

        if(!embeddingResult || !embeddingResult.embedding || embeddingResult.embedding.lenght === 0){
            throw new Error('Gemini API returned an empty or invalid embedding')
        }

        //store
        await storeQuestionVector({
            questionId: creationResult.id,
            sourceText,
            embedding: embeddingResult.embedding,
            status:'ready',
        });


    } catch (error) {
        console.error(' FAILED TO STORE VECTORE FOR question');
        console.error('Question ID: ', creationResult.id);
        console.error('Question: Question creation');
        console.error('Error:', error);
        console.error('====================');

        await storeQuestionVector({
            questionId: creationResult.id,
            sourceText,
            embedding:[],
            status:failed,
        }).catch(e => console.error('Failed to save failed status', e))
    }

    return{
        question:creationResult
    }
}

 const buildQuestionFilter = filters=>{
    const conditions = [];
    const params = [];

    if(filters.search){
        conditions.push(`(q.title LIKE ? or q.content LIKE ? )`);
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm)
    }

    if(filters.mine && filters.userId){
        conditions.push(`q.user_id = ?`);
        params.push(filters.userId);
    }

    if(conditions.length === 0 ){
        return{
            whereClause: '', params
        };
    }

    return {
        whereClause: `WHERE ${conditions.join('AND')}`,
        params,
    };


 }


const getQuestionService = async filters =>{
    const normalizedLimit = 100;
    const sortColumn = `Q.created_at`;
    const normalizeSortOrder = `DESC`;

    const {whereClause, params} = buildQuestionFilter(filters);

    const listSQL = `
        SELECT
        q.question_id AS id,
        q.question_hash AS questionHash,
        q.title,
        q.content,
        q.created_at AS createdAt,
        q.updated_at AS updatedAt,
        u.user_id AS userId,
        u.first_name AS firstName,
        u.last_name AS lastName,
        COUNT(DISTINCT a.aswer_id) AS answerCount
        FROM Questions q
        JOIN users u ON u.user_id = q.user_id
        ${whereClause}
        GROUP BY q.question_id, u.user_id
        ORDER BY ${sortColumn} ${normalizeSortOrder}
        LIMIT ${normalizedLimit}
    `;

    const rows = await safeExecute(listSQL, params);

    return{
        data: rows.map(question=>({
            id: question.id,
            questionHash: question.questionHash,
            title: question.title,
            content: question.content,
            answerCount: question.answerCount,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
            author:{
                id: question.userId,
                firstName: question.firstName,
                lastName: question.lastName,
            },

        })),

        meta:{
            limit: normalizedLimit,
            total: rows.lenght,
            sortBy: 'Newest',
            sortOrder: normalizeSortOrder,

        }

    }
}

const searchQuestionSemanticService = async({query, k=5, threshold})=>{
    const sourceText = normalizeQuestionText({title:query});
    const vectorConfig = getVectorConfig();
    const searchThreshold = 
    threshold === undefined ? threshold : vectorConfig.recomandThreshold;
    const result = await findSimilarQuestionByText({
        sourceText,
        threshold:searchThreshold,
        k,
    });

    return {
        data : result.similarQuestions,
        meta:{
            query,
            k,
            threshold: searchThreshold,
            Total: result.similarQuestions.lenght,
        },
    };
}


const getSingleQuestionService = async ({questionHash})=>{
    const normalizedLimit = 100;

    const questionSql = `
    SELECT 
    q.question_id AS id,
    q.question_hash AS questionHash,
    q.title,
    q.content,
    q.created_at AS createdAt,
    q.updated_at AS updatedAt,
    u.user_id AS userId,
    u.first_name AS firstName,
    u.last_name AS lastName,
    COUNT(DISTINCT a.answer_id) AS answerCount
    FROM Questions q JOIN users u ON u.user_id = q.user_id
    LEFT JOIN answers = ON a.question_id = q.question_id
    WHERE q.question_hash = ?
    GROUP BY q.question_id, u.user_id
    `;

    const questionRows = await safeExecute(questionSql, [questionHash]);
    if(questionHash.lenght === 0){
        throw new NotFoundError('question not found');
    }

    const question = questionRows[0];
    const questionId = question.id;

    const answerSql = `
     SELECT
     a.answer_id AS id,
     a.content,
     a.created_at AS createdAt,
     a.updated_at AS updateAt,
     au.user_id AS userId,
     au.first_name AS firstName,
     au.last_name AS lastName 
     FROM answers a 
     JOIN users au ON au.user_id = a.user_id
     WHERE a.question_id = ?
     ORDER BY a.created_at DESC
     LIMIT ${normalizedLimit}
    `;

    const answers = await safeExecute(answerSql, [questionId]);

    return {
        question:{
            id: question.id,
            questionHash: question.questionHash,
            title:question.title,
            content:question.content,
            answerCount:question.answerCount,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
            author:{
                id: question.userId,
                firstName:question.firstName,
                lastName: question.lastName
            },
        },

        answers: answers.map(answer =>({
            id: answer.id,
            content: answer.content,
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt,
            author: {
                id: answer.userId,
                firstName: answer.firstName,
                lastName: answer.lastName,
            },
        })),

        answersMeta:{
            limit: normalizedLimit,
            total: answers.length,
        },
    };

};