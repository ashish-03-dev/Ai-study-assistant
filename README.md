# 🚀 AI Study Assistant (RAG using Endee Vector DB)

## 📌 Overview

This project is an **AI-powered document question-answering system** built using a **Retrieval-Augmented Generation (RAG)** pipeline.

Users can upload PDF documents and ask questions. The system retrieves relevant content using **Endee Vector Database** and generates answers using an LLM.

---

## 🧠 Key Features

* 📄 Upload PDF documents
* ✂️ Automatic text chunking
* 🧠 Embedding generation using `nomic-embed-text`
* 💾 Storage in **Endee Vector Database**
* 🔍 Semantic search (similarity-based retrieval)
* 🤖 Answer generation using `Mistral (Ollama)`
* ⚡ Real-time query processing

---

## ⚙️ Tech Stack

### Frontend

* React.js

### Backend

* Node.js + Express

### AI / ML

* Embeddings: `nomic-embed-text` (via Ollama)
* LLM: `mistral` (via Ollama)

### Vector Database

* Endee (https://github.com/endee-io/endee)

---

## 📸 Demo

### 📄 Upload PDF + Processing + Chat

<div align="center">
  <img src="https://res.cloudinary.com/dqu3mzqfj/image/upload/v1777099111/Screenshot_2026-04-25_120201_zshu4m.png" width="30%" />
  <img src="https://res.cloudinary.com/dqu3mzqfj/image/upload/v1777099111/Screenshot_2026-04-25_120234_buaqqy.png" width="30%" />
  <img src="https://res.cloudinary.com/dqu3mzqfj/image/upload/v1777099111/Screenshot_2026-04-25_120422_wlapku.png" width="30%" />
</div>

<br>

### 💬 Chat Interface (More Views)

<div align="center">
  <img src="https://res.cloudinary.com/dqu3mzqfj/image/upload/v1777098550/Screenshot_2026-04-25_115401_z8ud03.png" width="30%" />
  <img src="https://res.cloudinary.com/dqu3mzqfj/image/upload/v1777099111/Screenshot_2026-04-25_120405_wtujub.png" width="30%" />
</div>

## 🔄 System Flow

```
PDF Upload
   ↓
Text Extraction
   ↓
Chunking
   ↓
Embedding Generation
   ↓
Store in Endee Vector DB
   ↓
User Query
   ↓
Query Embedding
   ↓
Similarity Search (Top K)
   ↓
Context Retrieval
   ↓
LLM (Mistral)
   ↓
Final Answer
```

---

## 🏗️ Project Structure

```
ai-assistant/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── uploads/
│   └── app.js
│
├── frontend/
│   ├── src/
│   └── components/
│
└── README.md
```

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/ashish-03-dev/Ai-study-assistant.git
cd ai-study-assistant
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm start
```

---

### 4️⃣ Run Endee Vector DB

Run locally:

```bash
cd ~/endee

# Start Endee server
./build/ndd-avx2 --data-dir ./data

# Create index
curl -X POST http://localhost:8080/api/v1/index/create \
-H "Content-Type: application/json" \
-d '{"index_name":"docs","dim":768,"space_type":"cosine"}'

# Verify / test index creation
curl http://localhost:8080/api/v1/index/list
```

---

### 5️⃣ Run Ollama (Required)

Install Ollama and run:

```
ollama run mistral
ollama pull nomic-embed-text
```

---

## 🔍 Example Workflow

1. Upload a PDF (fiction PDF used for testing)
2. System processes document in background
3. Ask a question
4. Relevant chunks retrieved using Endee
5. Mistral generates answer from context

---

## 🔮 Future Improvements

* Add authentication (user-based documents)
* UI improvements (chat history)

---

## 👨‍💻 Author

**Ashish Kumar**
GitHub: https://github.com/ashish-03-dev
LinkedIn: https://www.linkedin.com/in/ashish-kumar-03-dev

---
