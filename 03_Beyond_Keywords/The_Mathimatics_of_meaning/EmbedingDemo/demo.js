import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getEmbedding(text) {
  const response = await ai.models.embedContent({
    model: "embedding-001",
    contents: [
      {
        role: "user",
        parts: [{ text }]
      }
    ],
    config: {
      outputDimensionality: 64, // optional
    },
  });

  return response.embeddings[0].values;
 
}
console.log(embeddings.contents)