import axios from "axios";

export const createEmbedding = async (text) => {
  try {
    const res = await axios.post("http://localhost:11434/api/embeddings", {
      model: "nomic-embed-text",
      prompt: text,
    });

    return res.data.embedding;

  } catch (err) {
    console.error("Embedding error:", err.message);
    throw err;
  }
};

export const createEmbeddings = async (chunks) => {
  const embeddings = [];

  for (let chunk of chunks) {
    const emb = await createEmbedding(chunk);
    embeddings.push(emb);
  }

  return embeddings;
};