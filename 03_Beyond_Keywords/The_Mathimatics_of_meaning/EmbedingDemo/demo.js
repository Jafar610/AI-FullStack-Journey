import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const response = await ai.models.embedContent({
 model: 'text-embedding-001',
 contents: [
   'What is your name?',
   'What is your favorite color?',
 ],
 config: {
   outputDimensionality: 64,
 },
});
console.log(response);