"use client";

import { useState } from "react";

export default function ChatUI() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadPDF() {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Uploading and indexing PDF...");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setStatus(`PDF indexed. Chunks: ${data.chunks}`);
  }

  async function askQuestion() {
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setAnswer(data.content);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>Multimodal RAG Chatbot</h1>

      {/* PDF Upload */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={uploadPDF} style={{ marginLeft: 10 }}>
          Upload PDF
        </button>
      </div>

      {status && <p>{status}</p>}

      <hr />

      {/* Question Input */}
      <textarea
        rows={4}
        style={{ width: "100%", marginTop: 20 }}
        placeholder="Ask a question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={askQuestion} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div style={{ marginTop: 20 }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
