import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { response } from "express";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const main = async()=>{
    const text = "hello world";
    const embedding = await ai.models.embedContent({
        model:'gemini-embedding-001',
        contents: text,
        config:{
            outputDimensionality:768,
        }
    })

    console.log(embedding.embeddings);
}

main();