import { createConversationService } from "../services/chat.service.js";



// const ai = new GoogleGenAI({});

// const interaction = await ai.interactions.create({
//   model: "gemini-3.5-flash-lite",
//   input: "Explain how machine works in a few words",
// });
// console.log(interaction.output_text);

// const geminiClient = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
// async function main(){
//   const response = await geminiClient.models.generateContent({
//     model: "gemini-3.5-flash-lite",
//     contents: "Explain how computer works in a few words",
//   });

//   console.log(response.text);
// }
// main();
// const createGeminiClient = ()=>{
//     if(process.env.GEMINI_MODEL){
//         throw new Error('GEMINI_API_KEY enviroment variable required');
//     }
//     return new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
// }


export async function createConversationController(req, res) {
  try {
    const { question } = req.body;

    const result = await createConversationService(question);
    res.status(201).json({
      status: true,
      message: "create conversation api success",
      data: result,
    });
  } catch (error) {
    throw error;
  }
}

export function getConversationController(req, res) {
  res.send("Conversation get api");
}
