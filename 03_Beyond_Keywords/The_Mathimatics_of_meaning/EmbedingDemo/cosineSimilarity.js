import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { response } from "express";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

const cosineSimilarity = (vecA, vecB)=>{
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    if(vecA.length !== vecB.length){
        const error = new error('Two vectors are not similar');
        throw error;
    }

    for(let i = 0; i < vecA.length; i++){
        dotProduct += vecA[i] * vecB[i];
        magnitudeA += vecA[i] * vecA[i];
        magnitudeB += vecB[i] * vecB[i];

    }
    const similarity = dotProduct/(Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
    console.log(similarity)
}

const vector1 = [1,2];
const vector2 = [2,4];

cosineSimilarity(vector1, vector2);

