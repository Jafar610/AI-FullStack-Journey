import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export default ai; 