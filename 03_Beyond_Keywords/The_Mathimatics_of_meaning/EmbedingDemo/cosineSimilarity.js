import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { response } from "express";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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
    return similarity;
}

const similarityText = async()=>{
    const Text1 = "My name is Jafar.";
    const Text2 = "My name is Jafar.";
    const Text3 = "China is the largest population country."

    const result1 = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:Text1,
        config:{
            taskType:'RETRIEVAL_DOCUMENT',
        }
    });
    const result2 = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:Text2,
        config:{
            taskType:'RETRIEVAL_DOCUMENT',
        }
    });
    const result3 = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:Text3,
        config:{
            taskType:'RETRIEVAL_DOCUMENT',
        }
    });

    const v1andv2 = cosineSimilarity(result1.embeddings[0].values, result2.embeddings[0].values);
    console.log("v1andv2: " + v1andv2);

    const v1andv3 = cosineSimilarity(result1.embeddings[0].values, result3.embeddings[0].values);
    console.log("v1andv2: " + v1andv3);

}

similarityText();
