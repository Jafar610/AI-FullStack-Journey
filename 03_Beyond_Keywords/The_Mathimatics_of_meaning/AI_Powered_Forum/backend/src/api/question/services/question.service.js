import crypto from 'crypto'

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
    `
}