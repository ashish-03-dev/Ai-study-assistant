import { useEffect, useState } from "react";
import "../styles/documents.css";

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/documents");
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="doc-container">
      <h2>Uploaded Documents</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && documents.length === 0 && (
        <p>No documents uploaded yet</p>
      )}

      <div className="doc-list">
        {documents.map((doc) => (
          <div className="doc-card" key={doc.id}>
            <h4>{doc.name.split("-").slice(1).join("-")}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentList;