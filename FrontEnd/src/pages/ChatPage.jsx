import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import RightPanel from "../components/RightPanel";
import UploadDocument from "../components/UploadDocument";
import DocumentList from "../components/DocumentList";
import "../styles/chatpage.css";
import "../styles/rightpanel.css";

function ChatPage() {
    const [showRightPanel, setShowRightPanel] = useState(true);
    const [activeChatId, setActiveChatId] = useState(null);
    const [showGreeting, setShowGreeting] = useState(true);
    const [overlayType, setOverlayType] = useState(null);
    const [activeMenu, setActiveMenu] = useState("home");

    const [chats, setChats] = useState(() => {
        const saved = localStorage.getItem("chats");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("chats", JSON.stringify(chats));
    }, [chats]);

    return (
        <div className="app-container">
            <Sidebar
                chats={chats}
                onSelectChat={(id) => {
                    setActiveChatId(id);
                    setShowGreeting(false); // hide greeting when opening chat
                }}
                setChats={setChats}
                activeChatId={activeChatId}
                setActiveChatId={setActiveChatId}
                setShowGreeting={setShowGreeting}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                toggleRightPanel={() => setShowRightPanel(prev => !prev)}
            />

            <ChatWindow
                chats={chats}
                activeChatId={activeChatId}
                setChats={setChats}
                setActiveChatId={setActiveChatId}
                showGreeting={showGreeting}        // 👈 pass it
                setActiveMenu={setActiveMenu}
                setShowGreeting={setShowGreeting}
            />

            <div className={`right-panel-wrapper ${showRightPanel ? "open" : "closed"}`}>
                <RightPanel
                    toggle={() => setShowRightPanel(false)}
                    setOverlayType={setOverlayType}
                />
            </div>

            {overlayType && (
                <div className="upload-overlay">
                    <div className="upload-modal">

                        <button
                            className="close-btn"
                            onClick={() => setOverlayType(null)}
                        >
                            ✖
                        </button>

                        {overlayType === "upload" && <UploadDocument />}
                        {overlayType === "documents" && <DocumentList />}

                    </div>
                </div>
            )}

        </div>
    );
}

export default ChatPage;