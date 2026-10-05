import { json } from "express";
import { safeExecute } from "../../../../db/config";

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeQuestionText({ title }) {
  return normalizeWhitespace(`${title || ""}`.normalize("NFKC").toLowerCase());
}

async function generateQuestionEmbedding(sourceText, options = {}) {
  const { taskType = "RETRIVAL_DOCUMENT", questionId = null } = options;
  try {
    const result = await geminiEmbeddingModel.embedContent({
      content: { parts: [{ text: sourceText }] },
      taskType,
    });

    let values = result?.embedding?.values;

    if (!Array.isArray(values) || values.length === 0) {
      throw new Error("Gemini Embedding response does not contain values");
    }
    return {
      embedding: values,
    };
  } catch (error) {
    console.error("Error:", error);
    console.error("===========================");
    throw error;
  }
}

function validateEmbedding(embedding){
  if(!Array.isArray(embedding)){
    throw new Error('Embedding must be an array');
  }
  if(embedding.length === 0){
    throw new Error('Embedding cannot be empty');
  }

  if(!embedding.every(v => typeof v === 'number' && !isNaN(v))){
    throw new Error('Embedding must contain only valid number');
  }
}

async function storeQuestionVector({
  questionId,
  sourceText,
  embedding = [],
  status = "ready",
}) {
  if (status === "failed" || !embedding || embedding.length === 0) {
    const sql = `
        INSERT INTO  questions_vector (question_id, source_text, embedding, status)
        VALUES (?,?,?) ON DUBLICATE KEY UPDATE
        source_text = VALUES(source_text),
        embedding = VALUES(embedding),
        status = VALUES(status),
        updated_at = CURRENT_TIMESTAMP,
        `;

    await safeExcute(sql, [
      questionId,
      sourceText,
      JSON.stringify([]),
      "failed",
    ]);
    return;
  }

  validateEmbedding(embedding);

  const embeddingJson = JSON.stringify(embedding);

  //Implement mysql insert

  const sql = `
    INSERT INTO question_vector(question_id, source_text, embedding, status) VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
    source_text = VALUES(source_text),
    status = VALUES(status),
    updated_at = CURRENT_TIMESTAMP
  `;

  try {
    await safeExcute(sql, [questionId, sourceText, embeddingJson, status]);
  } catch (error) {
    console.error('===MYSQL UPSENT ERROR ===');
    console.error('Operation: storeQuestionVector');
    console.error(`Question Id: ${questionId}`);
    console.error(`Embedding Length: ${embedding.length}`);
    console.error(`Status: ${status}`)
    console.error(`SQL:`,sql.trim().replace(/\s+/g,' '));
    console.error(`Status:`, error);
    console.error(`=======================================`);
    throw error
  }
}

async function retriveReadyEmbedding(){
  const sql = `
  SELECT question_id, embedding FROM question_vectors  WHERE status = ?
  `;
try {
  const rows = await safeExecute(sql, ['ready']);
  const embedding = [];
  for(const row of rows){
    try {
      const embedding = typeof row.embedding === 'string'
      ? JSON.parse(row.embedding)
      : row.embedding;

      //Add valid embedding to results

      embedding.push({
        questionId: row.question_id,
        embedding: embedding,
      });

    } catch (parseError) {
      console.warn(
        `Skipping question ${row.question_id}: failed to parse embedding JSON`,
        parseError
      );
      continue;
    }
  }
} catch (error) {
  throw error;
}

}

async function findSimilarQuestionByText({sourceText, threshold, k}){
  const normalizedK = k || RECOMMEND_K;
  const normalizedThreshold = threshold || RECOMMNED_THRESHOLD;

  let embeddingResult;
  try{
    embeddingResult = await generateQuestionEmbedding(sourceText,{
      taskType:'RETRIVAL_QUERY'
    });

  }catch(error){
    console.error('===GEMINI API ERROR DURING SEARCH ===');
    console.error('Operation:findSimilarQuestionByText');
    console.error(`Search Text:`, sourceText);
    console.error(`Error:`, error);
    console.error(`===============================`);
    throw new serviceValidateError(`
      Faild to generate embedding for search query. Please try again letter.
      `);
  }

  const queryEmbedding = embeddingResult.embedding;

  // retrive all ready embedding from mysql
  let storedEmbedding;

  try {
    storedEmbedding = await retriveReadyEmbedding();
  } catch (error) {
    console.error('===DATABASE ERROR DURING SEARCH===');
    console.error('Operation: finalSimilarQuestionByText');
    console.error('Search Text: ',sourceText);
    console.error('Error: ',error);

  }
}

//Calculate cosine similarity for each stored embedding.
const similarities = [];
for(const stored of storedEmbedding){
  try {
    const score = calculateCosineSimilarity(queryEmbedding, stored.embedding);

    //Filter by threshold
    if(score > normalizedThreshold){
      similarities.push({
        questionId: stored.questionId,
        score: score,
      });
    }
  } catch (error) {
    console.warn(
      `Failed to calculate similarity of question ${stored.questionId} : `,
      error.message,
    );
    continue;
  }
}

function getVectorConfig(){
  return{
    recommendThreshold: RECOMMNED_THRESHOLD,
    recommendK: RECOMMEND_K,
  }
}