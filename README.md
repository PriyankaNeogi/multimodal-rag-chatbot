

## Features

- Upload PDF documents
- Extract and embed:
  - Text content
  - Images inside PDFs
- Store embeddings in FAISS
- Ask natural language questions
- LLM answers using retrieved **text + image context**
- Clean UI built with Next.js

---

## Project Structure

```

multimodal-rag-chatbot/
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
│
└── .gitignore

````

---

## Backend Setup (FastAPI)

### 1. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate
````

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Set environment variables

Create `.env` inside `backend/`:

```
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run backend

```bash
uvicorn app:app --reload
```

Backend will be available at:

```
http://localhost:8000/docs
```

---

## Frontend Setup (Next.js)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Run frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## How It Works (High Level)

1. User uploads a PDF
2. Backend:

   * Extracts text + images
   * Generates CLIP embeddings
   * Stores them in FAISS
3. User asks a question
4. Relevant text + image references are retrieved
5. Groq LLM generates the final answer

---

## Notes

* Images are **not directly viewed by the LLM**
* Their presence and page context are included in prompts
* Designed for clarity, speed, and low memory usage

---

## Future Improvements

* Persistent vector storage
* Multi-document support
* Streaming responses
* UI enhancements
* Deployment on Vercel + Render

---

## Author

**Priyanka Neogi**

```

