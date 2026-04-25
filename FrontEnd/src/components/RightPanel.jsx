import { useEffect, useState } from "react";
import "../styles/rightpanel.css";

function RightPanel({ toggle, setOverlayType }) {

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDocs = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/documents");
            const data = await res.json();

            setDocuments(data.slice(0, 5)); // show only top 5
        } catch (err) {
            console.error("Error fetching docs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const formatSize = (bytes) => {
        if (!bytes) return "PDF";

        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";

        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="right-panel">
            {/* Hide button */}
            <button onClick={toggle} className="hide-text">
                Hide
            </button>

            <button
                className="upload-btn"
                onClick={() => setOverlayType("upload")}
            >
                Upload Document
            </button>

            <div className="panel-card">
                <div className="panel-header">
                    <h4>Your Documents</h4>

                    <div className="header-actions">
                        <span
                            onClick={() => setOverlayType("documents")}
                            className="view-all"
                        >
                            View all
                        </span>
                    </div>
                </div>

                <div className="doc-list">
                    {loading && <p>Loading...</p>}

                    {!loading && documents.length === 0 && (
                        <p>No documents</p>
                    )}

                    {documents.map((doc) => (
                        <div key={doc.id} className="doc-item">
                            <div>
                                {/* Clean filename */}
                                <p className="doc-name">
                                    {doc.name.split("-").slice(1).join("-")}
                                </p>

                                {/* optional size */}
                                <span className="doc-size">
                                    {formatSize(doc.size)}
                                </span>
                            </div>
                            <span className="dots">⋮</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RightPanel;