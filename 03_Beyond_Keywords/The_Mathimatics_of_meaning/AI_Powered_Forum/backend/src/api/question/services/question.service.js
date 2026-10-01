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
            status:false,
        }).catch(e => console.error('Failed to save failed status', e))
    }

    return{
        question:creationResult
    }
}