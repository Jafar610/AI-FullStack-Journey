function normalizeWhitespace(value){
    return value.replace(/\s+/g, ' ').trim();
}

function normalizeQuestionText({title}){
    return normalizeWhitespace(`${title || ''}`.normalize('NFKC').toLowerCase());
}

async function generateQuestionEmbedding(sourceText, options = {}){
    const {taskType = 'RETRIVAL_DOCUMENT', questionId = null} = options;
    try {
        const result = await geminiEmbeddingModel.embedContent({
            content:{parts:[{text:sourceText}]},
            taskType
        });

        let values = result?.embedding?.values;

        if(!Array.isArray(values) || values.length === 0){
            throw new Error('Gemini Embedding response does not contain values');
        }
        return{
            embedding: values,
        }
    } catch (error) {
        console.error('Error:', error);
        console.error('===========================');
        throw error;
    }
}