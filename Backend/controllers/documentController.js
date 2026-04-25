import fs from 'fs';
import * as pdfService from '../services/pdfService.js';
import * as chunkService from '../services/chunkService.js';
import * as embeddingService from '../services/embeddingService.js';
import * as vectorService from "../services/vectorService.js";

let documents = [];
let idCounter = 1;

export const uploadDocument = async (req, res) => {
  try {
    // check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const docId = idCounter++;

    const docMeta = {
      id: docId,
      name: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      status: "processing",
      chunks: 0,
      createdAt: new Date(), // 🔥 useful later
    };

    // store metadata
    documents.push(docMeta);

    console.log("File received:", req.file);

    // 🔥 Run processing in background (non-blocking)
    processDocument(req.file.path, docMeta)
      .catch((err) => {
        console.error("Processing error:", err);
        docMeta.status = "error";
      });

    // ✅ single response
    return res.json({
      message: "Upload started",
      document: docMeta,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Upload failed" });
  }
};


async function processDocument(filePath, docMeta) {
  try {
    // 📄 Extract text
    const text = await pdfService.extractText(filePath);

    // ✂️ Split into chunks
    const chunks = chunkService.split(text);
    // console.log("Chunks type:", typeof chunks);
    // console.log("Chunks value:", chunks);

    docMeta.chunks = chunks.length;

    // 🧠 Create embeddings
    const embeddings = await embeddingService.createEmbeddings(chunks);
    if (!embeddings || embeddings.length === 0) {
      throw new Error("Embeddings not generated");
    }
    // console.log("Embedding length:", embeddings[0].length);
    // console.log("First embedding sample:", embeddings[0].slice(0, 5));

    // 💾 Store in vector DB (Endee)
    await vectorService.store(docMeta.id, chunks, embeddings);

    // ✅ Update status
    docMeta.status = "ready";

    console.log(`Processed: ${docMeta.originalName}`);

  } catch (err) {
    console.error("Processing error:", err);
    docMeta.status = "error";
  }
}

export const getAllDocuments = (req, res) => {
  res.json(documents);
};

export const getDocumentById = (req, res) => {
  try {
    const { id } = req.params;

    const document = documents.find(doc => doc.id === id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(document);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching document" });
  }
};

export const deleteDocument = (req, res) => {
  const { id } = req.params;

  documents = documents.filter(doc => doc.id !== id);

  vectorService.deleteByDocId(id);

  res.json({ message: "Document deleted" });
};