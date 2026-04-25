import "../styles/chatwindow.css";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatWindow({ chats, activeChatId, setActiveChatId, setActiveMenu, setChats, showGreeting, setShowGreeting }) {
  const activeChat = chats.find(c => c.id === activeChatId);
  const messages = activeChat ? activeChat.messages : [];

  const isThinking = messages.some((msg) => {
    return msg.role === "ai" && msg.status === "loading";
  }
  );

  const updateMessages = (updater) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: updater(chat.messages) }
          : chat
      )
    );
  };

  const handleSend = async (text) => {
    let chatId = activeChatId;

    // 👉 If no active chat, create one
    if (!chatId) {
      const newChat = {
        id: Date.now(),
        title: text.slice(0, 30),
        messages: []
      };

      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      setShowGreeting(false);
      setActiveMenu(null);
      chatId = newChat.id;
    }

    // Add user + loading message
    setChats(prev =>
      prev.map(chat => {
        if (chat.id !== chatId) return chat;

        const isFirst = chat.messages.length === 0;

        return {
          ...chat,
          title: isFirst ? text.slice(0, 30) : chat.title,
          messages: [
            ...chat.messages,
            { role: "user", text },
            { role: "ai", text: "Thinking...", status: "loading" }
          ]
        };
      })
    );

    try {
      const res = await fetch("http://localhost:5000/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      const data = await res.json();

      setChats(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? {
              ...chat,
              messages: chat.messages.map((msg, i) =>
                i === chat.messages.length - 1
                  ? { role: "ai", text: data.answer, status: "success" }
                  : msg
              )
            }
            : chat
        )
      );
    } catch {
      setChats(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? {
              ...chat,
              messages: chat.messages.map((msg, i) =>
                i === chat.messages.length - 1
                  ? {
                    role: "ai",
                    text: "⚠️ Failed to get response.",
                    status: "error"
                  }
                  : msg
              )
            }
            : chat
        )
      );
    }
  };

  return (
    <div className="chat-window">
      {!activeChat && showGreeting && (
        <div className="chat-header">
          <h2>Good Morning 👋</h2>
          <p>How can I help you today?</p>
        </div>
      )}

      <div className="chat-body">
        <MessageList messages={messages} />
        <MessageInput
          onSend={handleSend}
          updateMessages={updateMessages}
          setShowGreeting={setShowGreeting}
          disabled={isThinking}
        />
      </div>
    </div>
  );
}

export default ChatWindow;