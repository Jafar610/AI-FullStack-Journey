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
        const row = await fetchBeminiJsonTextResponse(userPrompt);
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