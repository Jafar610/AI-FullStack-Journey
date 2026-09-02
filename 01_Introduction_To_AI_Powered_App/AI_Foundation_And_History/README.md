# AI Foundations – Short Note

## 1. What is Intelligence?
- **Definition**: The ability to understand a situation, connect ideas, learn from experience, and solve problems to achieve a goal.
- **Not just knowledge**: Real intelligence involves adapting to new situations (e.g., finding a way back into your house when locked out).
- **Natural intelligence** (biological): Found in humans and animals; combines logic, emotion, creativity, and social understanding.
- **Artificial intelligence** (synthetic): Simulation of intelligent behaviour using data, algorithms, and statistical patterns – does not think like a human brain but can perform many tasks.

---

## 2. Natural vs Artificial Intelligence

| Aspect | Natural Intelligence | Artificial Intelligence |
|--------|----------------------|--------------------------|
| **Physical basis** | Brain, nerves, senses, hormones | Software, hardware, data, algorithms |
| **Learning** | Experience, teaching, feedback | Training data, optimisation, prompts |
| **Strengths** | Common sense, flexibility, emotion | Speed, scale, pattern recognition over huge datasets |
| **Weaknesses** | Slow calculation, bias, fatigue | Hallucinations, lacks lived experience, depends on context |

---

## 3. Everyday Examples of AI
- Recommendation engines (Netflix, YouTube, TikTok)
- Spam filters in email
- Navigation apps (traffic predictions)
- Code assistants (GitHub Copilot, Cursor)
- Customer support chatbots
- Semantic search (meaning‑based, not just keywords)

---

## 4. Brief History of AI

| Period | Key Idea | Why It Mattered |
|--------|----------|-----------------|
| **1950s – The Dream** | Turing Test; term “Artificial Intelligence” coined at Dartmouth (1956). | AI became a formal research field. |
| **Rule‑based era** | Hand‑coded if‑then rules and expert systems. | Worked for narrow tasks but failed in messy real‑world scenarios. |
| **AI Winters** | Funding dropped when big promises weren't met. | Learned that rule‑based systems alone couldn't achieve general intelligence. |
| **2010s – Deep Learning boom** | Big Data + GPUs enabled deep neural networks. | Dramatic improvements in vision, speech, translation, recommendations. |
| **2017 – Transformer era** | “Attention Is All You Need” – the Transformer architecture. | Foundation for modern LLMs (GPT stands for **G**enerative **P**re‑trained **T**ransformer). |

> **Why rule‑based failed**: Real life has too many exceptions. Machine learning lets computers learn patterns from data instead of relying on explicit rules.

---

## 5. The Layers of AI (Concentric Circles)
Artificial Intelligence (AI)
└── Machine Learning (ML)
└── Deep Learning (DL)
└── Generative AI

- **AI**: broadest – any technique that mimics human intelligence (even simple rule‑based systems).
- **ML**: systems that learn patterns from data instead of being explicitly programmed.
- **DL**: uses multi‑layered neural networks, excellent for complex data (images, audio, text).
- **Generative AI**: creates new content (text, images, code, music) based on learned patterns – e.g., ChatGPT, DALL‑E, Copilot.

---

## 6. What Is an AI Model?
- **Model** = the final learned result after training (a file with billions of numbers).
- **Analogy**:  
  - *Training* = a student studying thousands of practice problems.  
  - *The model* = the student’s brain after learning (knowledge stored).  
  - *Inference* = using that knowledge to answer new questions.

---

## 7. Levels of Intelligence: ANI, AGI, ASI
- **ANI (Artificial Narrow Intelligence)**: Specialised in one task – nearly all current AI (e.g., chess engines, spam filters).
- **AGI (Artificial General Intelligence)**: Human‑level intelligence – can do any intellectual task a human can. Still theoretical.
- **ASI (Artificial Superintelligence)**: Surpasses human intelligence in every aspect – purely speculative.

> **Avoid hype**: Modern AI can sound human but lacks true understanding, memory, or responsibility.

**Foundation Models** – large general‑purpose models trained on broad data, adapted for many tasks (e.g., GPT‑4, Gemini).

---

## 8. How LLMs Actually Work

### 8.1 Next‑Token Prediction
- LLMs generate text by repeatedly predicting the **next token** (word fragment) based on the prompt and previous tokens.
- They do **not** retrieve facts like a database – they generate the most statistically likely continuation.

### 8.2 Tokens
- Text is broken into tokens (words, parts of words, punctuation).
- Tokenisation affects cost, speed, and context limits.

### 8.3 Context Window
- The amount of text the model can consider in one request (system message, chat history, retrieved data, etc.).
- The model only remembers what’s in the current request – for persistent memory, store data externally.

### 8.4 Temperature
- Controls randomness/creativity:
  - **Low** → conservative, repeatable.
  - **High** → more creative but can be unreliable.

### 8.5 Hallucinations
- Confident‑sounding but incorrect or invented answers.
- Happens because the model generates likely text, not verified facts.

---

## 9. Developer Takeaways
- AI is a **co‑pilot, not the captain** – never trust code or explanations you cannot test and verify.
- AI‑powered apps are still software applications – you must design UI, backend, databases, prompts, validation, testing, and UX.
- The goal is to build a **mental model** of how AI works, not to memorise every term.

---

*Based on the original PDF “ai‑foundations‑history‑terminology‑content‑1778578129576.pdf” – short note for quick reference.*