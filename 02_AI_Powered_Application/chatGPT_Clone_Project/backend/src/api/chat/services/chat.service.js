import db from "../../../../db/db.config.js";

//select History
const getRecentConversations = async (limit = 5) => {
  const NormalizationLimit = Number.parseInt(limit, 20);
  const safeLimit =
    Number.isNaN(NormalizationLimit) || NormalizationLimit <= 0
      ? 20
      : NormalizationLimit;

  const [rows] = await db.execute(
    `SELECT id, role, content, created_at FROM conversations ORDER BY id DESC limit ${safeLimit}`,
  );

  return rows.reverse();
};



export async function createConversationService(question) {
  try {
    // validation
    if (!question.trim()) {
      const error = new Error("Question is required");
      error.status = 400;
      throw error;
    }

    // save data
    await db.execute("INSERT INTO conversations (content) VALUES (?)", [
      question,
    ]);


    const rows = await getRecentConversations(5);
    return rows;
  } catch (error) {
    throw error;
  }
}
