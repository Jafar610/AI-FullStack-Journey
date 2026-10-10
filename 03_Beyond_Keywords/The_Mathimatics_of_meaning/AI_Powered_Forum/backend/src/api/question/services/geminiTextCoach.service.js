// import genAi
import {ServiceUnavailableError} from '../../../utils/errors/index'

function parseJsonObjectFromGeminiText(row){
    if(!row || typeof row !== 'string') return null;

    let t = row.trim();
    if(t.startsWith('```')){
        t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*$/i, '');
    }

    try {
        const v = JSON.parse(t);
        return v && typeof v === 'object' && !Array.isArray(v) ? v: null;
    } catch (error) {
        return null;
    }
}

async function fetchGeminiJsonTextResponse(userPrompt){
    const response = await ai.models.generateContent({
        model: GEMINI_TEXT_MODEL,
        contents: userPrompt,
        config: {
            maxOutputToken: 300,
        },
    });

    console.log(response);
    const text = response?.text;
    return typeof text === 'string' ? text : '';
}




const assessAnswerAgainstQuestionService = async({
    questionTitle,
    questionContent,
    answerText,
})=>{
    const userPrompt = `You revise wether a forum ANSWER draft addresses the QUESTION (relevance and congleteness of engagement - not whether the answer is factually correct),  QUESTION TITLE: ${questionTitle} QUESTION BODY: ${questionContent} ANSWER DRAFT: ${answerText} Reply with ONLY valid JSON (no markdown fences), exactly this shape: {"level": "strong" | "partial":"weak", "note":"one short sentence"}
    Rules: 
    - level: "strong" if the draft clearly engages with the question; "partial" if somewhat related but missing key parts of the ask; "weak" if mostly off-topic or too vague,
    - note: one sentence, plain language, no markdown, under 200 characters. Frame as fit/relevance, not grading.`;

    try {
        const row = await fetchGeminiJsonTextResponse(userPrompt);
        const parsed = parseJsonObjectFromGeminiText(row);
        const levelRow = parsed?.level;
        const noteRow = parsed?.note;
        const level = levelRow ==='strong' || levelRow ==='partial' || levelRow ==='weak' ? levelRow : 'partial';
        
        const note =  typeof noteRow === 'string' && noteRow.trim()
        ? noteRow.trim().slice(0, 280)
        : 'Could not summarize fit; treat this as partial note.';

        return {level, note};
        
    } catch (error) {
        console.error('assesAnswerAgainstQuestionService:', error);
        throw new ServiceUnavailableError(
            'AI fit check is temporarily unavailable. Please try again letter.'
        )
    }
    
}


const generateQuestionDraftCoachService = async({title, content})=>{
    const userPrompt = `You help learners write clearer technical form post,
    Question TITLE: ${title} 
    Question BODY (markdown allowed): ${content} 
    Reply with ONLY valid JSON (no markdown function), exactly this shape:
    {"tips" : ["...", "..."]}
    Rules: 
    - tips: array of 3 to 5 short strings (each under 120 character),
    - focus on: missing context(error message, expected vs actual), reproducibility, a sharper title idea if needed, tone for peers.
    - do not claim the question is "correct" or grade homework; give constructive checklist-style tips only.`;

    try {
        const row = await fetchGeminiJsonTextResponse(userPrompt);
        const parsed = parseJsonObjectFromGeminiText(row);
        let tips = Array.isArray(parsed?.tips)
        ? parsed.tips
        .filter(t=>typeof t === 'string' && t.trim())
        .map(t => t.trim())
        :[];

        tips = tips.slice(0, 5);
        if(tips.length === 0){
            tips = [
                'Add any error messages or exact behavior you see.',
                'Say what you already tried and what you expected instead'
            ]
        }

        return(tips);
    } catch (error) {
        console.error('generateQuestionDraftCoachService', error);;throw new ServiceUnavailableError(
            'AI draft suggestions are temporarily unavaliable. please try again letter'
        )
    }
}