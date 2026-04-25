import * as embeddingService from "../services/embeddingService.js";
import * as vectorService from "../services/vectorService.js";
import * as llmService from "../services/llmService.js";

export const askQuery = async (req, res) => {
  try {
    const { query } = req.body;

    const results = await vectorService.search(query);

    // 3. send to LLM
    const answer = await llmService.generateAnswer(query, results);

    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query failed" });
  }
};