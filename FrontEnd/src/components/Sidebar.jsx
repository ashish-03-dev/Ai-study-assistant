import { useState, useEffect } from "react";
import "../styles/sidebar.css";

function Sidebar({ toggleRightPanel, setChats, activeChatId, setActiveChatId, activeMenu, setActiveMenu, chats, onSelectChat, setShowGreeting }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const menuItems = [
        { id: "home", label: "🏠 Home" },
        { id: "documents", label: "📄 Documents" },
    ];

    const handleClick = (item) => {
        setActiveMenu(item.id);

        if (item.id === "home") {
            setChats(prev => prev.filter(chat => chat.messages.length > 0));
            setActiveChatId(null);
            setShowGreeting(true);
        }

        if (item.id === "documents") {
            toggleRightPanel();
        }
    };

    const toggleMenu = (id) => {
        setOpenMenuId(prev => (prev === id ? null : id));
    };

    const handleDelete = (id) => {
        setChats(prev => prev.filter(chat => chat.id !== id));

        if (activeChatId === id) {
            setActiveChatId(null);
            setShowGreeting(true);
            setActiveMenu("home");
        }

        setOpenMenuId(null);
    };

    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="sidebar">
            <div className="logo">🤖 StudyAI</div>

            <div className="new-chat-container">
                <button
                    className="new-chat"
                    onClick={() => {
                        setActiveMenu("home");
                        setChats(prev => prev.filter(chat => chat.messages.length > 0));
                        setActiveChatId(null);
                        setShowGreeting(true);
                    }}
                >
                    + New Chat
                </button>
            </div>

            {/* Menu */}
            <div className="menu">
                {menuItems.map((item) => (
                    <p
                        key={item.id}
                        className={activeMenu === item.id ? "menu-item active" : "menu-item"}
                        onClick={() => handleClick(item)}
                    >
                        {item.label}
                    </p>
                ))}
            </div>

            {/* 🔥 Recent Chats */}
            <div className="recent">
                <div className="recent-header">
                    <h4>Recent Chats</h4>
                </div>

                <div className="recent-list">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={
                                chat.id === activeChatId
                                    ? "recent-item active-chat"
                                    : "recent-item"
                            }
                            onClick={() => {
                                onSelectChat(chat.id);
                                setShowGreeting(false);
                                setActiveMenu(null); // ❗ remove menu highlight
                            }}
                        >
                            <span className="chat-title">{chat.title}</span>

                            {/* 🔥 3 dots menu */}
                            <div
                                className="chat-menu"
                                onClick={(e) => e.stopPropagation()} // prevent chat click
                            >
                                <button
                                    className="menu-btn"
                                    onClick={() => toggleMenu(chat.id)}
                                >
                                    ⋮
                                </button>

                                {openMenuId === chat.id && (
                                    <div className="menu-dropdown">
                                        <div
                                            className="menu-option delete"
                                            onClick={() => handleDelete(chat.id)}
                                        >
                                            🗑 Delete
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default Sidebar;