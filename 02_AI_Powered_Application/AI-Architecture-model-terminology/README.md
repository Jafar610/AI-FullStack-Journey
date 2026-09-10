# AI Architecture, Model Selection & Advanced Terminology – Short Note

*Based on the PDF “ai-architecture-model-selection-advanced-terminology-content.pdf”*

---

## 1. The Anatomy of an AI Application

**Restaurant analogy** – each part of an AI app maps to a role in a high‑end restaurant.

| Layer | Role | Responsibility |
|-------|------|----------------|
| **Brain (LLM API)** | The genius chef | Provides raw intelligence. Models like GPT‑4, Gemini, Claude sit behind an API. They never see users directly – only the prompt (the ticket). |
| **Backend (Orchestrator)** | The waiter | Built with FastAPI / Node.js. Handles prompt engineering, authentication, guardrails, async tasks. Translates messy user input into structured prompts. |
| **Frontend (Interface)** | The dining room | UI for input and output. Often uses Server‑Sent Events (SSE) for real‑time streaming (token‑by‑token typing effect). |

**Context construction** – the backend combines user message, history, system instructions, and retrieved documents into a clean prompt.

---

## 2. Essential Terminology

### Context Window
- Number of tokens a model can process in one prompt.
- Larger window → more coherent, relevant responses.
- **Scale example (1M tokens):**
  - 50,000 lines of code
  - All text messages you’ve sent in 5 years
  - 8 average‑length English novels
  - Transcripts of 200+ podcast episodes
  - 1 hour of video (no audio) / ~45 min (with audio)
  - 9.5 hours of audio

### Tokens
- Smallest unit of text a model processes (≈ ¾ of an English word).
- **Why it matters:** tokens drive cost (billed per token) and define the context window limit.

### Parameters / Weights
- Internal numbers learned during training.
- More parameters → more capable, but slower and more expensive.
- Heuristic: 7B runs on a laptop; 400B+ needs serious infrastructure.

### Inference & Performance
- **Training** happens once. **Inference** happens every time a user sends a prompt – this is where costs live.
- **Latency** – how long a single request takes (user‑facing).
- **Throughput** – how many requests per second (system‑level).
- Trade‑off depends on use case (chatbot → low latency; batch processor → high throughput).

---

## 3. Controlling the Model (The Knobs)

All these parameters control **how the model chooses the next token**.

| Parameter | What it does | Range / Effect |
|-----------|--------------|----------------|
| **Temperature** | Creativity thermostat | 0–2. Low = predictable; high = creative. |
| **Top‑k** | Restricts to the *k* most probable words | Small k (5) = focused; large k (50) = variety. |
| **Top‑p** (nucleus) | Smallest group of words with cumulative probability ≥ p | More dynamic. Example: p=0.9 → almost always “Paris”; p=0.95 → may consider “Lyon”. |

### Recommended Settings

| Task | Temperature | Top‑p |
|------|-------------|-------|
| Coding / Factual Q&A | 0.2 | 0.8 |
| Creative Writing / Brainstorming | 0.8 | 0.95 |
| General Chat | 0.5 | 0.9 |

> Top‑k and Top‑p are often used as alternatives – most people choose one or the other.

---

## 4. Model Selection Strategy

Five main considerations:

1. **Parameter Size**
   - Small (7B–8B): fast, cheap – simple chatbots, categorization, summarization.
   - Large (70B+): slower, pricier – complex reasoning, coding, hard logic.
   - Huge (400B+): best performance, highest cost – use only when truly needed.

2. **Context Window Size**
   - Standard (~8K tokens): normal chat, short docs.
   - Large (100K+ tokens): long PDFs, research papers, multiple documents (RAG).
   - Advanced (e.g., Gemini 1M tokens): extremely large codebases or transcripts.
   - *Pick a model whose window matches your maximum expected prompt size.*

3. **Modality**
   - Text‑only: e.g., Llama 3.
   - Multimodal: handles images, audio, sometimes video (e.g., GPT‑4V, Gemini).
   - Need vision if analyzing screenshots, photos, or PDFs with images.

4. **Capability Specialization**
   - Coding: Claude 3.5 Sonnet, GPT‑4o.
   - Creative writing: some models tuned for storytelling.
   - Speed / low cost: Gemini Flash, GPT‑4o‑mini – ideal for high‑traffic apps.

5. **Pricing**
   - Charged per million tokens.
   - Common strategy: cheaper models for 80–90% of tasks; flagship models for rare, high‑value queries.

### Proprietary vs Open‑Source

| Option | Examples | Pros | Cons |
|--------|----------|------|------|
| **A: Proprietary** | GPT‑4o, Gemini Pro, Claude 3.5 | Easy integration, highly capable, auto‑scaling | Less control, ongoing API costs |
| **B: Open‑source** | Llama 3, Mistral, Gemma | Full control, privacy, no API costs | Manage GPUs/servers, more complexity |

> **Recommendation for this course:** Use Option A (Gemini or OpenAI) to focus on building features rather than maintaining infrastructure.

---

## 5. Prompt Engineering Strategies

**Prompt** = input text or query provided to an AI model. Design significantly impacts output quality.

### Three Primary Ways to Structure Prompts

| Type | Description | Example |
|------|-------------|---------|
| **Direct instructions** | Clear, specific commands | “Write a poem about nature.” |
| **Open‑ended instructions** | Less restrictive, encourages exploration | “Tell me about the universe.” |
| **Task‑specific instructions** | Precise, goal‑oriented | “Translate this text into French: Hello.” |

### Key Techniques

- **Zero‑shot prompting** – no examples given; relies on pretrained knowledge.  
  *Example:* “Explain climate change in simple terms.”

- **Few‑shot prompting** – provide a few examples to demonstrate the task.  
  *Example:* Give examples of explaining photosynthesis and gravity, then ask to explain climate change.

- **Chain of Thought (CoT)** – encourage step‑by‑step reasoning.  
  *Example:* “Explain climate change step by step. Step 1: Define… Step 2: Causes… Step 3: Effects… Step 4: Conclusion.”

### System Prompts vs User Prompts

| Type | Purpose | Example |
|------|---------|---------|
| **System Prompt** | Sets overall behavior / personality | “You are a helpful Python tutor who explains concepts using simple analogies.” |
| **User Prompt** | The specific request | “Explain what a decorator is.” |

> **Pro tip:** Use system prompts to set consistent behavior across conversations (tone, topics to avoid, error handling).

---

## 6. Final Takeaway

- AI apps are layered: **LLM API (brain) → Backend (orchestrator) → Frontend (interface)**.
- Understand tokens, context windows, parameters, inference, latency, and throughput.
- Control model behavior with **Temperature**, **Top‑k**, and **Top‑p**.
- Choose models based on **size, context, modality, capability, and price**.
- Master prompt engineering: **zero‑shot, few‑shot, CoT**, and use **system prompts** for consistency.

*Prompt engineering continues to expand across domains – from chatbots to decision‑making and education – despite challenges like hallucinations.*