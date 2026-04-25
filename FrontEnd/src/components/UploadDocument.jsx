import { useState } from "react";
import "../styles/upload.css";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessage(data.message || "Upload successful");
      setFile(null);

    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload PDF</h2>

      <div className="file-upload">
        <label className="custom-file-upload">
          Choose PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && <p className="file-name">{file.name}</p>}
      </div>

      {file && (
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UploadDocument;