import axios from "axios";
import { EndeeVectorStore } from "@vectorstores/endee";
import { Document, VectorStoreIndex } from "@vectorstores/core";

const vectorStore = new EndeeVectorStore({
  indexName: "docs",
  url: "http://127.0.0.1:8080/api/v1",
  dimension: 768,
});

export const store = async (docId, chunks) => {
  const documents = chunks.map((chunk, i) =>
    new Document({
      text: chunk,
      metadata: {
        text: chunk,
        docId,
        chunkIndex: i,
      },
    })
  );

  await VectorStoreIndex.fromDocuments(documents, {
    vectorStore,
    embedFunc: async (text) => {
      if (Array.isArray(text)) {
        return Promise.all(
          text.map(async (t) => {
            const res = await axios.post("http://localhost:11434/api/embeddings", {
              model: "nomic-embed-text",
              prompt: t,
            });
            return res.data.embedding;
          })
        );
      }

      const res = await axios.post("http://localhost:11434/api/embeddings", {
        model: "nomic-embed-text",
        prompt: text,
      });

      return res.data.embedding;
    },
  });

  console.log("✅ Stored in Endee");
};


export const search = async (query) => {
  // 🔥 1. get embedding manually (you already know this works)
  const res = await axios.post("http://localhost:11434/api/embeddings", {
    model: "nomic-embed-text",
    prompt: query,
  });

  const queryEmbedding = res.data.embedding;
  console.log("🧠 Query embedding length:", queryEmbedding.length);
  console.log("🧠 First values:", queryEmbedding.slice(0, 5));
  // 🔥 2. query Endee directly
  const results = await vectorStore.query({
    queryEmbedding,
    similarityTopK: 8,
  });

  // 🔥 3. map response
  return results.nodes
    .map((node, i) => ({
      chunk: node.text,
      score: results.similarities[i],
    }))
    .filter(r => r.score > 0.3);  // 🔥 threshold
};


export const deleteByDocId = async (docId) => {
  await axios.post(`${ENDEE_URL}/indexes/docs/delete`, {
    filter: {
      docId: docId
    }
  });
};