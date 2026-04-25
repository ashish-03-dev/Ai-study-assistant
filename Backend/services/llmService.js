import axios from "axios";

export const generateAnswer = async (query, contextChunks) => {
  try {
    const context = contextChunks.map(c => c.chunk).join("\n");

    // console.log("🧠 Context:", context);

    const res = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",
      prompt: `
You are a precise AI assistant.

STRICT RULES:
- Answer ONLY using the provided context
- Do NOT add outside knowledge
- If answer is not in context, say: "Not found in provided documents"
- Keep answer clear and structured

CONTEXT:
${context}

QUESTION:
${query}

ANSWER:
`,
      stream: false,
    });
    
    return res.data.response;
  } catch (err) {
    console.error("❌ LLM ERROR:", err.response?.data || err.message); // 🔥 ADD
    throw err;
  }
};