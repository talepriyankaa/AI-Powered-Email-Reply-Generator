import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Formal"); 

  const generateReply = async () => {
    if (!emailContent) {
      alert("Please enter email content");
      return;
    }

    setLoading(true);
    try {
      // Pass tone to backend API
      const response = await fetch("http://localhost:8081/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent, tone }),
      });
      const data = await response.text();
      setReply(data);
    } catch (error) {
      console.error(error);
      alert("Error generating reply");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Email Reply Generator</h2>

      {/* Email Input */}
      <div className="mb-3">
        <label htmlFor="originalEmail" className="form-label">Original Email Content</label>
        <textarea
          className="form-control"
          id="originalEmail"
          rows="6"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        ></textarea>
      </div>

      {/* Tone Selector */}
      <div className="mb-3">
        <label htmlFor="toneSelect" className="form-label">Choose Reply Tone</label>
        <select
          className="form-select"
          id="toneSelect"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="Formal">Formal</option>
          <option value="Friendly">Friendly</option>
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      {/* Generate Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={generateReply}
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : "Generate Reply"}
      </button>

      {/* Reply Output */}
      <div className="mb-3">
        <label htmlFor="generatedReply" className="form-label">Generated Reply</label>
        <textarea
          className={`form-control ${
            tone === "Formal" ? "border-primary" :
            tone === "Friendly" ? "border-success" :
            tone === "Professional" ? "border-info" :
            "border-secondary"
          }`}
          id="generatedReply"
          rows="6"
          value={reply}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default App;


