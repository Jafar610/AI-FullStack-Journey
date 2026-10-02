import { json } from "express";

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
