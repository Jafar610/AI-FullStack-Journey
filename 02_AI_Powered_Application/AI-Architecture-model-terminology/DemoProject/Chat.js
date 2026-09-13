import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const conversation = async (msg) => {
  const chat = ai.chats.create({
    model: "gemini-3.5-flash-lite",
    history: [
      { role: "user", parts: [{ text: "hi my name is jafar" }] },
      { role: "model", parts: [{ text: "Nice to meet you Jafar!" }] },
    ],
  });

  const response = await chat.sendMessage({
    message: msg,
  });

  const stream = await chat.sendMessageStream({
    message:msg,
  });


  for await (const chunk of stream){
    console.log(chunk.text);
    const delay = (ms)=>new Promise(res=>{
        setTimeout(res, ms)
    });
      delay(50);
  }





//   console.log(response.text);
};
conversation("what is live for you?");
