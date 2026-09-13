import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chat = ai.chats.create({
  model: "gemini-3.5-flash-lite",
  history:[
    {role:'user', parts:[{text:'My name is Jafar.'}]},
    {role:'model', parts:[{text:'Hello Jafar! Nice to meet you. How can I help you today?'}]}
  ],
  config:{
    temperature:0.9,
    maxOutputTokens:1000,
    topK:5,
    systemInstruction:''
  }
});

const conversation = async (msg) => {
  const res = await chat.sendMessage({
    message: msg,
  });
    console.log(res.text);
};

conversation('What is the capital city of ethiopia?')


